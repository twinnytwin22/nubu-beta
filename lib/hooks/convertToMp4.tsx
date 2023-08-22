import { path } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg';
import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_CONNECTION_STRING!;
const containerName = 'videos';

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

ffmpeg.setFfmpegPath(path);

export const transcoder = async (file: any) => {
  return new Promise<string>((resolve, reject) => {
    const inputFilePath = file.path;
    const outputFileName = `${file.originalname}.mp4`;
    const blockBlobClient = containerClient.getBlockBlobClient(outputFileName);

    const stream = ffmpeg(inputFilePath)
      .outputFormat('mp4')
      .videoCodec('libx264')
      .audioCodec('aac')
      .size('640x360')
      .on('end', async () => {
        console.log('Transcoding finished');
        const blobUrl = blockBlobClient.url;
        resolve(blobUrl);
      })
      .on('error', (err) => {
        console.error('Error during transcoding:', err);
        reject(err);
      })
      .pipe();

    stream.on('data', (chunk) => {
      blockBlobClient.stageBlock(outputFileName, chunk, chunk.length);
    });

    stream.on('end', async () => {
      await blockBlobClient.commitBlockList([outputFileName]);
    });
  });
};

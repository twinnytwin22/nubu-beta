import FFmpeg from "ffmpeg.js/ffmpeg-mp4";
export const convertToMp4 = async (recordedChunks: any) => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const buffer = await blob.arrayBuffer();
  
    const result = FFmpeg({
      MEMFS: [{ name: "input.webm", data: new Uint8Array(buffer) }],
      arguments: ["-i", "input.webm", "output.mp4"],
    });
  
    const outputData = result.MEMFS[0].data;
    return new Blob([outputData], { type: "video/mp4" });
  };
  
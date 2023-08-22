// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import busboy from "busboy";
import fs from "fs";


async function uploadVideoStream(req: NextApiRequest, res: NextApiResponse) {
  const bb = busboy({ headers: req.headers });
  console.log(bb, "BB")

  bb.on("file", (_, file, info) => {
    const fileName = info.filename;
    const filePath = `/videos/${fileName}`;

    const stream = fs.createWriteStream(filePath);
    console.log(stream, "STREAM")

    file.pipe(stream);
  });

  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end(`That's the end`);
  });

  bb.on("error", (err) => {
    res.status(500).send(`Error uploading file: ${JSON.stringify(err)}`);
  });
  req.pipe(bb);
}

const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb

function getVideoStream(req: NextApiRequest, res: NextApiResponse) {
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send("Range must be provided");
  }

  const videoId = req.query.videoId;

  const videoPath = `./videos/${videoId}.mp4`;

  try {
    const videoSizeInBytes = fs.statSync(videoPath).size;

    const chunkStart = Number(range.replace(/\D/g, ""));
    const chunkEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, videoSizeInBytes - 1);
    const contentLength = chunkEnd - chunkStart + 1;

    const headers = {
      "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, {
      start: chunkStart,
      end: chunkEnd,
    });

    videoStream.on("error", (err) => {
      res.status(500).send(`Error reading video file: ${err.message}`);
    });

    videoStream.pipe(res);
  } catch (err) {
    res.status(500).send(`Error getting video information: ${JSON.stringify(err)}`);
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return getVideoStream(req, res);
}

export async  function POST(req: NextApiRequest, res: NextApiResponse) {
  return (await uploadVideoStream(req, res));
}

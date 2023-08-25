"use client";
import { useIpfsImage } from "@/lib/site/constants";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useStorageUpload } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRef, useState } from "react";

const ffMpeg = new FFmpeg();
export default function VideoConverter() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcoding, setTranscoding] = useState(false);
  const [transcoded, setTranscoded] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [urls, setUrls] = useState<any>();

  const ffmpegRef = useRef(ffMpeg);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync: uploadToIpfs } = useStorageUpload({
    uploadWithoutDirectory: true,
    onProgress: (progress) => {
      // setProgress(progress?.progress); // Update the progress state
      // setTotal(progress?.total); // Update the progress state
    },
  });
  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current && messageRef.current.innerHTML !== 'Aborted()') messageRef.current.innerHTML = message;
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
    setIsLoading(false);
  };

  const transcode = async () => {
    if (!fileInputRef.current?.files?.length) {
      alert("Please select a video file.");
      return;
    }
    setIsLoading(true);

    const ffmpeg = ffmpegRef.current;
    const inputFile = fileInputRef.current.files[0];
    const inputFileName = inputFile.name;
    const inputExtension = inputFileName.split(".").pop()?.toLowerCase();
    const extensionOptions = ["mp4", "mov", "webm",'m4v'];
    if (!extensionOptions?.includes(inputExtension!)) {
      alert("Please select an MP4, WEBM or MOV video file.");
      return;
    }

    const outputFileName = "output.mp4";
    console.log(inputFileName);
    await ffmpeg.writeFile(inputFileName, await fetchFile(inputFile));
    await ffmpeg.exec(["-i", inputFileName, "-q:v", "0", outputFileName]);
    const data = (await ffmpeg.readFile(outputFileName)) as any;
    await upload(data);
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      setTranscoded(true);
      setIsLoading(false);

      return data;
    }
  };

  const upload = async (file: File) => {
    if (file) {
      try {
        const videoFile = new File([file], "video.mp4", { type: "video/mp4" });
        const videoUri = await uploadToIpfs({
          data: [videoFile],
        });
        const finalUrl = useIpfsImage(videoUri[0]);
        if (finalUrl) {
          setUrls({
            ipfs: videoUri[0],
            https: finalUrl,
          });
          console.log(urls);
          setUploaded(true);
          setIsLoading(false);
          return urls;
        }
      } catch (error) {
        console.error("Error uploading to IPFS:", error);
      }
    }
  };
  return (
    <div className="min-w-[315px] w-full h-full max-w-lg">
      {loaded && !uploaded && (
        <div className="w-full">
          <div className="max-w-lg w-full aspect-video hidden">
            <video
              className="object-cover aspect-video w-full"
              ref={videoRef}
              controls
            />
          </div>
          <br />
          {!transcoded && (
            <div>
              <input
                className="block w-full max-w-sm text-sm text-zinc-900 border border-zinc-300 rounded-lg cursor-pointer bg-zinc-50 dark:text-zinc-400 focus:outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400"
                type="file"
                accept=".mp4,.mov,.m4v"
                ref={fileInputRef}
              />
              <br />
              <button
                type="button"
                onClick={transcode}
                className="relative flex items-center bg-teal-600 dark:bg-teal-600 hover:bg-teal-800 text-white py-2 px-4 rounded"
              >
                Upload Video
                {isLoading && (
                  <span className="animate-spin ml-3">
                    <svg
                      viewBox="0 0 1024 1024"
                      focusable="false"
                      data-icon="loading"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      )}
      {!loaded && !transcoded && (
        <button
          className=" flex items-center bg-teal-600 dark:bg-teal-600 hover:bg-teal-800 text-white py-2 px-4 rounded"
          onClick={load}
        >
          Load ffmpeg-core
          {isLoading && (
            <span className="animate-spin ml-3">
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                data-icon="loading"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
              </svg>
            </span>
          )}
        </button>
      )}
      {transcoded && !uploaded && (
        <div>
          <button
            className="relative flex items-center bg-teal-600 dark:bg-teal-600 hover:bg-teal-800 text-white py-2 px-4 rounded"
            onClick={(file: any) => upload(file)}
          >
            Upload
          </button>
        </div>
      )}
      {transcoded && uploaded && urls?.https && (
        <div>
          <video src={urls?.https} controls className="mb-4" />
          <Link href={urls?.https}>
            <button className="relative flex items-center bg-teal-600 dark:bg-teal-600 hover:bg-teal-800 text-white py-2 px-4 rounded">
              View Video
            </button>
          </Link>
        </div>
      )}
      {!uploaded &&
      <p
        className="text-xs w-full min-w-[315px] absolute whitespace-break-spaces left-0"
        ref={messageRef}
      ></p>}
    </div>
  );
}

const useVideoFile = (file: File) => {};

"use client";
import { useIpfsImage } from "@/lib/site/constants";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useStorageUpload } from "@thirdweb-dev/react";
import Link from "next/link";
import { RefObject, useRef, useState } from "react";
import useVideoConverterStore from "./store";

const ffMpeg = new FFmpeg();
export default function VideoConverter() {
  const {
    loaded,
    isLoading,
    transcoding,
    transcoded,
    uploaded,
    urls,
    setLoaded,
    setIsLoading,
    setTranscoding,
    setTranscoded,
    setUploaded,
    setUrls,
  } = useVideoConverterStore();
  const ffmpegRef = useRef<any>(ffMpeg);
  const videoRef = useRef<HTMLVideoElement | null | any>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null | any>(null);

  const { mutateAsync: uploadToIpfs } = useStorageUpload({
    uploadWithoutDirectory: true,
    onProgress: (progress) => {
      // setProgress(progress?.progress); // Update the progress state
      // setTotal(progress?.total); // Update the progress state
    },
  });


  

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
                onClick={() => transcode(fileInputRef?.current?.files[0], ffmpegRef?.current)}
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


export const transcode = async (inputFile: File, ffmpeg: any) => {
  if (!inputFile) {
    alert("Please select a video file.");
    return;
  }
  console.log(inputFile)
  useVideoConverterStore.setState({ isLoading: true });

  const inputFileName = inputFile.name;
  const inputExtension = inputFileName.split(".").pop()?.toLowerCase() || "webm"; // Assume WEBM if no extension
  const extensionOptions = ["mp4", "mov", "webm", "m4v"];
  if (!extensionOptions.includes(inputExtension)) {
    alert("Please select an MP4, WEBM, MOV, or M4V video file.");
    return;
  }

  const outputFileName = "output.mp4";
  console.log(inputFileName);
  await ffmpeg.writeFile(inputFileName, await fetchFile(inputFile));
  await ffmpeg.exec(["-i", inputFileName, "-q:v", "0", outputFileName]);
  const data = (await ffmpeg.readFile(outputFileName)) as any;

  useVideoConverterStore.setState({ transcoded: true });
  useVideoConverterStore.setState({ isLoading: false });

  console.log(data);
  return data;
};



export const load = async (ffmpegRef: any) => {
  useVideoConverterStore.setState({isLoading: true})
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
  const ffmpeg = ffmpegRef.current;
 // ffmpeg.on("log", ({ message }) => {
 //   if (messageRef.current && messageRef.current.innerHTML !== 'Aborted()') messageRef.current.innerHTML = message;
//   });
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.wasm`,
      "application/wasm"
    ),
  });
  useVideoConverterStore.setState({loaded: true})
  useVideoConverterStore.setState({isLoading: false})
};

"use client";
import React, { useRef, useEffect, useState } from "react";
import { BsFillStopCircleFill, BsRecordCircleFill } from "react-icons/bs";
import { ImRedo2 } from "react-icons/im";
import { useMediaStore } from "./store";
import { useStorageUpload } from "@thirdweb-dev/react";
import useEntityFormStore from "@/ui/Forms/CreateEntityForm/store";
import { useIpfsImage } from "@/lib/site/constants";
import TimeLapsed from "./TimeLapsed";
import { Worker, isMainThread, parentPort } from 'worker_threads';


const VideoRecorder = ({toRecording}) => {
  const {
    mediaStream,
    mediaRecorder,
    isRecording,
    recordedChunks,
    doneRecording,
    setProgress,
    setTotal,
    uploaded,
    uploading,
    setMediaStream,
    setMediaRecorder,
    setIsRecording,
    setRecordedChunks,
    setDoneRecording,
    setUploaded,
    setUploading,
    setInProgress,
  } = useMediaStore();
  const { logVideo } = useEntityFormStore();
  const [resetRecording, setResetRecording] = useState(false);
  const [videoFile, setVideoFile] = useState<any>([]);
  const { mutateAsync: upload } = useStorageUpload({
    uploadWithoutDirectory: true,
    onProgress: (progress) => {
      setProgress(progress?.progress); // Update the progress state
      setTotal(progress?.total); // Update the progress state
    },
  });

  const handleDownload = () => {
    if (videoSourceURL) {
      const a = document.createElement("a");
      a.href = videoSourceURL;
      a.download = "recorded-video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const startUpload = async () => {
    try {
      if (videoSourceURL) {
        setInProgress("video");
        // Convert recorded chunks into a Blob
        // Create a File object from the Blob (optional, but might be needed depending on your upload function)
     //   console.log(videoFile, "FILE");
        // Upload the video
        const videoUri = await upload({
          data: [videoFile],
        });

        // Handle the response from the upload, e.g., show a success message
        const finalUrl = useIpfsImage(videoUri[0]);
        useEntityFormStore.setState({ videoUrl: finalUrl });
        logVideo();
       // console.log(finalUrl + ".mp4");
      }
    } catch (error) {
      // Handle upload errors
      console.error("Upload error:", error);
    }
  };
  const resetRecordingState = async () => {
    // Reset all recording-related state variables
    setMediaStream(null);
    setMediaRecorder(null);
    setIsRecording(false);
    setRecordedChunks([]);
    setDoneRecording(false);
    setUploaded(false);
    setUploading(false);
    setResetRecording(prevState => !prevState);

    // Reinitialize the media stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error reinitializing media:", error);
    }
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const initializeMedia = async () => {
    if (toRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error initializing media:", error);
    }}
  };
  useEffect(() => {
    initializeMedia();
  }, [resetRecording]);
 
  useEffect(() => {
    initializeMedia();
  }, []);
  useEffect(() => {
    if (mediaStream) {
      const recorder = new MediaRecorder(mediaStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: "video/webm",
      });

      const newRecordedChunks: Blob[] = []; // Use this array to collect chunks

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        newRecordedChunks.push(event.data);
        setRecordedChunks(newRecordedChunks)
      }
    };

    recorder.onstop = () => {
      const finalBlob = new Blob(newRecordedChunks, { type: "video/mp4" });
      const videoFile = new File([finalBlob], "recorded-video.mp4", {
        type: "video/mp4",
      });
      setVideoFile(videoFile);
    //  console.log(videoFile, "FILE");

    };
      setMediaRecorder(recorder);
    }
  }, [mediaStream, resetRecording]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setDoneRecording(true);
      setIsRecording(false);
      if (resetRecording) {
        setResetRecording(false);
      }
    }
  };

  const videoSourceURL =
    recordedChunks.length > 0 && doneRecording
      ? URL.createObjectURL(recordedChunks[0])
      : null;

 // console.log(videoSourceURL);
  return (
    <div className="relative aspect-video">
      {mediaStream && !doneRecording && videoRef && (
        <>
          {!isRecording ? (
            <p className="mb-4 text-center text-zinc-600 dark:text-zinc-300">
              Welcome! You can record your video below.
            </p>
          ) : (
            <p className="mb-4 text-center text-zinc-600 dark:text-zinc-300 animate-pulse">
              Recording...
            </p>
          )}
          <video
            ref={videoRef}
            autoPlay
            muted
            className="mx-auto rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-800 aspect-video"
          />
        </>
      )}
      {isRecording && (
        <React.Fragment>
          <div className="absolute top-16 left-6">
          <TimeLapsed isRecording={isRecording}/>
          </div>
        <div className="rounded-full absolute top-16 right-6 bg-red-600 h-2.5 w-2.5 p-2.5  animate-pulse" />
      </React.Fragment>
      )}
      {!doneRecording && (
        <div className="absolute bottom-5 right-5 z-50">
          {mediaStream && !isRecording ? (
            <button role="button" onClick={startRecording}>
              {/* Change the color of the recording icon to green */}
              <BsRecordCircleFill
                className={`text-3xl ${isRecording ? "text-green-500" : ""}`}
              />
            </button>
          ) : (
            <button role="button" onClick={stopRecording}>
              {/* Change the color of the stop icon to red */}
              <BsFillStopCircleFill
                className={`text-3xl ${isRecording ? "text-red-500" : ""}`}
              />
            </button>
          )}
        </div>
      )}
      {videoSourceURL && doneRecording && (
        <div>
          <p className="mb-4 text-center text-zinc-600 dark:text-zinc-300">
            If you're happy with your video click upload to save!
          </p>
          <video
            controls
            className="mx-auto rounded-lg shadow-sm border border-zinc-100 dark:border-zinc-800 mb-4 aspect-video"
          >
            <source src={videoSourceURL} type="video/mp4" />
          </video>
          {!resetRecording && (
            <button
              className="absolute flex space-x-2 items-center top-0 right-5 z-50 text-white bg-red-600 px-3 py-1 rounded-lg"
              onClick={() => {
                setResetRecording(false);
                resetRecordingState();
              }}
            >
              <p className="text-xs">Re-do</p>
              <ImRedo2 />
            </button>
          )}
          {!uploaded && (
            <button
              onClick={startUpload}
              type="button"
              className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
            >
              Upload
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default VideoRecorder;

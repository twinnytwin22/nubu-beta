'use client'
import React, { useRef, useState, useEffect } from 'react';

const VideoRecorder = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error initializing media:', error);
      }
    };

    initializeMedia();
  }, []);

  useEffect(() => {
    if (mediaStream) {
      const recorder = new MediaRecorder(mediaStream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prevChunks => [...prevChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        // Do something with the recorded chunks
      };

      setMediaRecorder(recorder);
    }
  }, [mediaStream]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className='relative'>
      {mediaStream && <video ref={videoRef} autoPlay muted />}
      {mediaStream && !isRecording ? (
        <button role='button' onClick={startRecording}>Start Recording</button>
      ) : (
        <button role='button' onClick={stopRecording}>Stop Recording</button>
      )}
      {recordedChunks.length > 0 && (
        <div>
          <h2>Recorded Video</h2>
          <video controls>
            <source src={URL.createObjectURL(recordedChunks[0])} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;

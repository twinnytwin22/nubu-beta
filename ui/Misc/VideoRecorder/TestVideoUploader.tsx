'use client'
import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useEntityFormStore from "@/ui/Forms/CreateEntityForm/store";

function TestVideoUpload() {
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
const {setVideoPreview, setVideoUrl, videoUrl} = useEntityFormStore()
  async function handleSubmit() {
    const data = new FormData();
    const headers = {
        "Accept-Ranges": "bytes",
        "Content-Type": "video/mp4",
      };
    
    if (!file) throw new Error('No File to Submit');

    setSubmitting(true);

    data.append("file", file);

    const config: AxiosRequestConfig = {
      onUploadProgress: function (progressEvent) {
        const percentComplete = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setProgress(percentComplete);
      },
      headers
    };
     if(data === undefined) {
        throw new Error('Data setting error')
     }
    try {
    console.log(data, config)
    const res = await axios.post("/api/v1/video", data, config);
    console.log(res)
    } catch (error) {
      setError('Error');
    } finally {
      setSubmitting(false);
      setProgress(0);
    }
  }

  function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files;
    if (file) {
      // Read the selected file and create a preview URL
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setVideoPreview(event.target.result);
      };
      reader.readAsDataURL(file[0]);

      // Update the "audio" field value in the form data
      setFile(file[0] as any)
    } else {
      // Clear the preview and the "audio" field value if the file was removed
      setVideoPreview("");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {submitting && <p>{progress}%</p>}
      <form action="POST" >
        <div>
          <label htmlFor="file">File</label>
          <input type="file" id="file"  onChange={handleSetFile} />
        </div>
      </form>
      <button onClick={handleSubmit}>Upload video</button>
    </div>
  );
}

export default TestVideoUpload;
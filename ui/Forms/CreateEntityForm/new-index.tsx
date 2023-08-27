"use client";
import React, { FormEvent, useRef, useState } from "react";
import useEntityFormStore from "./store";
import { Controller, useForm } from "react-hook-form";
import VideoRecorder from "@/ui/Misc/VideoRecorder";
import { useMediaStore } from "@/ui/Misc/VideoRecorder/store";
import { FaCamera, FaUpload } from "react-icons/fa";
import { MediaRenderer, useStorageUpload } from "@thirdweb-dev/react";
import { useIpfsUrl } from "@/lib/site/constants";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { load, transcode } from "@/lib/providers/ffmpeg";
import useVideoConverterStore from "@/lib/providers/ffmpeg/store";
import { industryOptions } from "@/lib/site/industryOptions";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
const ffMpeg = new FFmpeg();

const CreateEntityForm2 = () => {
  const ffmpegRef = useRef(ffMpeg);

  const {
    step,
    setStep,
    videoUrl,
    finalVideoUrl,
    setVideoUrl,
    toRecording,
    setToRecording,
    toUploaded,
    setToUploaded,
    setVideoPreview,
    videoPreview,
    logVideo,
    imagePreview,

  } = useEntityFormStore(); //zustand store

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "" || undefined,
      industries: [''],
      address_1: "" || undefined,
      address_2: "" || undefined,
      city: "" || undefined,
      state: "" || undefined,
      postal_code: "" || undefined,
      description: "" || undefined,
      website: '' || undefined,
      video_url: useEntityFormStore.getState().finalVideoUrl! || null,
      image_url: ''|| null,
      telephone: null 
    },
  });
  const {
    uploaded,
    setInProgress,
    setProgress,
    setTotal,
    setUploaded
  } = useMediaStore();
  const {
    transcoding,
    transcoded,
    setTranscoding,
    setTranscoded,
  } = useVideoConverterStore();
  const { mutateAsync: upload } = useStorageUpload({
    uploadWithoutDirectory: true,
    onProgress: (progress) => {
      setProgress(progress?.progress); // Update the progress state
      setTotal(progress?.total); // Update the progress state
    },
  });
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(item => item !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleFormSubmit = async (formData: any) => {

    const videoURL = useEntityFormStore.getState().finalVideoUrl
    // e.preventDefault(); // Prevent the default browser behavior
    setValue('video_url', videoURL)
    setValue('industries', selectedIndustries)
    try {
      if (formData) {
        const response = await fetch('/api/v1/createEntity', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }); // Adjust the endpoint as needed
        console.log(await response.json()); // Assuming your API sends a message in the response
        // Handle any additional logic or feedback to the user
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error feedback to the user
    }
  };


  const onSubmitStep1 = (formData: any) => {
    setStep(2);
  };
  const onSubmitStep2 = (formData: any) => {
    setStep(3);
  };
  const handleChangeStep = (step: number) => setStep(step);

  const startUpload = async () => {
    try {
      if (videoUrl) {
        setInProgress("video");
        const ffmpeg = ffmpegRef.current;
        const transcodedVideo = await transcode(videoUrl, ffmpeg)
        const videoFile = new File([transcodedVideo], "video.mp4", { type: "video/mp4" });
        const videoUri = await upload({
          data: [videoFile],
        });
        const finalUrl = useIpfsUrl(videoUri[0]);
        if (finalUrl) {
          useEntityFormStore.setState({ finalVideoUrl: finalUrl });
        }
        logVideo();
        setUploaded(true)
      }
    } catch (error) {
      // Handle upload errors
      console.error("Upload error:", error);
    }
    console.log(useEntityFormStore.getState().finalVideoUrl, "URL");

  };

  const handleVideoUpload = (event: any) => {
    const file: File = event.target.files[0];
    if (file) {
      // Read the selected file and create a preview URL
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setVideoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      // Update the "audio" field value in the form data
      ///   setValue("video_url", file as any);
      setVideoUrl(file)
    } else {
      // Clear the preview and the "audio" field value if the file was removed
      setVideoPreview("");
      setValue("video_url", null);
    }
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Read the selected file and create a preview URL
      const reader = new FileReader();
      reader.onload = (event: any) => {
        useEntityFormStore.setState({imagePreview: event.target.result})
      };
      reader.readAsDataURL(file);

      // Update the "audio" field value in the form data
      setValue("image_url", file);
    } else {
      // Clear the preview and the "audio" field value if the file was removed
      useEntityFormStore.setState({imagePreview: null})
      setValue("image_url", null);
    }
  };

  const handleRecordClick = async () => {
    setVideoPreview("");
    setToRecording(true);
    setToUploaded(false);
    await load(ffmpegRef)

  };

  const handleUploadClick = async () => {
    setToRecording(false);
    setToUploaded(true);
    await load(ffmpegRef)
  };

  const renderStep1 = () => {
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(onSubmitStep1)} className="relative">
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Entity Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("title", { required: true })}
                placeholder="Type entity name"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address_1"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="address_1"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("address_1", { required: true })}
                placeholder="Address line 1"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address_2"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="address_2"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("address_2", { required: false })}
                placeholder="Address line 2"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("city", { required: true })}
                placeholder="City"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("state", { required: true })}
                placeholder="State"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="postalCode"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("postal_code", { required: true })}
                placeholder="Postal code"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="telephone"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Business Phone Number
              </label>
              <input
                type="text"
                id="telephone"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("telephone", { required: true })}
                placeholder="555-555-5555"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("website", { required: true })}
                placeholder="yourwebsite.com"
                required
              />
            </div>
            <div>
            <label
                //htmlFor="website"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
               Select all that apply
              </label>
            <button
                type="button"
                onClick={handleToggleDropdown}
                className="bg-zinc-100 p-2.5 border h-fit border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 hover:brightness-125  rounded-md w-full text-center text-black dark:text-white text-sm"
              >
                Select Industries
              </button>
              </div>
              <div className="flex items-center justify-center w-full mb-2  mx-auto col-span-2">
            {!imagePreview ? (
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full aspect-video border-2 border-zinc-300 border-dashed rounded-md cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload/>
                  <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">
                      Click to upload artwork
                    </span>
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    PNG, JPG or GIF (MAX.50MB)
                  </p>
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  {...register("image_url")}
                  onChange={handleImageUpload}
                />
              </label>
            )
             :(
              <div>
              <Image
                width={1600}
                height={900}
                className="flex flex-col items-center justify-center w-full aspect-video border border-zinc-300  rounded-md cursor-pointer   dark:border-zinc-700 dark:hover:border-zinc-700 "
                src={imagePreview}
                alt="preview"
              />
              </div>
            )}
          </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={8}
                className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                {...register("description", { required: true })}
                placeholder="Write a entity description here..."
              />
            </div>
            <div className="">
         
              {isOpen && (
                <div className="overlay-container">
                  <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                  <div className="absolute left-0 mt-2 w-full mx-auto w-lg right-0 top-1/3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-lg text-black dark:text-white max-w-lg z-20">
                    <div className="text-sm p-2.5 flex space-x-1 items-center" onClick={handleToggleDropdown}>
                      <p className="">{'Close'}                  &nbsp;
                      </p><AiFillCloseCircle />
                    </div>
                    <div className="p-2 grid grid-cols-2 text-sm">

                      {industryOptions.map((industry, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedIndustries.includes(industry)}
                            onChange={() => toggleIndustry(industry)}
                            className="mr-2"
                          />
                          {industry}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-2">
                {selectedIndustries.length > 0 &&
                  <p className="font-medium text-sm text-black dark:text-white">Selected Industries:</p>}
                <ul className=" pl-6 flex">
                  {selectedIndustries.map((industry, index) => (
                    <li key={index} className="text-zinc-800 dark:text-zinc-200 flex text-xs px-3 font-semibold bg-zinc-300 dark:bg-zinc-800 p-2.5 rounded-full">
                      {industry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="reset"
              className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
            >
              Reset
            </button>
            <button
              type="submit"
              className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
            >
              Next
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  };

  const renderStep2 = () => {
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(onSubmitStep2)}>
          <div className="mb-8 text-black dark:text-white">
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li onClick={handleUploadClick}>
                <input
                  type="radio"
                  id="hosting-small"
                  name="hosting"
                  value="hosting-small"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="hosting-small"
                  className="inline-flex items-center justify-between w-full p-5 text-zinc-500 bg-white border border-zinc-200 rounded-lg cursor-pointer dark:hover:text-zinc-300 dark:border-zinc-700 dark:peer-checked:text-teal-600 peer-checked:border-teal-600 peer-checked:text-black hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Upload</div>
                    <div className="w-full text-sm">
                      Already have your introduction video?
                    </div>
                  </div>
                  <FaUpload />
                </label>
              </li>
              <li onClick={handleRecordClick}>
                <input
                  type="radio"
                  id="hosting-big"
                  name="hosting"
                  value="hosting-big"
                  className="hidden peer"
                />
                <label
                  htmlFor="hosting-big"
                  className="inline-flex items-center justify-between w-full p-5 text-zinc-500 bg-white border border-zinc-200 rounded-lg cursor-pointer dark:hover:text-zinc-300 dark:border-zinc-700 dark:peer-checked:text-teal-600 peer-checked:border-teal-600 peer-checked:text-black hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Record</div>
                    <div className="w-full text-sm">
                      Get started with a fresh introduction.
                    </div>
                  </div>
                  <FaCamera />
                </label>
              </li>
            </ul>
          </div>
          {toRecording && <VideoRecorder toRecording={toRecording} ffmpegRef={ffmpegRef} />}
          {toUploaded && (
            <div className="flex items-center justify-center w-full h-full aspect-video">

              <div className="w-full">
                {!videoPreview ? (
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center w-full border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600 aspect-video h-full"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="text-zinc-500 dark:text-zinc-400 mb-2" />
                      <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        MP4, MOV (MAX. 100MB)
                      </p>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      id="file"
                      accept="video/*"
                      {...register("video_url")}
                      onChange={handleVideoUpload}
                    // Handle video upload logic here
                    // Once the video is uploaded, set setToUploaded(true)
                    />
                  </label>
                ) : (
                  <video controls className="aspect-video" src={videoPreview} />
                )}
              </div>
            </div>
          )}
        </form>
        <div className="flex items-center space-x-4 mt-4">
          <button
            type="button"
            onClick={() => handleChangeStep(1)}
            className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
          >
            Back
          </button>
          {videoPreview && !uploaded && (
            <button
              type="button"
              onClick={startUpload}
              className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
            >
              Upload
            </button>
          )}
          {uploaded && (
            <button
              type="button"
              onClick={() => handleChangeStep(3)}
              className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
            >
              Next
            </button>
          )}
        </div>
      </React.Fragment>
    );
  };

  const renderStep3 = () => {
    const videoSrc = useEntityFormStore.getState().finalVideoUrl!!!;

    return (
      <div className="text-black dark:text-white">
        <video controls className="aspect-video rounded-md" src={videoSrc} />
        <form className="w-full" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-950 w-full rounded-md border border-zinc-200 dark:border-zinc-800" >
            <table className="rounded-md w-full">
              <tbody className="rounded-md ">
                <tr className="border-b   border-zinc-200 dark:border-zinc-800 ">
                  <td className="pr-4 py-2 font-semibold">Entity Name:</td>
                  <td>{watch("title")}</td>
                </tr>
                <tr className="border-b   border-zinc-200 dark:border-zinc-800 ">
                  <td className="pr-4 py-2 font-semibold">Address Line 1:</td>
                  <td>{watch("address_1")}</td>
                </tr>
                <tr className="border-b   border-zinc-200 dark:border-zinc-800 ">
                  <td className="pr-4 py-2 font-semibold">Address Line 2:</td>
                  <td>{watch("address_2")}</td>
                </tr>
                <tr className="border-b   border-zinc-200 dark:border-zinc-800 ">
                  <td className="pr-4 py-2 font-semibold">City:</td>
                  <td>{watch("city")}</td>
                </tr>
                <tr className="border-b   border-zinc-200 dark:border-zinc-800 ">
                  <td className="pr-4 py-2 font-semibold">State:</td>
                  <td>{watch("state")}</td>
                </tr>
                <tr className="border-b   border-zinc-200 dark:border-zinc-800 ">
                  <td className="pr-4 py-2 font-semibold">Postal Code:</td>
                  <td>{watch("postal_code")}</td>
                </tr>
                <tr>
                  <td className="pr-4 py-2 font-semibold">Description:</td>
                  <td>{watch("description")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="submit"
            // onClick={handleFormSubmit}
            className="mt-6 text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
          >
            Create Entity
          </button>

        </form>
        <button
          type="button"
          onClick={() => handleChangeStep(2)}
          className="mt-6 text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
        >
          Back
        </button>
      </div>
    );
  };


  const renderStep4 = () => {
    return (
      <MediaRenderer mimeType="video/*" src="ipfs://QmcTmjZN6sV2vJyZ4B2QG8GFWW5sugBDKg5aEqoyZAxdK8" />
    )
  }
  return (
    <div className="bg-white dark:bg-black h-fit w-full max-w-3xl mx-auto rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="p-8 mx-auto w-full relative">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
          {step === 1 && "Step 1"}
          {step === 2 && "Step 2"}
          {step === 3 && "Step 3"}
        </h2>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

      </div>
    </div>
  );
};
export default CreateEntityForm2
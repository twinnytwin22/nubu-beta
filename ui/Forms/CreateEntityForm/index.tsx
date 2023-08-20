"use client";
import React, { useState } from "react";
import useEntityFormStore from "./store";
import VideoRecorder from "@/ui/Misc/VideoRecorder";
import { useMediaStore } from "@/ui/Misc/VideoRecorder/store";
import { FaCamera, FaUpload } from "react-icons/fa";

const CreateEntityForm = () => {
  const {
    step,
    setStep,
    entityName,
    setEntityName,
    addressLine1,
    setAddressLine1,
    addressLine2,
    setAddressLine2,
    city,
    setCity,
    state,
    setState,
    postalCode,
    setPostalCode,
    description,
    setDescription,
    videoUrl,
  } = useEntityFormStore();
  const { uploaded } = useMediaStore();
  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleChangeStep = (step: number) => setStep(step);
  const [toRecording, setToRecording] = useState(false);
  const [toUploaded, setToUploaded] = useState(false);

  const handleRecordClick = () => {
    setToRecording(true);
    setToUploaded(false);
  };

  const handleUploadClick = () => {
    setToRecording(false);
    setToUploaded(true);
  };
  const renderStep1 = () => {
    return (
      <div className="bg-white dark:bg-black  h-fit w-full max-w-3xl mx-auto rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="p-8 mx-auto w-full">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
            Tell us about your business.
          </h2>
          <form onSubmit={handleFormSubmit}>
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
                  name="name"
                  id="name"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  placeholder="Type entity name"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="addressLine1"
                  className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="Address line 1"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="addressLine2"
                  className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  id="addressLine2"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
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
                  name="city"
                  id="city"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
                  name="state"
                  id="state"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                  name="postalCode"
                  id="postalCode"
                  className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-zinc-600 focus:border-zinc-700 block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  value={description}
                  id="description"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-900 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a entity description here..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => handleChangeStep(2)}
                className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="bg-white dark:bg-black  h-fit w-full max-w-3xl mx-auto rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="p-8 mx-auto w-full">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
            Step 2
          </h2>

          <div className="mb-8 text-black dark:text-white ">
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
                  className="inline-flex items-center justify-between w-full p-5 text-zinc-500 bg-white border border-zinc-200 rounded-lg cursor-pointer dark:hover:text-zinc-300 dark:border-zinc-700 dark:peer-checked:text-black peer-checked:border-black peer-checked:text-black hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Upload</div>
                    <div className="w-full text-sm">
                      Already have your introduction video?
                    </div>
                  </div>
                 <FaUpload/>
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
                  className="inline-flex items-center justify-between w-full p-5 text-zinc-500 bg-white border border-zinc-200 rounded-lg cursor-pointer dark:hover:text-zinc-300 dark:border-zinc-700 dark:peer-checked:text-black peer-checked:border-black peer-checked:text-black hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Record</div>
                    <div className="w-full text-sm">
                      Get started with a fresh introduction.
                    </div>
                  </div>
                <FaCamera/>
                </label>
              </li>
            </ul>
          </div>
          {toRecording && <VideoRecorder />}
          {toUploaded && (
            <div className="flex items-center justify-center w-full h-full aspect-video">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                 <FaUpload className="text-zinc-500 dark:text-zinc-400 mb-2"/>
                  <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 ">
                    MP4, MOV (MAX. 100MB)
                  </p>
                </div>
                <input
                  className="hidden"
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    // Handle video upload logic here
                    // Once the video is uploaded, set setToUploaded(true)
                  }}
                />
              </label>
            </div>
          )}
        </div>
        <form>
          <div className="flex items-center space-x-4">
            {uploaded && (
              <>
                <button
                  type="button"
                  onClick={() => handleChangeStep(1)}
                  className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => handleChangeStep(3)}
                  className="text-white duration-300 ease-in-out bg-teal-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-900 dark:focus:ring-zinc-800"
                >
                  Next
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
    </React.Fragment>
  );
};

export default CreateEntityForm;

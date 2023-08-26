"use client";
import { create } from "zustand";

interface EntityFormState {
  entityName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  videoPreview: string;
  postalCode: string;
  description: string;
  step: number;
  videoUrl: File |  null;
  finalVideoUrl: string | null;

  toRecording: boolean;
  toUploaded: boolean;
setVideoPreview:(videoPreview: string) => void;
  setEntityName: (name: string) => void;
  setAddressLine1: (address: string) => void;
  setAddressLine2: (address: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setPostalCode: (code: string) => void;
  setDescription: (description: string) => void;
  setStep: (step: number) => void;
  setVideoUrl: (videoUrl: File | null) => void;
  setToRecording: (value: boolean) => void;
  setToUploaded: (value: boolean) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
  handleChangeStep: (step: number) => void;
  logVideo: () => void;
}

const useEntityFormStore = create<EntityFormState>((set, get) => ({
  entityName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  description: "",
  step: 1,
  videoUrl: null,
  finalVideoUrl: null,
  toRecording: false,
  toUploaded: false,
  videoPreview: '',
setVideoPreview:(videoPreview)=>set({videoPreview:videoPreview}),
  setEntityName: (name) => set({ entityName: name }),
  setAddressLine1: (address) => set({ addressLine1: address }),
  setAddressLine2: (address) => set({ addressLine2: address }),
  setCity: (city) => set({ city: city }),
  setState: (state) => set({ state: state }),
  setPostalCode: (code) => set({ postalCode: code }),
  setDescription: (description) => set({ description: description }),
  setStep: (step) => set({ step: step }),
  setVideoUrl: (videoUrl) => set({ videoUrl: videoUrl }),
  setToRecording: (value) => set({ toRecording: value }),
  setToUploaded: (value) => set({ toUploaded: value }),
  handleFormSubmit: (event) => {
    event.preventDefault();
    // Handle form submission logic here
  },
  handleChangeStep: (step) => set({ step: step }),
  logVideo: () => {
    console.log(` Upload URL: ${get().finalVideoUrl}`);
  },
}));

export default useEntityFormStore;

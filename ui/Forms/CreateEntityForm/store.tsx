'use client'
import { create } from 'zustand';

interface EntityFormState {
  entityName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  description: string;
  step: number;
  videoUrl: string;
  setEntityName: (name: string) => void;
  setAddressLine1: (address: string) => void;
  setAddressLine2: (address: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setPostalCode: (code: string) => void;
  setDescription: (description: string) => void;
  setStep: (step: number) => void;
  setVideoUrl: (videoUrl: string) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
  handleChangeStep: (step: number) => void;
  logVideo: () => void;
}

const useEntityFormStore = create<EntityFormState>((set, get) => ({
  entityName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  description: '',
  step: 1,
  videoUrl: '',
  setEntityName: (name) => set({ entityName: name }),
  setAddressLine1: (address) => set({ addressLine1: address }),
  setAddressLine2: (address) => set({ addressLine2: address }),
  setCity: (city) => set({ city: city }),
  setState: (state) => set({ state: state }),
  setPostalCode: (code) => set({ postalCode: code }),
  setDescription: (description) => set({ description: description }),
  setStep: (step) => set({ step: step }),
  setVideoUrl: (videoUrl) => set({videoUrl: videoUrl}),
  handleFormSubmit: (event) => {
    event.preventDefault();
    // Handle form submission logic here
  },
  handleChangeStep: (step) => set({ step: step }),
  logVideo: () => {
    console.log(` Upload URL: ${get().videoUrl}`)
}
}));

export default useEntityFormStore;

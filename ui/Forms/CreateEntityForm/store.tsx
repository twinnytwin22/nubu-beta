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
  setEntityName: (name: string) => void;
  setAddressLine1: (address: string) => void;
  setAddressLine2: (address: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setPostalCode: (code: string) => void;
  setDescription: (description: string) => void;
  setStep: (step: number) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
  handleChangeStep: (step: number) => void;
}

const useEntityFormStore = create<EntityFormState>((set) => ({
  entityName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  description: '',
  step: 1,
  setEntityName: (name) => set({ entityName: name }),
  setAddressLine1: (address) => set({ addressLine1: address }),
  setAddressLine2: (address) => set({ addressLine2: address }),
  setCity: (city) => set({ city: city }),
  setState: (state) => set({ state: state }),
  setPostalCode: (code) => set({ postalCode: code }),
  setDescription: (description) => set({ description: description }),
  setStep: (step) => set({ step: step }),
  handleFormSubmit: (event) => {
    event.preventDefault();
    // Handle form submission logic here
  },
  handleChangeStep: (step) => set({ step: step }),
}));

export default useEntityFormStore;

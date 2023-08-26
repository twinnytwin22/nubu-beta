import {create} from 'zustand';

interface VideoConverterState {
  loaded: boolean;
  isLoading: boolean;
  transcoding: boolean;
  transcoded: boolean;
  uploaded: boolean;
  urls: any; // Update the type for urls if possible
  setLoaded: (loaded: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTranscoding: (transcoding: boolean) => void;
  setTranscoded: (transcoded: boolean) => void;
  setUploaded: (uploaded: boolean) => void;
  setUrls: (urls: any) => void; // Update the type for urls if possible
}

const useVideoConverterStore = create<VideoConverterState>((set) => ({
  loaded: false,
  isLoading: false,
  transcoding: false,
  transcoded: false,
  uploaded: false,
  urls: null,

  setLoaded: (loaded) => set({ loaded }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setTranscoding: (transcoding) => set({ transcoding }),
  setTranscoded: (transcoded) => set({ transcoded }),
  setUploaded: (uploaded) => set({ uploaded }),
  setUrls: (urls) => set({ urls }),
}));

export default useVideoConverterStore;

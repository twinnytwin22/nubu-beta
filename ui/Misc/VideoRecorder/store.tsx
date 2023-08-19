import {create} from 'zustand';

interface MediaStore {
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  isRecording: boolean;
  recordedChunks: Blob[] | any[];
  doneRecording: boolean;
  uploaded: boolean;
  uploading: boolean;
  progress: number;
  inProgress: null | string
  total: number;
  setMediaStream: (stream: MediaStream | null) => void;
  setMediaRecorder: (recorder: MediaRecorder | null) => void;
  setIsRecording: (recording: boolean) => void;
  setRecordedChunks: (chunks: Blob[]) => void;
  setDoneRecording: (done: boolean) => void;
  setUploaded: (uploaded: boolean) => void;
  setUploading: (uploading: boolean) => void;
  setProgress: (progress: number) => void;
  setTotal: (total: number) => void;
  setInProgress: (inProgress: string | null) => void;

}

export const useMediaStore = create<MediaStore>((set, get) => ({
  mediaStream: null,
  mediaRecorder: null,
  inProgress: null,
  total: 0,
  progress: 0,

  isRecording: false,
  recordedChunks: [],
  doneRecording: false,
  uploaded: false,
  uploading: false,
  setInProgress: (inProgress) => set({ inProgress }),
  setProgress: (progress) => set({ progress }),
    setTotal: (total) => set({ total }),
  setMediaStream: (stream) => set({ mediaStream: stream }),
  setMediaRecorder: (recorder) => set({ mediaRecorder: recorder }),
  setIsRecording: (recording) => set({ isRecording: recording }),
  setRecordedChunks: (chunks: Blob[]) => set({ recordedChunks: chunks }),
  setDoneRecording: (done) => set({ doneRecording: done }),
  setUploaded: (uploaded) => set({ uploaded: uploaded }),
  setUploading: (uploading) => set({ uploading: uploading }),
}));

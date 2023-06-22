import { useCallback, useRef } from "react";

export default function useStream() {
  const videoRef = useRef<HTMLVideoElement>();

  const setStream = useCallback(
    (stream: MediaStream) => {
      if (stream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
      }
    },
    [videoRef]
  );

  const handleCanPlay = () => {
    videoRef.current && videoRef.current.play();
  };

  return [setStream, videoRef, handleCanPlay];
}

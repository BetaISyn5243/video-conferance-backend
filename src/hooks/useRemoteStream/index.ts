import { useCallback, useState } from "react";

export default function useRemoteStreams() {
  const [remoteStreams, setRemoteStreams] = useState<
    Array<{
      peerId: string;
      stream: MediaStream;
    }>
  >([]);

  const addRemoteStream = useCallback(
    (stream: MediaStream, peerId: string) => {
      setRemoteStreams((remoteStreams) => {
        if (!stream || !peerId) return [...remoteStreams];
        if (remoteStreams.some((remote: any) => remote.peerId === peerId))
          return [...remoteStreams];
        return [...remoteStreams, { peerId: peerId, stream: stream }];
      });
    },
    [remoteStreams]
  );

  const removeRemoteStream = useCallback(
    (peerId: string) => {
      setRemoteStreams((remoteStreams) => {
        const index = remoteStreams.findIndex(
          (remote: any) => remote.peerId === peerId
        );
        if (index < 0) return [...remoteStreams];
        remoteStreams.splice(index, 1);
        return [...remoteStreams];
      });
    },
    [remoteStreams]
  );
  return [remoteStreams, addRemoteStream, removeRemoteStream];
}

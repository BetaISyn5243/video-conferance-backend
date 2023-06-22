import { useCallback, useEffect, useState } from "react";
import Peer from "peerjs";

export default function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket>();
  const [connectedPeers, setConnectedPeers] = useState<Peer[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const socketURL = "http://localhost:3000/video";

  const getPeers = () => {
    return JSON.stringify({ type: "peers" });
  };

  const getChatMessages = () => {
    return JSON.stringify({ type: "allMessages" });
  };

  const cleanUp = () => {
    setConnectedPeers([]);
    setMessages([]);
  };

  const sendMessage = useCallback((peerId: string, message: string) => {
    const data = JSON.stringify({
      type: "message",
      message: {
        peerId,
        message,
        date: Date.now(),
      },
    });
    socket && socket.send(data);
  }, []);

  const connect = useCallback((peerId: string) => {
    const data = JSON.stringify({
      type: "connect",
      message: {
        peerId,
      },
    });
    socket && socket.send(data);
  }, []);

  const disconnect = useCallback((peerId: string) => {
    const data = JSON.stringify({
      type: "disconnect",
      message: {
        peerId,
      },
    });
    socket && socket.send(data);
  }, []);

  useEffect(() => {
    const ws = socket ? socket : new WebSocket(socketURL);

    setSocket(ws);

    ws.onopen = () => {
      console.log("connected");
      ws.send(getPeers());
      ws.send(getChatMessages());
    };

    ws.onclose = () => {
      console.log("disconnected");
      cleanUp();
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "message":
          setMessages((messages: any[]) => [...messages, data.message]);
          break;
        case "allMessages":
          setMessages(data.allMessages);
          break;
        case "peers":
          setConnectedPeers(data.connectedPeers);
          break;
        case "updatePeers":
          ws.send(getPeers());
          break;
        default:
          console.log("Message from websock not indentified");
      }
    };

    ws.onerror = (error) => {
      console.log(error);
    };

    return () => {
      ws.close();
      cleanUp();
    };
  }, []);

  return { socket, connectedPeers, messages, sendMessage, connect, disconnect };
}

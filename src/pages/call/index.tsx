import React from 'react'
import { useParams } from 'react-router-dom'
import {Container} from "@mui/material";
import {io} from "socket.io-client";

const Call: React.FC = () => {
  const socket = io('/')
  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true);
    }
  };
  return (
    <Container>
      <p>{callId}</p>
    </Container>
  )
}

export default Call
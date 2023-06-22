import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import { io } from "socket.io-client";
import ChatWidget from "../../components/ChatWidget";
import { useFormik } from "formik";
import FormikTextField from "../../components/FormikTextField";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";

const myPeer = new Peer(localStorage.getItem("key") ?? uuidv4(), {
  host: "localhost",
  port: 3051,
});
const Home: React.FC = () => {
  const socket = io("http://localhost:3000/chat", {
    extraHeaders: {
      "Access-Control-Allow-Private-Network": "true",
    },
  });
  const socketForVideo = io("http://localhost:3000/video", {
    extraHeaders: {
      "Access-Control-Allow-Private-Network": "true",
    },
  });
  const roomID = "123123";
  const videoGridRef = useRef<HTMLDivElement>(null);
  const myVideo = document.createElement("video");
  const [myPeerList, setMyPeerList] = useState([""]);
  myVideo.muted = true;
  useEffect(() => {
    localStorage.setItem("key", uuidv4());
    socket.emit("joinRoom", roomID);
    socketForVideo.emit("joinRoom", roomID);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        myVideo.srcObject = stream;
      });
    myVideo.play();
    videoGridRef.current && videoGridRef.current.append(myVideo);
    socketForVideo.emit("stream", { room: roomID, userID: myPeer.id });
  }, []);

  useEffect(() => {
    socketForVideo.on("user-stream", (response: any) => {
      console.log(response);
      if (!myPeerList.find((x) => x === response))
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream: MediaStream) => {
            setMyPeerList((prevState) => [...prevState, response]);
            const call = myPeer.call(response, stream);
            const video = document.createElement("video");
            call.on("stream", function (remoteStream) {
              video.srcObject = remoteStream;
              video.play();
              videoGridRef.current && videoGridRef.current.append(video);
            });
            call.on("close", () => {
              video.remove();
            });
          });
    });
  }, [socketForVideo]);

  useEffect(() => {
    myPeer.on("call", (call: any) => {
      if (!myPeerList.find((x) => x === call.peer))
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream: MediaStream) => {
            setMyPeerList((prevState) => [...prevState, call.peer]);
            call.answer(stream);
            const video = document.createElement("video");
            call.on("stream", function (remoteStream: MediaStream) {
              video.srcObject = remoteStream;
              video.play();
              videoGridRef.current && videoGridRef.current.appendChild(video);
              // Show stream in some video/canvas element.
            });

            call.on("close", () => {
              video.remove();
            });
          });
    });
  }, []);

  const formik = useFormik({
    initialValues: { chat: "" },
    onSubmit: (values) => {
      socket.emit("chatToServer", {
        sender: "name",
        room: roomID,
        message: values.chat,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      });
      formik.resetForm();
    },
  });

  return (
    <Stack
      direction={"column"}
      justifyContent={"space-between"}
      height={"100%"}
    >
      <Box sx={{ minHeight: "60%", maxHeight: "60%", height: "60%" }}>
        <Card>
          <CardContent>
            <Grid container>
              <div
                ref={videoGridRef}
                style={{ overflow: "auto", height: "56vh" }}
                id={"video-grid"}
              ></div>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          minHeight: "40%",
          height: "40%",
          maxHeight: "40%",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          autoComplete={"off"}
          style={{ height: "100%" }}
        >
          <Card
            sx={{
              justifyContent: "space-between",
              position: "absolute",
              bottom: 0,
              width: "100vw",
            }}
            raised
          >
            <CardContent sx={{ height: "20vh", overflow: "auto" }}>
              <ChatWidget socket={socket} />
            </CardContent>
            <CardActions>
              <FormikTextField
                formik={formik}
                fieldName={"chat"}
                type={"text"}
                label={"Mesaj Gönder"}
                placeHolder={"Mesajınız"}
              />
              <Button
                variant={"contained"}
                type={"submit"}
                sx={{ p: 1, marginLeft: 5 }}
              >
                Yolla
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </Stack>
  );
};
export default Home;

import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Divider, List } from "@mui/material";
import ChatBubble from "./ChatBubble";

interface IChatWidget {
  socket: Socket;
}

const ChatWidget = (props: IChatWidget) => {
  const [messageHistory, setMessageHistory] = useState<
    {
      sender: string;
      room: string;
      message: string;
      time: string;
    }[]
  >();

  useEffect(() => {
    props.socket.on("chatToClient", (data) => {
      setMessageHistory((prevState) =>
        !prevState ? [data] : [...prevState, data]
      );
      console.log(data);
    });
  }, [props.socket]);

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {messageHistory?.map((value, key) => (
          <React.Fragment key={key}>
            <ChatBubble
              message={value.message}
              sender={value.sender}
              time={value.time}
            />
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default ChatWidget;

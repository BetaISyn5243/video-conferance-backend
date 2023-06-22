import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export interface IChatBubble {
  message: string;
  sender: string;
  time: string;
}
const ChatBubble = (props: IChatBubble) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={props.message}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {props.sender}
            </Typography>
            — {props.time}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
export default ChatBubble;

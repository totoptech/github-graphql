import React from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import MuiListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";

type ListItemProps = {
  title: string;
  desc?: string;
  link?: string;
  avatar?: string;
};

const ListItem = ({ title, desc, link, avatar }: ListItemProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${link}`);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt={title} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline", overflowWrap: "break-word" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {desc}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ListItem;

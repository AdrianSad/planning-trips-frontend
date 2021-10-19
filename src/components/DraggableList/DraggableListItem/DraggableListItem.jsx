import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { EditLocation } from "@material-ui/icons";

const DraggableListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            background: snapshot.isDragging ? "rgb(235,235,235)" : "initial",
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <EditLocation />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.title}
            secondary={
              <>
                <p>{`Latitude: ${item.position.lat}`}</p>
                <p>{`Longitude: ${item.position.lng}`}</p>
              </>
            }
          />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;

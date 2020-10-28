import React, { useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    ListItemSecondaryAction
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import images from '../../Images/playerImages/playerImage'
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    result.forEach((item, key) => {
        if (key == 0) {
            item.ranking = '1st'
        } else if (key == 1) {
            item.ranking = '2nd'
        } else if (key == 2) {
            item.ranking = '3th'
        } else if (key == result.length - 1) {
            item.ranking = 'Last best'
        } else {
            item.ranking = null;
        }

    });

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)"
    })
});



export default function Henkie(props) {

    const [items, setItems] = useState(props.players);

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        setItems(
            reorder(
                items,
                result.source.index,
                result.destination.index
            )
        );

        // this.setState({
        //     items
        // });
    }


    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                        <List>
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <ListItem
                                            ContainerComponent="li"
                                            ContainerProps={{ ref: provided.innerRef }}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <ListItemIcon>
                                                {/* <InboxIcon /> */}
                                                <img alt="Mormel logo" src={images[item.image]} style={{ width: '100%', marginRight: '5px' }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={item.ranking ? <b>{item.ranking}</b> : <i>neutral </i>}
                                            />
                                            <ListItemSecondaryAction>
                                                {/* <IconButton>
                                                    <EditIcon />
                                                </IconButton> */}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    </RootRef>
                )}
            </Droppable>
        </DragDropContext>
    );
}


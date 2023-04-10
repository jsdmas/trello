import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const DraggableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
    return (
        <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
            {(provided) => <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{toDoText}</Card>}
        </Draggable>
    );
};

export default memo(DraggableCard);
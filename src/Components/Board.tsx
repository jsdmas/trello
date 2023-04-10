import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atom";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFormThis: boolean;
}

interface IForm {
    toDo: string;
}

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

/**
 * snapshot.isDraggingOver : 요소가 이동했는지 판별하는 boolean
 * snapshot.isDraggingFormThis : 요소가 부모 테이블에서 떠났을때의 ID값, 아래 코드에서는 boolean으로 변경해서 색상변경하는 조건으로 사용
 */
const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFormThis ? "#b2bec3" : "transparent"};
    flex: 1;
`;

const Form = styled.form`
    width: 100%;
    input{
        width: 100%;
    }
`;

const Board = ({ toDos, boardId }: IBoardProps) => {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onVaild = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [newToDo, ...allBoards[boardId]],
            };
        });
        setValue("toDo", "");
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onVaild)}>
                <input {...register("toDo", { required: true })}
                    type="text"
                    placeholder={`Add task on a ${boardId}`}
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) =>
                    <Area
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFormThis={Boolean(snapshot.draggingFromThisWith)}
                    >
                        {toDos.map((toDo, index) => <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />)}
                        {provided.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
    );
};

export default Board;
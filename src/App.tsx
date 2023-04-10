import styled from "styled-components";
/**
 *  React-beautiful-dnd 설명
 * 
 *  DragDropContext @description 끌어서 놓기를 활성화하려는 응용 프로그램 부분을 래핑
 *                  @property {function} onDragEnd 이동이 끝났을떄 실행할 함수
 * 
 *  Droppable @description : 요소를 드롭할 수 있는 영역
 *            @property {HTMLElement} innerRef ref
 *            @property {Object} droppableProps 드롭핸들링 props
 *            @property {ReactNode} placeholder 요소를 꺼낼떄 빈자리에 모양이 이상해지지 않게 더미요소를 놓아두는것
 * 
 *  Draggable @description : 드래그 할 수 있는 영역
 *            @property {HTMLElement} innerRef ref
 *            @property {Object} draggableProps 핸들링되는 영역
 *            @property {Object} dragHandleProps 핸들링하는 영역 설정  
 */
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atom";
import Board from "./Components/Board";

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  max-width: 680px;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap : 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const App = () => {
  const [toDos, setToDo] = useRecoilState(toDoState);

  /**
   * @description 드래그가 끝났을 때 실행되는 함수, 주요 argument 목록
   * @property {Object} destination : droppableId, index 포함 (자신이 옮겨지는 위치)
   * @property {String} draggableId : 옮기는 행위를 한 요소의 Id값
   * @property {Object} source : droppableId, index 포함 (자신의 원래 위치)
   */
  const onDragEnd = ({ destination, source }: DropResult) => {
    // 제자리
    if (!destination) return;
    // same board movement
    if (destination.droppableId === source.droppableId) {
      setToDo(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    // cross board movement
    if (destination.droppableId !== source.droppableId) {
      setToDo(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: sourceBoard, [destination.droppableId]: destinationBoard };
      });
    }
  };

  return (
    <Wrapper>
      <Boards>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(toDos).map((boardId) => <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />)}
        </DragDropContext>
      </Boards>
    </Wrapper>
  );
};

export default App;
import { atom } from "recoil";

export interface IToDo {
    id: number;
    text: string;
}

interface IToDoState {
    // IToDo로 이루어진 Array를 만들겠다고 선언.
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: []
    }
})
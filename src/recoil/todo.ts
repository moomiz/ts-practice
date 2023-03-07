import { atom } from "recoil";
export interface ITodoTypes {
    id: number;
    contents: string; 
    isCompleted: boolean;
}
// atom 지정하면 전역적으로  접근 가능 하게 됨! 

export const inputState = atom<string>({
    key: "inputState",
    default:"",
});

export const todoState = atom<ITodoTypes[]>({
    key: "todos",
    default: [
        {
            id: 1,
            contents: "스트레칭 하기",
            isCompleted: false,
        }
    ]
})  
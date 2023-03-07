import { ITodoTypes, todoState } from "../recoil/todo";
import React,{ useCallback } from "react";
import { useRecoilState,useRecoilValue } from "recoil";

interface PropTypes {
    id: number;
    content: string;
    isCompleted: boolean;
}

export const TodoItem = (props: PropTypes) => {
    const { id, content, isCompleted } = props;
    const [todos, setTodos] =useRecoilState<ITodoTypes[]>(todoState);

    // 완료 상태 변경 
    const handleComplete = useCallback(
        (id: number) => {
            setTodos(
                todos.map((todo:ITodoTypes)=>{
                    return todo.id === id? {
                        ...todo,
                        isCompleted:!todo.isCompleted,
                    }:todo;
                })
            );
        },
        [setTodos, todos]
    )
    
    // Todo 삭제 
    const deleteTodo = useCallback(
        (id: number) =>{
           setTodos(todos.filter((todo: ITodoTypes) => todo.id !==id)); 
        },[setTodos, todos]
    )
    return (
        <div>
            <h2
            onClick={()=>{
                handleComplete(id);
            }}>
                {id}. {content} {isCompleted ? "o":"x"}
            </h2>
            <button onClick={()=>deleteTodo(id)}>삭제</button>
        </div>
    );
}
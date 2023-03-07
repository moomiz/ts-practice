import React, { ChangeEvent, useCallback } from "react";
import { inputState,ITodoTypes, todoState } from "../recoil/todo";
import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil';
import { TodoItem } from "./TodoItem";

export const RecoilPrc = ():JSX.Element=>{ 
    const [content, setContent] =useRecoilState<string>(inputState);
    const todos =useRecoilValue<ITodoTypes[]>(todoState);
    // atom으로 만든 todoState 가져옴 
    const setTodo = useSetRecoilState<ITodoTypes[]>(todoState)
    // 데이터 변경 
    

    // todo 추가하기 
    const addTodo = useCallback((): void => {
        if(!content.trim()){
            // 빈칸 입력 방지
            return;
        }
        const nextId = todos.length > 0 ? todos[todos.length - 1].id +1 : 0;
        const todo:ITodoTypes = {
            id:nextId,
            contents: content,
            isCompleted: false,
        }

        setTodo([...todos, todo]);
        setContent("");
    },[content, setContent,setTodo,todos])

    // todo에 들어갈 content 감지
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            setContent(e.target.value);
        },[setContent]
    )

    //엔터 클릭시 입력되는 이벤트   
    const onkeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>): void => {
            if(e.key === "Enter") {
                addTodo();
            }
        },[addTodo]
    )
    return (
        <div>
            <div>
                <input
                type="text"
                placeholder="todo입력"
                value={content}
                onChange={onChange}
                onKeyDown={onkeyDown}
                />
                <button onClick={addTodo}>등록하기</button>
            </div>
            {todos.map((todo:ITodoTypes) => {
                const {id, contents, isCompleted } = todo;
                return (
                    <TodoItem
                        key={id}
                        id={id}
                        content={contents}
                        isCompleted={isCompleted}
                    />
                );
            })}
        </div>
    )
}
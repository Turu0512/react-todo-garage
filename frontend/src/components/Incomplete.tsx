import React from "react";
import { Todo } from "./Todotype";

type Props = {
  todo: Todo[];
  onClickComplete: Function;
  onClickDelete: Function;
};

export const Incomplete: React.VFC<Props> = (props) => {
  const { todo, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todo.map((todo) => {
          return (
            <li key={todo.todo_id}>
              <div className="list-row">
                <p>{todo.todo_title}</p>
                <button onClick={() => onClickComplete(todo)}>完了</button>
                <button onClick={() => onClickDelete(todo.todo_id)}>
                  削除
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

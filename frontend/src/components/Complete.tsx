import React from "react";
import { Todo } from "./Todotype";

type Props = {
  todo: Todo[];
  onClickBack: Function;
};

export const Complete: React.VFC<Props> = (props) => {
  const { todo, onClickBack } = props;
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {todo.map((todo) => {
          return (
            <li key={todo.todo_id}>
              <div className="list-row">
                <p>{todo.todo_title}</p>
                <button onClick={() => onClickBack(todo)}>戻す</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

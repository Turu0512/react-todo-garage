import React from "react";

type Props = {
  // todo: [{ todo_title: string; todo_id: number }];
  todo: any[];
  onClickComplete: Function;
  onClickDelete: Function;
};

export const Incomplete: React.VFC<Props> = (props) => {
  const { todo, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todo.map((todo, index: number) => {
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

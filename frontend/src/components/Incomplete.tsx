import React from "react";

type Props = {
  todo: string[];
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
            <li key={todo}>
              <div className="list-row">
                <p>{todo}</p>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

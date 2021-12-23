import React from "react";

type Props = {
  todoText: string;
  onChangeTodoText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Input: React.VFC<Props> = (props) => {
  const { todoText, onChangeTodoText, onClickAdd } = props;
  return (
    <div className="input-area">
      <input
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChangeTodoText}
      />
      <button onClick={onClickAdd}>追加</button>
    </div>
  );
};

import React, { useState } from "react";
import "./styles.css";
import { Input } from "./components/Input";
import { Incomplete } from "./components/Incomplete";
import { Complete } from "./components/Complete";
import axios from "axios";

export const App = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const onClickAdd = async () => {
    if (todoText === "") return;
    setIncompleteTodos([...incompleteTodos, todoText]);
    const jsonTodoText = {
      todo_title: todoText,
    };
    console.log(jsonTodoText);
    await axios.post("http://127.0.0.1:8000/todo", jsonTodoText).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    setTodoText("");
  };

  const onClickDelete = (i: number) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(i, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (i: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(i, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[i]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (i: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(i, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[i]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      <Input
        todoText={todoText}
        onChangeTodoText={onChangeTodoText}
        onClickAdd={onClickAdd}
      />
      <Incomplete
        todo={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <Complete todo={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

import React, { useEffect, useState } from "react";
import "./styles.css";
import { Input } from "./components/Input";
import { Incomplete } from "./components/Incomplete";
import { Complete } from "./components/Complete";
import axios from "axios";

export const App = () => {
  type Todo = [{ todo_title: string; todo_id: number }];

  const [todoText, setTodoText] = useState<string>("");
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const todoData = async () => {
    const todos = await axios.get("http://127.0.0.1:8000/todos").then((res) => {
      // console.log([...res.data]);
      const todo = [...res.data];
      setIncompleteTodos(todo);
    });
  };

  const compleatTodoData = async () => {
    const todos = await axios
      .get("http://127.0.0.1:8000/compleat_todo")
      .then((res) => {
        // console.log([...res.data]);
        const todo = [...res.data];
        setCompleteTodos(todo);
      });
  };

  useEffect(() => {
    console.log("useEffectが実行されました");
    todoData();
    compleatTodoData();
  }, []);

  const onClickAdd = async () => {
    if (todoText === "") return;
    const jsonTodoText = {
      todo_title: todoText,
    };
    console.log(jsonTodoText);
    await axios
      .post("http://127.0.0.1:8000/todo", jsonTodoText)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.request);
        console.log(error.response);
        console.log(error.isAxiosError);
        console.log(error.toJSON);
      });
    todoData();
    setTodoText("");
  };

  const onClickDelete = async (id: number) => {
    // const newTodos = [...incompleteTodos];
    // newTodos.splice(i, 1);
    // setIncompleteTodos(newTodos);
    await axios
      .delete("http://127.0.0.1:8000/todo/" + id)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        todoData();
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.request);
        console.log(error.response);
        console.log(error.isAxiosError);
        console.log(error.toJSON);
      });
  };

  const onClickComplete = async (todo: any) => {
    await axios
      .post("http://127.0.0.1:8000/compleat_todo", {
        todo_title: todo.todo_title,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.request);
        console.log(error.response);
        console.log(error.isAxiosError);
        console.log(error.toJSON);
      });
    onClickDelete(todo.todo_id);
    compleatTodoData();
    // console.log(todo);
  };

  const onClickBack = async (todo: any) => {
    await axios
      .delete("http://127.0.0.1:8000/compleat_todo/" + todo.todo_id)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        todoData();
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.request);
        console.log(error.response);
        console.log(error.isAxiosError);
        console.log(error.toJSON);
      });

    await axios
      .post("http://127.0.0.1:8000/todo", { todo_title: todo.todo_title })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.request);
        console.log(error.response);
        console.log(error.isAxiosError);
        console.log(error.toJSON);
      });
    todoData();
    compleatTodoData();
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

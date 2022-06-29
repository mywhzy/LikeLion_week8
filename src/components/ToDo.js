import ToDoInsert from "./ToDoInsert";
import ToDoList from "./ToDoList";
import ToDoTitle from "./ToDoTitle";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { toDos, toDoCounter } from "../atoms/Todos";

const ToDoBox = styled.div`
  height: 780px;
  width: 650px;
  border: 2px solid rgb(149, 178, 247);
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(192, 221, 251);
  overflow: auto; //-ToDoList부분으로 이동시키기
  box-shadow: 1px 1px 3px 1px #6293f3;
`;

function ToDo() {
  const [todos, setTodos] = useRecoilState(toDos);
  const [index, setIndex] = useState(0);
  const [inputTodo, setInputTodo] = useState("");
  const counts = useRecoilValue(toDoCounter);
  const resetTodos = useResetRecoilState(toDos);

  function addToDoList() {
    if (inputTodo) {
      const newTodo = {
        id: index,
        content: inputTodo,
        done: false,
      };
      setTodos(todos.concat(newTodo));
      setIndex(index + 1);
      setInputTodo("");
    }
  }

  function handleOnsubmit(e) {
    e.preventDefault();
    addToDoList();
  }

  function handleOnchange(e) {
    setInputTodo(e.target.value);
  }

  function isChecked(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function deleteToDoList(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <ToDoBox>
      <ToDoTitle />
      <ToDoInsert
        inputTodo={inputTodo}
        handleOnchange={handleOnchange}
        addTodo={addToDoList}
        submitTodo={handleOnsubmit}
      />
      <ToDoList
        todos={todos}
        counts={counts}
        resetTodos={resetTodos}
        checkedTodo={isChecked}
        deleteTodo={deleteToDoList}
      />
    </ToDoBox>
  );
}

export default ToDo;

import { Container } from "@mantine/core";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Todo, Form, Tasks } from "./simpleform";
import "../../index.css";
export default function HomePage() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [formInput, setFormInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formInput !== "") {
      const date = new Date().toLocaleDateString();
      const newTask = {
        date: date,
        task: formInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setFormInput("");
    }
  };

  const handleComplete = (index: number) => {
    const newTasks = [...tasks];
    if (newTasks[index].completed === false) {
      newTasks[index].completed = true;
    } else {
      newTasks[index].completed = false;
    }
    setTasks(newTasks);
  };

  const handleRemove = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleRemoveAll = () => {
    setTasks([]);
  };

  return (
    <Container>
      <Form
        formInput={formInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Todo
        tasks={tasks}
        handleComplete={handleComplete}
        handleRemove={handleRemove}
        handleRemoveAll={handleRemoveAll}
      />
    </Container>
  );
}

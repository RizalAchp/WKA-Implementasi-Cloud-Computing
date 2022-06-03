import { Button, MenuLabel, Space, TextInput } from "@mantine/core";
import { MuteIcon, PlusIcon, TrashIcon } from "@primer/octicons-react";
import { ChangeEvent, FormEvent } from "react";

export interface Tasks {
  date: string;
  task: string;
  completed: boolean;
}

interface SimpleForms {
  formInput: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

interface SimpleTodosList {
  tasks: Tasks[];
  handleComplete: (e: number) => void;
  handleRemove: (e: number) => void;
  handleRemoveAll: () => void;
}

export const Form = ({
  formInput,
  handleChange,
  handleSubmit,
}: SimpleForms) => {
  return (
    <form
      className={"formInput"}
      style={{
        display: "flex",
        justifyContent: "center",
        justifySelf: "center",
        paddingLeft: "2rem",
      }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="taskInput"></label>
      <input required type="text" value={formInput} onChange={handleChange} />
      <Button className="btn-add" type="submit">
        <PlusIcon size="medium" verticalAlign="middle"></PlusIcon>
      </Button>
    </form>
  );
};

export const Todo = ({
  tasks,
  handleComplete,
  handleRemove,
  handleRemoveAll,
}: SimpleTodosList) => {
  return (
    <ul className="todo">
      {tasks.map((task, index) => (
        <li key={`todo_simple_${index}`}>
          <div className="checkAndTask">
            <label className="checkContainer">
              <input type="checkbox" onClick={() => handleComplete(index)} />
              <span className="checkmark"></span>
            </label>
            <span style={{ width: "100%", justifyContent: "center" }}>
              {task.task}
            </span>
          </div>
          <button onClick={() => handleRemove(index)}>
            <TrashIcon size="small" verticalAlign="middle"></TrashIcon>
          </button>
        </li>
      ))}
      {tasks.length > 1 && (
        <p>
          <button
            style={{ fontSize: "24px" }}
            className="deleteAll"
            onClick={() => handleRemoveAll()}
          >
            <TrashIcon size="medium" verticalAlign="middle" />
            <Space w={5}></Space>
            Delete all
          </button>
        </p>
      )}
    </ul>
  );
};

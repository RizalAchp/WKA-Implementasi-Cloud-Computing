import { Box, Button, Container, List, ThemeIcon } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import useSWR from "swr";

import { fetchget, fetchPatchParams } from "../../components/Api";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import { Users, TodoUpdateStatus, TodosPayloads } from "../../components/Comps";
import { AddTodos } from "../../components/Todos";

export default function Dashboard() {
  const [users, _] = useLocalStorage<Users>({
    key: "userstodo",
    defaultValue: {},
  });
  const { data, mutate } = useSWR<TodosPayloads>(
    `/api/todos/${users.user_id}`,
    fetchget
  );

  async function MarkTodoDone(data: TodoUpdateStatus) {
    const updated: TodosPayloads = await fetchPatchParams(
      "/api/todos/update/status",
      data
    );
    mutate(updated);
  }

  return (
    <Container>
      <Box
        sx={(_) => ({
          padding: "2rem",
          width: "100%",
          maxWidth: "40rem",
          margin: "0 auto",
        })}
      >
        <List spacing="xs" size="sm" mb={12} center>
          {data?.payload?.map((todo) => {
            return (
              <List.Item
                key={`todo_list_${todo.todo_id}`}
                icon={
                  todo.done ? (
                    <ThemeIcon
                      onClick={() =>
                        MarkTodoDone({
                          sts: !todo.done,
                          todo_id: todo.todo_id,
                          user_id: todo.list_id,
                        })
                      }
                      color="teal"
                      size={24}
                      radius="xl"
                    >
                      <CheckCircleFillIcon size={20} />{" "}
                    </ThemeIcon>
                  ) : (
                    <ThemeIcon
                      onClick={() =>
                        MarkTodoDone({
                          sts: !todo.done,
                          todo_id: todo.todo_id,
                          user_id: todo.list_id,
                        })
                      }
                      color="gray"
                      size={24}
                      radius="xl"
                    >
                      <CheckCircleFillIcon size={20} />{" "}
                    </ThemeIcon>
                  )
                }
              >
                {todo.title}
              </List.Item>
            );
          })}
        </List>
        <Button onClick={() => <AddTodos mutate={mutate} />}>
          {" "}
          Add Todos{" "}
        </Button>
      </Box>
    </Container>
  );
}

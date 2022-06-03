import {
  Button,
  Group,
  Modal,
  Select,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CalendarIcon } from "@primer/octicons-react";
import { forwardRef, useState } from "react";
import { KeyedMutator } from "swr";
import { fetchpost } from "../Api";
import { TIPETODO, TodosPayloads } from "../Comps";

import { DateRangePicker } from "@mantine/dates";

interface TodosProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: JSX.Element;
  label: string;
  description: string;
}

interface AddTodosProps {
  mutate: KeyedMutator<TodosPayloads>;
}

interface TodosForm {
  title: string;
  body: string;
  done: boolean;
  tipe: string;
  time: [Date | null, Date | null];
}

const SelectItemTodo = forwardRef<HTMLDivElement, TodosProps>(
  ({ icon, label, description, ...others }: TodosProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ThemeIcon>{icon}</ThemeIcon>

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export function AddTodos({ mutate }: AddTodosProps) {
  const [open, setOpen] = useState(true);
  const form = useForm<TodosForm>({
    initialValues: {
      title: "",
      body: "",
      done: false,
      tipe: "etc",
      time: [new Date(), new Date()],
    },

    validate: {
      title: (value: string) => (value ? null : "title is empty"),
      body: (value: string) => (value ? null : "description is empty"),
    },
  });

  async function add_todos(val: typeof form.values) {
    const updated = await fetchpost("/api/todos/add", {
      title: val.title,
      body: val.body,
      done: val.done,
      tipe: val.tipe,
      time: val.time.map((d) => d?.toUTCString()),
    });

    form.reset();
    setOpen(false);

    mutate(updated.todos);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create Todos">
        <form onSubmit={form.onSubmit(add_todos)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you wnat to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps("tipe")}
          />
          <Select
            required
            icon={<CalendarIcon size={16} />}
            label="Pilih Tipe Kegiatan Todo"
            placeholder="Pick one"
            itemComponent={SelectItemTodo}
            data={TIPETODO}
            searchable
            maxDropdownHeight={400}
            nothingFound="None"
            filter={(value, item) =>
              item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.description
                .toLowerCase()
                .includes(value.toLowerCase().trim())
            }
            onChange={(val: string) => form.setFieldValue("tipe", val)}
          />
          <DateRangePicker
            required
            label="Pilih Tanggal berlaku Todo"
            placeholder="Pick dates range"
            value={form.values.time}
            onChange={(val: [Date | null, Date | null]) =>
              form.setFieldValue("time", val)
            }
          />
          <Button type="submit" fullWidth my={12} mx={12}>
            {" "}
            Add Todo{" "}
          </Button>
        </form>
      </Modal>
      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Add Todo
        </Button>
      </Group>
    </>
  );
}

import {
  TextInput,
  Checkbox,
  Button,
  Group,
  PasswordInput,
  Text,
  Progress,
  Popover,
} from "@mantine/core";
import { LoginForms } from "../../components/Comps";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { useRef, useState } from "react";

interface LoginPros {
  form: UseFormReturnType<LoginForms>;
  handler: (val: LoginForms) => Promise<void>;
}

interface SignInProps {
  form: UseFormReturnType<LoginForms>;
  handler: (val: LoginForms) => Promise<void>;
  checks?: JSX.Element[];
  getStrength: (password: string) => number;
}

export const FormLogin = ({ form, handler }: LoginPros) => {
  return (
    <div>
      <Text size="md" color="red">
        Anda Belum Melakukan Login, Login Terlebih Dahulu
      </Text>
      <form onSubmit={form.onSubmit(handler)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("name")}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Checkbox
          mt="md"
          label="Remember me"
          {...form.getInputProps("rememberMe", { type: "checkbox" })}
        />
        <Group position="right" mt="md">
          <Button
            fullWidth={true}
            type="submit"
            onClick={() => {
              form.setFieldValue("confirmPassword", form.values.password);
            }}
          >
            Login Now
          </Button>
        </Group>
      </form>
    </div>
  );
};

export const FormSignUp = ({
  form,
  handler,
  checks,
  getStrength,
}: SignInProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const strength = getStrength(form.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  return (
    <div>
      <form onSubmit={form.onSubmit(handler)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("name")}
        />
        <Popover
          opened={popoverOpened}
          position="bottom"
          placement="start"
          withArrow
          styles={{ popover: { width: "100%" } }}
          trapFocus={false}
          transition="pop-top-left"
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
          target={
            <PasswordInput
              required
              mt="sm"
              label="Password"
              placeholder="Password"
              description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
              {...form.getInputProps("password")}
            />
          }
        >
          <Progress
            color={color}
            value={strength}
            size={5}
            style={{ marginBottom: 10 }}
          />
          {checks}
        </Popover>
        <PasswordInput
          autoComplete="new-password"
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />
        <Checkbox
          mt="md"
          label="Remember me"
          {...form.getInputProps("rememberMe", { type: "checkbox" })}
        />
        <Group position="right" mt="md">
          <Button fullWidth={true} type="submit">
            Register Now
          </Button>
        </Group>
      </form>
    </div>
  );
};

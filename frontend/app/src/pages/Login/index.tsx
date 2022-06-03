import { Group, Box, Container, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { CheckIcon, CrossReferenceIcon } from "@primer/octicons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchpost } from "../../components/Api";
import { LoginForms, ResponseUsers, Users } from "../../components/Comps";
import { FormLogin, FormSignUp } from "./Comps";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon /> : <CrossReferenceIcon />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
function LoginPage() {
  const [statess, setStatess] = useState(true);
  const nav = useNavigate();
  const [_, setUserTodo] = useLocalStorage<Users | undefined>({
    key: "users_todos",
    defaultValue: undefined,
  });

  const loginHandler = async (val: LoginForms) => {
    const response: ResponseUsers = await fetchpost("/api/login", {
      name: val.name,
      password: val.password,
    });
    if (response.status) {
      if (val.rememberMe) setUserTodo(response.user);
      else sessionStorage.setItem("users", JSON.stringify(response.user));
      return nav("/dashboard", { replace: true });
    }
    return nav("/login", { replace: false });
  };
  const form = useForm<LoginForms>({
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },

    validate: {
      name: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (value: string) => {
        return (
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={value.length > 5}
          />
        );
      },
      confirmPassword: (val: string, values) =>
        val !== values.password ? "Passwords did not match" : null,
    },
  });

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));
  return (
    <Container>
      <Box sx={{ maxWidth: 600 }} mx="auto" my="auto">
        <h1>{statess ? "Sign In" : "Sign Up"}</h1>
        {statess ? (
          <FormLogin form={form} handler={loginHandler} />
        ) : (
          <FormSignUp
            form={form}
            handler={loginHandler}
            checks={checks}
            getStrength={getStrength}
          />
        )}

        <Group position="right" mt="md">
          <Link
            to="#"
            onClick={() => {
              setStatess(!statess);
            }}
          >
            {statess ? "sign in" : "has no account? sign up!"}{" "}
          </Link>
        </Group>
      </Box>
    </Container>
  );
}

export default LoginPage;

import HomePage from "./HomePage";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";
import Preferences from "./Preferences";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import {
  AppShell,
  Burger,
  Footer,
  Group,
  Header,
  Navbar,
  useMantineTheme,
  Text,
  MediaQuery,
} from "@mantine/core";

import {
  BookmarkFillIcon,
  BugIcon,
  HomeIcon,
  KeyIcon,
} from "@primer/octicons-react";
import { useLocalStorage } from "@mantine/hooks";
import { Users } from "../components/Comps";
import { useState } from "react";

export function MainApp() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [show, setShow] = useState(false);
  const [sesusers, _] = useState(sessionStorage.getItem("users_todos"));
  const [users, setUser] = useLocalStorage<Users | null>({
    key: "users_todos",
    defaultValue: null,
  });
  if (users === null) {
    if (sesusers !== null) {
      setUser(JSON.parse(sesusers));
    }
  }

  return (
    <Router>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          },
        }}
        navbarOffsetBreakpoint={opened ? "sm" : "xl"}
        fixed={!opened}
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint={opened ? "md" : "sm"}
            hidden={!show}
            width={opened ? { sm: 100, lg: 250 } : { sm: 50, lg: "auto" }}
          >
            <Group direction="column" spacing="md">
              <NavLink to="/">
                {opened ? (
                  <>Home</>
                ) : (
                  <HomeIcon verticalAlign="middle" size="medium" />
                )}
              </NavLink>
              {users ? (
                <NavLink to="/dashboard">
                  {opened ? (
                    <>Dashboard</>
                  ) : (
                    <BookmarkFillIcon verticalAlign="middle" size="medium" />
                  )}
                </NavLink>
              ) : null}
              {users ? (
                <NavLink to="/preferences">
                  {opened ? (
                    <>Preferences</>
                  ) : (
                    <BugIcon verticalAlign="middle" size="small" />
                  )}
                  Preferences
                </NavLink>
              ) : null}

              <NavLink to="/login">
                {opened ? (
                  <>Login</>
                ) : (
                  <KeyIcon verticalAlign="middle" size="medium" />
                )}
              </NavLink>
            </Group>
          </Navbar>
        }
        footer={
          <Footer height={50} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              Application footer
            </div>
          </Footer>
        }
        header={
          <Header height={50} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="xs" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => {
                    setOpened((o) => !o);
                    setShow((p) => !p);
                  }}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
            </div>
          </Header>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={users ? <Dashboard /> : <LoginPage />}
          />
          <Route
            path="/preferences"
            element={users ? <Preferences /> : <LoginPage />}
          />
          <Route
            path="/login"
            element={users ? <Dashboard /> : <LoginPage />}
          />
        </Routes>
      </AppShell>
    </Router>
  );
}

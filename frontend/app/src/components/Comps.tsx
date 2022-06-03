import {
  AppsIcon,
  BookIcon,
  BookmarkFillIcon,
  BookmarkSlashIcon,
  BugIcon,
  CpuIcon,
  MoonIcon,
  NoteIcon,
} from "@primer/octicons-react";

type TipeTodo = ["kerja", "kuliah", "belajar", "program", "istirahat", "etc"];

export const TIPETODO = [
  {
    icon: <AppsIcon size="small" />,
    value: "kerja",
    label: "Kerja",
    description: "kerja lembur bagai quda",
  },
  {
    icon: <BookmarkSlashIcon size="small" />,
    value: "kuliah",
    label: "Kuliah",
    description: "kuliah teross",
  },
  {
    icon: <BookIcon size="small" />,
    value: "belajar",
    label: "Belajar",
    description: "belajar sampai mampus",
  },
  {
    icon: <CpuIcon size="small" />,
    value: "program",
    label: "Program",
    description: "programming related",
  },
  {
    icon: <MoonIcon size="small" />,
    value: "istirahat",
    label: "Istirahat",
    description: "beristirahatlah dengan tenang",
  },
  {
    icon: <NoteIcon size="small" />,
    value: "etc",
    label: "Etc..",
    description: "other type, i dont know what..",
  },
];

export interface Users {
  user_id?: number;
  name?: string;
  password?: string;
  created?: string;
  islogin?: boolean;
  token?: string;
}

export interface TodoUpdateStatus {
  sts?: boolean;
  todo_id?: number;
  user_id?: number;
}

export interface Todos {
  todo_id?: number;
  list_id?: number;
  title?: string;
  body?: string;

  done?: boolean;
  tipe?: string | TipeTodo;
  time?: string[] | (string | undefined)[];
}

export interface LoginForms {
  name: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

export interface ResponseUsers {
  status: boolean;
  msg: string;
  user?: Users;
}

export interface TodosPayloads {
  status: boolean;
  message: string;
  payload: Todos[];
}

import { Todos, TodoUpdateStatus, Users } from "../Comps";

export let ENDPOINT = "api.rizaltodo.app";
type T = Users | Todos;

export const fetchget = async (url: string) =>
  await fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export const fetchpost = async (url: string, data: T) =>
  await fetch(`${ENDPOINT}/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const fetchPatchParams = async (url: string, data: TodoUpdateStatus) => {
  const encoded = Object.entries(data)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
  return await fetch(`${ENDPOINT}/${url}?${encoded}`, { method: "PATCH" }).then(
    (r) => r.json()
  );
};

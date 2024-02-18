import { UserWithNodes } from "./types";

const host = import.meta.env.VITE_GATE_HOST;

export async function getUserNodes(authId: string): Promise<UserWithNodes> {
  const res = await fetch(`${host}/gates/auth-id/${authId}`);
  switch (res.status) {
    case 200:
      return res.json();
    default:
      throw new Error("Could not load user nodes");
  }
}

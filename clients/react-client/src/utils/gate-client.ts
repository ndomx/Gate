import { UserWithNodes } from "./types";

export async function getUserNodes(authId: string): Promise<UserWithNodes> {
  const res = await fetch(`/gates/auth-id/${authId}`);

  switch (res.status) {
    case 200:
      return res.json();
    default:
      throw new Error("Could not load user nodes");
  }
}

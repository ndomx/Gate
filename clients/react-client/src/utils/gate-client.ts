import { CommandStatus, UserWithNodes } from "./types";

export async function getUserNodes(authId: string): Promise<UserWithNodes> {
  const res = await fetch(`/gates/auth-id/${authId}`);

  switch (res.status) {
    case 200:
      return res.json();
    default:
      throw new Error("Could not load user nodes");
  }
}

export async function activateNode(
  userId: string,
  nodeId: string
): Promise<void> {
  const res = await fetch(`/gates/${nodeId}/activate`, {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      userId,
      action: "on",
    }),
    method: "POST",
  });

  if (res.status != 204) {
    throw new Error(`API responded with status ${res.status}`);
  }
}

export async function getCommandStatus(nodeId: string): Promise<CommandStatus> {
  const res = await fetch(`/gates/${nodeId}/status`);

  if (res.status != 200) {
    throw new Error(`API responded with status ${res.status}`);
  }

  return res.json();
}

export async function startStatusPolling(
  nodeId: string,
  delay: number
): Promise<number> {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      const res = await getCommandStatus(nodeId);
      if (res.pending) {
        return;
      }

      clearInterval(intervalId);
      if (!res.responseCode) {
        reject();
      }

      resolve(res.responseCode!);
    }, delay);
  });
}

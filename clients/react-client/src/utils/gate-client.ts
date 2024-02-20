import axios from "axios";
import {
  CommandStatusResponse,
  CommandStatusResponseCode,
  UserWithNodes,
} from "./types";

const headers: Record<string, string> = {
  "x-api-key": import.meta.env.VITE_GATE_API_KEY,
};

export async function getUserNodes(authId: string): Promise<UserWithNodes> {
  const res = await axios.get(`/gates/auth-id/${authId}`, {
    headers,
  });

  switch (res.status) {
    case 200:
      return res.data;
    default:
      throw new Error("Could not load user nodes");
  }
}

export async function activateNode(
  userId: string,
  nodeId: string
): Promise<void> {
  const res = await axios.post(
    `/gates/${nodeId}/activate`,
    {
      userId,
      action: "on",
    },
    {
      headers,
    }
  );

  if (res.status != 204) {
    throw new Error(`API responded with status ${res.status}`);
  }
}

export async function getCommandStatus(
  nodeId: string
): Promise<CommandStatusResponse> {
  const res = await axios.get(`/gates/${nodeId}/status`, { headers });

  if (res.status != 200) {
    throw new Error(`API responded with status ${res.status}`);
  }

  return res.data();
}

export async function startStatusPolling(
  nodeId: string,
  delay: number
): Promise<CommandStatusResponseCode> {
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

      resolve(res.responseCode! as CommandStatusResponseCode);
    }, delay);
  });
}

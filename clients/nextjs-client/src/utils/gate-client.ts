import axios, { AxiosError, AxiosResponse } from "axios";
import {
  CommandStatusResponse,
  CommandStatusResponseCode,
  UserWithNodes,
} from "./types";

function buildHeaders() {
  return {
    "x-api-key": process.env.GATE_API_KEY,
  };
}

function handleAxiosError(e: AxiosError | unknown): AxiosResponse {
  if (!(e instanceof AxiosError)) {
    throw e;
  }

  if (!e.response) {
    throw new Error("unhandled axios error");
  }

  return e.response;
}

export function get(path: string): Promise<AxiosResponse> {
  return axios
    .get(path, {
      headers: buildHeaders(),
      baseURL: process.env.GATE_BASE_HOST,
    })
    .catch((e) => handleAxiosError(e));
}

export function post(
  path: string,
  data: Record<string, any>
): Promise<AxiosResponse> {
  return axios
    .post(path, data, {
      headers: buildHeaders(),
      baseURL: process.env.GATE_BASE_HOST,
    })
    .catch((e) => handleAxiosError(e));
}

export function throwHttpError(
  method: string,
  path: string,
  status: number
): never {
  throw new Error(`${method} ${path} returned ${status}`);
}

export async function getUserNodes(
  authId: string
): Promise<Partial<UserWithNodes>> {
  const path = `/gates/nodes/external/${authId}`;
  const res = await get(path);

  switch (res.status) {
    case 200:
      return res.data;
    case 404:
      return {};
  }

  throwHttpError("GET", path, res.status);
}

export async function activateNode(
  userId: string,
  nodeId: string
): Promise<void> {
  const path = `/gates/${nodeId}/activate`;
  const res = await post(path, {
    userId,
    action: "on",
    actionDetails: {
      timeout: 1000,
    },
  });

  if (res.status !== 204) {
    throwHttpError("POST", path, res.status);
  }
}

export async function getCommandStatus(
  nodeId: string
): Promise<CommandStatusResponse> {
  const path = `/gates/${nodeId}/status`;
  const res = await get(path);

  if (res.status != 200) {
    throwHttpError("GET", path, res.status);
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
      console.log(res);
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

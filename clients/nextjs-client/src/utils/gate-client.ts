import axios, { AxiosError, AxiosResponse } from "axios";
import { UserWithNodes } from "./types";

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

function get(path: string): Promise<AxiosResponse> {
  return axios
    .get(path, {
      headers: buildHeaders(),
      baseURL: process.env.GATE_BASE_HOST,
    })
    .catch((e) => handleAxiosError(e));
}

function post(path: string, data: Record<string, any>): Promise<AxiosResponse> {
  return axios
    .post(path, data, {
      headers: buildHeaders(),
      baseURL: process.env.GATE_BASE_HOST,
    })
    .catch((e) => handleAxiosError(e));
}

function throwHttpError(method: string, path: string, status: number): never {
  throw new Error(`${method} ${path} returned ${status}`);
}

export async function getUserNodes(authId: string): Promise<UserWithNodes> {
  const path = `/gates/auth-id/${authId}`;
  const res = await get(path);

  if (res.status === 200) {
    return res.data;
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

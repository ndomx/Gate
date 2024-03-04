import { COMMAND_STATUS_RESPONSE_CODE } from "@/utils/constants";
import { get, throwHttpError } from "@/utils/gate-client";
import {
  CommandStatusResponse,
} from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

type HttpGetParams = {
  params: { nodeId: string };
};

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest, { params }: HttpGetParams) {
  const res = await startStatusPolling(params.nodeId, 1000).catch((e) => {
    return COMMAND_STATUS_RESPONSE_CODE.UNKNOWN_ERROR;
  });

  return NextResponse.json({ status: res });
}

async function getCommandStatus(
  nodeId: string
): Promise<CommandStatusResponse> {
  const path = `/gates/${nodeId}/status`;
  const res = await get(path);

  if (res.status != 200) {
    throwHttpError("GET", path, res.status);
  }

  return res.data;
}

function startStatusPolling(nodeId: string, delay: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      const res = await getCommandStatus(nodeId).catch((e) => {
        clearInterval(intervalId);
        reject();

        throw e;
      });

      if (res.pending) {
        return;
      }

      clearInterval(intervalId);
      resolve(res.responseCode || COMMAND_STATUS_RESPONSE_CODE.UNKNOWN_ERROR);
    }, delay);
  });
}

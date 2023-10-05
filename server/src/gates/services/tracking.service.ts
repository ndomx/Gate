import { Injectable, Logger } from '@nestjs/common';
import { CommandExecutionDto } from '../dtos/commons/command-execution.dto';

@Injectable()
export class TrackingService {
  private readonly activeTasks = new Map<string, CommandExecutionDto>();
  private readonly logger = new Logger('TrackingService');

  create(deviceId: string, timeout: number) {
    this.logger.log(`creating new entry for device ${deviceId}`);
    this.activeTasks.set(deviceId, {
      pending: true,
      startedAt: Date.now(),
      timeout,
    });
  }

  get(deviceId: string): CommandExecutionDto {
    if (!this.#hasActiveTask(deviceId)) {
      return null;
    }

    return this.activeTasks.get(deviceId);
  }

  update(deviceId: string, status: number) {
    if (!this.#hasActiveTask(deviceId)) {
      return;
    }

    const task = this.activeTasks.get(deviceId);
    task.pending = false;
    task.responseCode = status;

    this.logger.debug(`set task.pending to false for device ${deviceId}`);
  }

  delete(deviceId: string) {
    const result = this.activeTasks.delete(deviceId);
    if (!result) {
      this.logger.warn('attempted to delete an unexisting task');
    }
  }

  #hasActiveTask(deviceId: string): boolean {
    if (!this.activeTasks.has(deviceId)) {
      this.logger.warn('receive request for untracked device');

      return false;
    }

    return true;
  }
}

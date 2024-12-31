// src/tasks/tasks.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private lastRun: Date;
  private logs: string[] = [];
  private readonly maxLogSize = 100; // Maximum number of logs to retain

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    try {
      this.lastRun = new Date();
      const logMessage = `Task executed at ${this.lastRun.toISOString()}`;
      this.addLog(logMessage);
      this.logger.debug(logMessage);
    } catch (error) {
      const errorMessage = `Error in scheduled task: ${error.message}`;
      this.addLog(errorMessage);
      this.logger.error(errorMessage, error.stack);
    }
  }

  private addLog(message: string) {
    // Add the new log message
    this.logs.push(message);

    // Trim the logs array if it exceeds the maximum size
    if (this.logs.length > this.maxLogSize) {
      this.logs.shift(); // Remove the oldest log
    }
  }

  getStatus() {
    const now = new Date();
    const isTaskRunning = this.lastRun
      ? now.getTime() - this.lastRun.getTime() < 10000
      : false;

    return {
      lastRun: this.lastRun,
      isTaskRunning,
      message: 'Scheduled task status',
    };
  }

  getLogs() {
    return this.logs;
  }
}

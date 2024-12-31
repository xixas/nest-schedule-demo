// src/monitor/monitor.controller.ts
import { Controller, Get } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('status')
  getStatus() {
    return this.tasksService.getStatus();
  }

  @Get('logs')
  getLogs() {
    return this.tasksService.getLogs();
  }
}

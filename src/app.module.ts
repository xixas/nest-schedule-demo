// src/app.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { HealthModule } from './health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { MonitorController } from './monitor/monitor.controller';

@Module({
  imports: [ScheduleModule.forRoot(), TerminusModule, HealthModule],
  controllers: [MonitorController],
  providers: [TasksService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Task } from "./tasks.model";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SequelizeModule.forFeature([Task])],
})
export class TasksModule {}

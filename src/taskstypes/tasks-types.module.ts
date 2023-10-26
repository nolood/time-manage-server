import { Module } from "@nestjs/common";
import { TasksTypesController } from "./tasks-types.controller";
import { TasksTypesService } from "./tasks-types.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { TaskType } from "./tasks-types.model";

@Module({
  controllers: [TasksTypesController],
  providers: [TasksTypesService],
  imports: [SequelizeModule.forFeature([TaskType])],
})
export class TasksTypesModule {}

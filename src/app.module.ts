import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { Task } from "./tasks/tasks.model";
import { TasksTypesModule } from "./taskstypes/tasks-types.module";
import { TaskType } from "./taskstypes/tasks-types.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Task, TaskType],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    TasksTypesModule,
  ],
  controllers: [TasksController],
  providers: [],
})
export class AppModule {}

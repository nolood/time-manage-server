import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Task } from "../tasks/tasks.model";

@Table({ tableName: "tasks_types" })
export class TaskType extends Model<TaskType> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;
  @Column({
    type: DataTypes.STRING,
    unique: true,
  })
  value: string;

  @HasMany(() => Task)
  tasks: Task[];
}

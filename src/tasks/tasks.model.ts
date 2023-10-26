import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../users/users.model";
import { TaskType } from "../taskstypes/tasks-types.model";

interface TaskCreationAttributes {
  title: string;
  description: string;
  priority: number;
  type: number;
  color: string;
}

@Table({ tableName: "tasks" })
export class Task extends Model<Task> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataTypes.BIGINT,
  })
  id: bigint;
  @Column({
    type: DataTypes.STRING,
  })
  title: string;
  @Column({
    type: DataTypes.STRING,
  })
  description: string;
  @Column({
    type: DataTypes.INTEGER,
  })
  priority: number;
  @Column({
    type: DataTypes.STRING,
  })
  color: string;

  @ForeignKey(() => TaskType)
  @Column({
    type: DataTypes.INTEGER,
  })
  typeId: number;

  @BelongsTo(() => TaskType)
  type: TaskType;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}

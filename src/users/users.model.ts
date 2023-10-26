import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Task } from "../tasks/tasks.model";

interface UserCreationAttributes {
  email: string;
  username: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  username: string;
  @Column({ type: DataTypes.STRING })
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
}

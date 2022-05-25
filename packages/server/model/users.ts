import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  id: string;
  name: string;
  email: string;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersCreationAttributes = usersAttributes;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: string;
  name!: string;
  email!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

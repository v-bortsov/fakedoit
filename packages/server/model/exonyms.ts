import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface exonymsAttributes {
  id?: number;
  name: string;
  language_id: number;
  placeable_id: number;
  type: string;
}

export type exonymsPk = "id";
export type exonymsId = exonyms[exonymsPk];
export type exonymsCreationAttributes = Optional<exonymsAttributes, exonymsPk>;

export class exonyms extends Model<exonymsAttributes, exonymsCreationAttributes> implements exonymsAttributes {
  id?: number;
  name!: string;
  language_id!: number;
  placeable_id!: number;
  type!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof exonyms {
    exonyms.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    placeable_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'exonyms',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "exonyms_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return exonyms;
  }
}

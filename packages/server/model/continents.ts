import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface continentsAttributes {
  id?: number;
  name: string;
  abbr?: string;
}

export type continentsPk = "id";
export type continentsId = continents[continentsPk];
export type continentsCreationAttributes = Optional<continentsAttributes, continentsPk>;

export class continents extends Model<continentsAttributes, continentsCreationAttributes> implements continentsAttributes {
  id?: number;
  name!: string;
  abbr?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof continents {
    continents.init({
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
    abbr: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'continents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "continents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return continents;
  }
}

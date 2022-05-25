import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface regionsAttributes {
  id: number;
  native?: string;
  name?: string;
  code?: string;
  country_id?: number;
}

export type regionsPk = "id";
export type regionsId = regions[regionsPk];
export type regionsOptionalAttributes = "native" | "name" | "code" | "country_id";
export type regionsCreationAttributes = Optional<regionsAttributes, regionsOptionalAttributes>;

export class regions extends Model<regionsAttributes, regionsCreationAttributes> implements regionsAttributes {
  id!: number;
  native?: string;
  name?: string;
  code?: string;
  country_id?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof regions {
    return regions.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    native: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'regions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "regions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

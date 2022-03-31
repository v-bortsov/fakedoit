import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface districtsAttributes {
  id: number;
  name: string;
  native: string;
  country_id?: number;
}

export type districtsPk = "id";
export type districtsId = districts[districtsPk];
export type districtsOptionalAttributes = "id" | "country_id";
export type districtsCreationAttributes = Optional<districtsAttributes, districtsOptionalAttributes>;

export class districts extends Model<districtsAttributes, districtsCreationAttributes> implements districtsAttributes {
  id!: number;
  name!: string;
  native!: string;
  country_id?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof districts {
    return districts.init({
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
    native: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'districts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "districts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

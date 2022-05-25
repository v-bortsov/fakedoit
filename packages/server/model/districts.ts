import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface districtsAttributes {
  id: number;
  native: string;
  name: string;
  country_id?: number;
}

export type districtsPk = "id";
export type districtsId = districts[districtsPk];
export type districtsOptionalAttributes = "country_id";
export type districtsCreationAttributes = Optional<districtsAttributes, districtsOptionalAttributes>;

export class districts extends Model<districtsAttributes, districtsCreationAttributes> implements districtsAttributes {
  id!: number;
  native!: string;
  name!: string;
  country_id?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof districts {
    return districts.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    native: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
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

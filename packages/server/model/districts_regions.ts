import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface districts_regionsAttributes {
  id: number;
  distrinct_id: number;
  region_id: number;
}

export type districts_regionsPk = 'id';
export type districts_regionsId = districts_regions[districts_regionsPk];
export type districts_regionsOptionalAttributes = 'id' | 'distrinct_id' | 'region_id';
export type districts_regionsCreationAttributes = Optional<districts_regionsAttributes, districts_regionsOptionalAttributes>;

export class districts_regions extends Model<districts_regionsAttributes, districts_regionsCreationAttributes> implements districts_regionsAttributes {
  id!: number;
  distrinct_id!: number;
  region_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof districts_regions {
    return districts_regions.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        distrinct_id: {
          autoIncrement: false,
          type: DataTypes.INTEGER,
          allowNull: false
        },
        region_id: {
          autoIncrement: false,
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'districts_regions',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'distrincts_regions_pkey',
            unique: true,
            fields: [{ name: 'id' },]
          },
        ]
      }
    );
  }
}

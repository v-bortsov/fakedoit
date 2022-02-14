import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { countries, countriesId } from './countries';

export interface citiesAttributes {
  id: number;
  name: string;
  slug?: string;
  native?: string;
  capital?: boolean;
  country_id: number;
  population?: number;
  latitude: string;
  tz?: string;
  timezone?: string;
  region_id?: number;
  distrinct_id?: number;
  longitude?: string;
}

export type citiesPk = 'id';
export type citiesId = cities[citiesPk];
export type citiesOptionalAttributes = 'id' | 'slug' | 'native' | 'capital' | 'population' | 'tz' | 'timezone' | 'region_id' | 'distrinct_id' | 'longitude';
export type citiesCreationAttributes = Optional<citiesAttributes, citiesOptionalAttributes>;

export class cities extends Model<citiesAttributes, citiesCreationAttributes> implements citiesAttributes {
  id!: number;
  name!: string;
  slug?: string;
  native?: string;
  capital?: boolean;
  country_id!: number;
  population?: number;
  latitude!: string;
  tz?: string;
  timezone?: string;
  region_id?: number;
  distrinct_id?: number;
  longitude?: string;

  // cities belongsTo countries via country_id
  country!: countries;
  getCountry!: Sequelize.BelongsToGetAssociationMixin<countries>;
  setCountry!: Sequelize.BelongsToSetAssociationMixin<countries, countriesId>;
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<countries>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cities {
    return cities.init(
      {
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
        slug: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        native: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        capital: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        country_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'countries',
            key: 'id'
          }
        },
        population: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        latitude: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        tz: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        timezone: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        region_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        distrinct_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        longitude: {
          type: DataTypes.STRING(255),
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'cities',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'cities_pkey',
            unique: true,
            fields: [{ name: 'id' },]
          },
        ]
      }
    );
  }
}

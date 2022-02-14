import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cities, citiesId } from './cities';
import type { countries_languages, countries_languagesId } from './countries_languages';
import type { currencies, currenciesId } from './currencies';

export interface countriesAttributes {
  id: number;
  currency_id: number;
  name: string;
  native: string;
  phone: string;
  abbr?: string;
  capital?: string;
}

export type countriesPk = "id";
export type countriesId = countries[countriesPk];
export type countriesOptionalAttributes = "id" | "abbr" | "capital";
export type countriesCreationAttributes = Optional<countriesAttributes, countriesOptionalAttributes>;

export class countries extends Model<countriesAttributes, countriesCreationAttributes> implements countriesAttributes {
  id!: number;
  currency_id!: number;
  name!: string;
  native!: string;
  phone!: string;
  abbr?: string;
  capital?: string;

  // countries hasMany cities via country_id
  cities!: cities[];
  getCities!: Sequelize.HasManyGetAssociationsMixin<cities>;
  setCities!: Sequelize.HasManySetAssociationsMixin<cities, citiesId>;
  addCity!: Sequelize.HasManyAddAssociationMixin<cities, citiesId>;
  addCities!: Sequelize.HasManyAddAssociationsMixin<cities, citiesId>;
  createCity!: Sequelize.HasManyCreateAssociationMixin<cities>;
  removeCity!: Sequelize.HasManyRemoveAssociationMixin<cities, citiesId>;
  removeCities!: Sequelize.HasManyRemoveAssociationsMixin<cities, citiesId>;
  hasCity!: Sequelize.HasManyHasAssociationMixin<cities, citiesId>;
  hasCities!: Sequelize.HasManyHasAssociationsMixin<cities, citiesId>;
  countCities!: Sequelize.HasManyCountAssociationsMixin;
  // countries hasMany countries_languages via country_id
  countries_languages!: countries_languages[];
  getCountries_languages!: Sequelize.HasManyGetAssociationsMixin<countries_languages>;
  setCountries_languages!: Sequelize.HasManySetAssociationsMixin<countries_languages, countries_languagesId>;
  addCountries_language!: Sequelize.HasManyAddAssociationMixin<countries_languages, countries_languagesId>;
  addCountries_languages!: Sequelize.HasManyAddAssociationsMixin<countries_languages, countries_languagesId>;
  createCountries_language!: Sequelize.HasManyCreateAssociationMixin<countries_languages>;
  removeCountries_language!: Sequelize.HasManyRemoveAssociationMixin<countries_languages, countries_languagesId>;
  removeCountries_languages!: Sequelize.HasManyRemoveAssociationsMixin<countries_languages, countries_languagesId>;
  hasCountries_language!: Sequelize.HasManyHasAssociationMixin<countries_languages, countries_languagesId>;
  hasCountries_languages!: Sequelize.HasManyHasAssociationsMixin<countries_languages, countries_languagesId>;
  countCountries_languages!: Sequelize.HasManyCountAssociationsMixin;
  // countries belongsTo currencies via currency_id
  currency!: currencies;
  getCurrency!: Sequelize.BelongsToGetAssociationMixin<currencies>;
  setCurrency!: Sequelize.BelongsToSetAssociationMixin<currencies, currenciesId>;
  createCurrency!: Sequelize.BelongsToCreateAssociationMixin<currencies>;

  static initModel(sequelize: Sequelize.Sequelize): typeof countries {
    return countries.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'currencies',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    native: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    abbr: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    capital: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'countries',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "countries_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

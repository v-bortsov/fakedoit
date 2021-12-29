import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { countries, countriesId } from './countries';

export interface currenciesAttributes {
  id?: number;
  native?: string;
  name?: string;
  abbr: string;
}

export type currenciesPk = "id";
export type currenciesId = currencies[currenciesPk];
export type currenciesCreationAttributes = Optional<currenciesAttributes, currenciesPk>;

export class currencies extends Model<currenciesAttributes, currenciesCreationAttributes> implements currenciesAttributes {
  id?: number;
  native?: string;
  name?: string;
  abbr!: string;

  // currencies hasMany countries via currency_id
  countries!: countries[];
  getCountries!: Sequelize.HasManyGetAssociationsMixin<countries>;
  setCountries!: Sequelize.HasManySetAssociationsMixin<countries, countriesId>;
  addCountry!: Sequelize.HasManyAddAssociationMixin<countries, countriesId>;
  addCountries!: Sequelize.HasManyAddAssociationsMixin<countries, countriesId>;
  createCountry!: Sequelize.HasManyCreateAssociationMixin<countries>;
  removeCountry!: Sequelize.HasManyRemoveAssociationMixin<countries, countriesId>;
  removeCountries!: Sequelize.HasManyRemoveAssociationsMixin<countries, countriesId>;
  hasCountry!: Sequelize.HasManyHasAssociationMixin<countries, countriesId>;
  hasCountries!: Sequelize.HasManyHasAssociationsMixin<countries, countriesId>;
  countCountries!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof currencies {
    currencies.init({
    id: {
      autoIncrement: true,
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
    abbr: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'currencies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "currencies_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return currencies;
  }
}

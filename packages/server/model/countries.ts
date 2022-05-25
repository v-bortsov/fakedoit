import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
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
export type countriesOptionalAttributes = "abbr" | "capital";
export type countriesCreationAttributes = Optional<countriesAttributes, countriesOptionalAttributes>;

export class countries extends Model<countriesAttributes, countriesCreationAttributes> implements countriesAttributes {
  id!: number;
  currency_id!: number;
  name!: string;
  native!: string;
  phone!: string;
  abbr?: string;
  capital?: string;

  // countries belongsTo currencies via currency_id
  currency!: currencies;
  getCurrency!: Sequelize.BelongsToGetAssociationMixin<currencies>;
  setCurrency!: Sequelize.BelongsToSetAssociationMixin<currencies, currenciesId>;
  createCurrency!: Sequelize.BelongsToCreateAssociationMixin<currencies>;

  static initModel(sequelize: Sequelize.Sequelize): typeof countries {
    return countries.init({
    id: {
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

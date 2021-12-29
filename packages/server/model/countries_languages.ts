import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { countries, countriesId } from './countries';
import type { languages, languagesId } from './languages';

export interface countries_languagesAttributes {
  id?: number;
  country_id: number;
  language_id?: number;
}

export type countries_languagesPk = "id";
export type countries_languagesId = countries_languages[countries_languagesPk];
export type countries_languagesCreationAttributes = Optional<countries_languagesAttributes, countries_languagesPk>;

export class countries_languages extends Model<countries_languagesAttributes, countries_languagesCreationAttributes> implements countries_languagesAttributes {
  id?: number;
  country_id!: number;
  language_id?: number;

  // countries_languages belongsTo countries via country_id
  country!: countries;
  getCountry!: Sequelize.BelongsToGetAssociationMixin<countries>;
  setCountry!: Sequelize.BelongsToSetAssociationMixin<countries, countriesId>;
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<countries>;
  // countries_languages belongsTo languages via language_id
  language!: languages;
  getLanguage!: Sequelize.BelongsToGetAssociationMixin<languages>;
  setLanguage!: Sequelize.BelongsToSetAssociationMixin<languages, languagesId>;
  createLanguage!: Sequelize.BelongsToCreateAssociationMixin<languages>;

  static initModel(sequelize: Sequelize.Sequelize): typeof countries_languages {
    countries_languages.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'countries',
        key: 'id'
      }
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'languages',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'countries_languages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "countries_languages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return countries_languages;
  }
}

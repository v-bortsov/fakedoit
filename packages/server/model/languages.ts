import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { countries_languages, countries_languagesId } from './countries_languages';

export interface languagesAttributes {
  id?: number;
  native: string;
  name: string;
  abbr: string;
  rtl?: boolean;
}

export type languagesPk = "id";
export type languagesId = languages[languagesPk];
export type languagesCreationAttributes = Optional<languagesAttributes, languagesPk>;

export class languages extends Model<languagesAttributes, languagesCreationAttributes> implements languagesAttributes {
  id?: number;
  native!: string;
  name!: string;
  abbr!: string;
  rtl?: boolean;

  // languages hasMany countries_languages via language_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof languages {
    languages.init({
    id: {
      autoIncrement: true,
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
    abbr: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "en_UK, en_US, fr_CA, ru_RU"
    },
    rtl: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'languages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "languages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return languages;
  }
}

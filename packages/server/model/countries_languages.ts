import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface countries_languagesAttributes {
  id: number;
  country_id?: number;
  language_id?: number;
}

export type countries_languagesPk = "id";
export type countries_languagesId = countries_languages[countries_languagesPk];
export type countries_languagesOptionalAttributes = "country_id" | "language_id";
export type countries_languagesCreationAttributes = Optional<countries_languagesAttributes, countries_languagesOptionalAttributes>;

export class countries_languages extends Model<countries_languagesAttributes, countries_languagesCreationAttributes> implements countries_languagesAttributes {
  id!: number;
  country_id?: number;
  language_id?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof countries_languages {
    return countries_languages.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface languagesAttributes {
  id: number;
  native: string;
  name: string;
  abbr: string;
  rtl?: boolean;
}

export type languagesPk = "id";
export type languagesId = languages[languagesPk];
export type languagesOptionalAttributes = "rtl";
export type languagesCreationAttributes = Optional<languagesAttributes, languagesOptionalAttributes>;

export class languages extends Model<languagesAttributes, languagesCreationAttributes> implements languagesAttributes {
  id!: number;
  native!: string;
  name!: string;
  abbr!: string;
  rtl?: boolean;


  static initModel(sequelize: Sequelize.Sequelize): typeof languages {
    return languages.init({
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
    abbr: {
      type: DataTypes.STRING(255),
      allowNull: false
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
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface coursesAttributes {
  id?: number;
  name?: string;
  alias?: string;
  desc?: string;
  title?: string;
  meta_k?: string;
  meta_d?: string;
  h1?: string;
  duration?: number;
  img?: string;
  active?: number;
  parent_id?: number;
  lft?: number;
  rgt?: number;
  depth?: number;
  priority?: number;
  bg?: string;
  home?: number;
}

export type coursesPk = "id";
export type coursesId = courses[coursesPk];
export type coursesCreationAttributes = Optional<coursesAttributes, coursesPk>;

export class courses extends Model<coursesAttributes, coursesCreationAttributes> implements coursesAttributes {
  id?: number;
  name?: string;
  alias?: string;
  desc?: string;
  title?: string;
  meta_k?: string;
  meta_d?: string;
  h1?: string;
  duration?: number;
  img?: string;
  active?: number;
  parent_id?: number;
  lft?: number;
  rgt?: number;
  depth?: number;
  priority?: number;
  bg?: string;
  home?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof courses {
    courses.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    meta_k: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    meta_d: {
      type: DataTypes.CHAR(500),
      allowNull: true
    },
    h1: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lft: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rgt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bg: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    home: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'courses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "courses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return courses;
  }
}

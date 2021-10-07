import type { Sequelize, Model } from "sequelize";
import { cities } from "./cities";
import type { citiesAttributes, citiesCreationAttributes } from "./cities";
import { continents } from "./continents";
import type { continentsAttributes, continentsCreationAttributes } from "./continents";
import { countries } from "./countries";
import type { countriesAttributes, countriesCreationAttributes } from "./countries";
import { countries_languages } from "./countries_languages";
import type { countries_languagesAttributes, countries_languagesCreationAttributes } from "./countries_languages";
import { courses } from "./courses";
import type { coursesAttributes, coursesCreationAttributes } from "./courses";
import { currencies } from "./currencies";
import type { currenciesAttributes, currenciesCreationAttributes } from "./currencies";
import { districts } from "./districts";
import type { districtsAttributes, districtsCreationAttributes } from "./districts";
import { districts_regions } from "./districts_regions";
import type { districts_regionsAttributes, districts_regionsCreationAttributes } from "./districts_regions";
import { exonyms } from "./exonyms";
import type { exonymsAttributes, exonymsCreationAttributes } from "./exonyms";
import { languages } from "./languages";
import type { languagesAttributes, languagesCreationAttributes } from "./languages";
import { regions } from "./regions";
import type { regionsAttributes, regionsCreationAttributes } from "./regions";

export {
  cities,
  continents,
  countries,
  countries_languages,
  courses,
  currencies,
  districts,
  districts_regions,
  exonyms,
  languages,
  regions,
};

export type {
  citiesAttributes,
  citiesCreationAttributes,
  continentsAttributes,
  continentsCreationAttributes,
  countriesAttributes,
  countriesCreationAttributes,
  countries_languagesAttributes,
  countries_languagesCreationAttributes,
  coursesAttributes,
  coursesCreationAttributes,
  currenciesAttributes,
  currenciesCreationAttributes,
  districtsAttributes,
  districtsCreationAttributes,
  districts_regionsAttributes,
  districts_regionsCreationAttributes,
  exonymsAttributes,
  exonymsCreationAttributes,
  languagesAttributes,
  languagesCreationAttributes,
  regionsAttributes,
  regionsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  cities.initModel(sequelize);
  continents.initModel(sequelize);
  countries.initModel(sequelize);
  countries_languages.initModel(sequelize);
  courses.initModel(sequelize);
  currencies.initModel(sequelize);
  districts.initModel(sequelize);
  districts_regions.initModel(sequelize);
  exonyms.initModel(sequelize);
  languages.initModel(sequelize);
  regions.initModel(sequelize);

  cities.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(cities, { as: "cities", foreignKey: "country_id"});
  countries_languages.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(countries_languages, { as: "countries_languages", foreignKey: "country_id"});
  countries.belongsTo(currencies, { as: "currency", foreignKey: "currency_id"});
  currencies.hasMany(countries, { as: "countries", foreignKey: "currency_id"});
  countries_languages.belongsTo(languages, { as: "language", foreignKey: "language_id"});
  languages.hasMany(countries_languages, { as: "countries_languages", foreignKey: "language_id"});

  return {
    cities: cities,
    continents: continents,
    countries: countries,
    countries_languages: countries_languages,
    courses: courses,
    currencies: currencies,
    districts: districts,
    districts_regions: districts_regions,
    exonyms: exonyms,
    languages: languages,
    regions: regions,
  };
}

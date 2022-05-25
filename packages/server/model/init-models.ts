import type { Sequelize } from "sequelize";
import { cities as _cities } from "./cities";
import type { citiesAttributes, citiesCreationAttributes } from "./cities";
import { continents as _continents } from "./continents";
import type { continentsAttributes, continentsCreationAttributes } from "./continents";
import { countries as _countries } from "./countries";
import type { countriesAttributes, countriesCreationAttributes } from "./countries";
import { countries_languages as _countries_languages } from "./countries_languages";
import type { countries_languagesAttributes, countries_languagesCreationAttributes } from "./countries_languages";
import { currencies as _currencies } from "./currencies";
import type { currenciesAttributes, currenciesCreationAttributes } from "./currencies";
import { districts as _districts } from "./districts";
import type { districtsAttributes, districtsCreationAttributes } from "./districts";
import { languages as _languages } from "./languages";
import type { languagesAttributes, languagesCreationAttributes } from "./languages";
import { regions as _regions } from "./regions";
import type { regionsAttributes, regionsCreationAttributes } from "./regions";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _cities as cities,
  _continents as continents,
  _countries as countries,
  _countries_languages as countries_languages,
  _currencies as currencies,
  _districts as districts,
  _languages as languages,
  _regions as regions,
  _users as users,
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
  currenciesAttributes,
  currenciesCreationAttributes,
  districtsAttributes,
  districtsCreationAttributes,
  languagesAttributes,
  languagesCreationAttributes,
  regionsAttributes,
  regionsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const cities = _cities.initModel(sequelize);
  const continents = _continents.initModel(sequelize);
  const countries = _countries.initModel(sequelize);
  const countries_languages = _countries_languages.initModel(sequelize);
  const currencies = _currencies.initModel(sequelize);
  const districts = _districts.initModel(sequelize);
  const languages = _languages.initModel(sequelize);
  const regions = _regions.initModel(sequelize);
  const users = _users.initModel(sequelize);

  countries.belongsTo(currencies, { as: "currency", foreignKey: "currency_id"});
  currencies.hasMany(countries, { as: "countries", foreignKey: "currency_id"});

  return {
    cities: cities,
    continents: continents,
    countries: countries,
    countries_languages: countries_languages,
    currencies: currencies,
    districts: districts,
    languages: languages,
    regions: regions,
    users: users,
  };
}

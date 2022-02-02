import type { Sequelize } from 'sequelize';
import { cities as _cities } from './cities';
import type { citiesAttributes, citiesCreationAttributes } from './cities';
import { continents as _continents } from './continents';
import type { continentsAttributes, continentsCreationAttributes } from './continents';
import { countries as _countries } from './countries';
import type { countriesAttributes, countriesCreationAttributes } from './countries';
import { countries_languages as _countries_languages } from './countries_languages';
import type { countries_languagesAttributes, countries_languagesCreationAttributes } from './countries_languages';
import { courses as _courses } from './courses';
import type { coursesAttributes, coursesCreationAttributes } from './courses';
import { currencies as _currencies } from './currencies';
import type { currenciesAttributes, currenciesCreationAttributes } from './currencies';
import { districts as _districts } from './districts';
import type { districtsAttributes, districtsCreationAttributes } from './districts';
import { districts_regions as _districts_regions } from './districts_regions';
import type { districts_regionsAttributes, districts_regionsCreationAttributes } from './districts_regions';
import { exonyms as _exonyms } from './exonyms';
import type { exonymsAttributes, exonymsCreationAttributes } from './exonyms';
import { languages as _languages } from './languages';
import type { languagesAttributes, languagesCreationAttributes } from './languages';
import { regions as _regions } from './regions';
import type { regionsAttributes, regionsCreationAttributes } from './regions';

export {
  _cities as cities,
  _continents as continents,
  _countries as countries,
  _countries_languages as countries_languages,
  _courses as courses,
  _currencies as currencies,
  _districts as districts,
  _districts_regions as districts_regions,
  _exonyms as exonyms,
  _languages as languages,
  _regions as regions,
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
  const cities = _cities.initModel(sequelize);
  const continents = _continents.initModel(sequelize);
  const countries = _countries.initModel(sequelize);
  const countries_languages = _countries_languages.initModel(sequelize);
  const courses = _courses.initModel(sequelize);
  const currencies = _currencies.initModel(sequelize);
  const districts = _districts.initModel(sequelize);
  const districts_regions = _districts_regions.initModel(sequelize);
  const exonyms = _exonyms.initModel(sequelize);
  const languages = _languages.initModel(sequelize);
  const regions = _regions.initModel(sequelize);

  cities.belongsTo(
    countries,
    { as: 'country', foreignKey: 'country_id'}
  );
  countries.hasMany(
    cities,
    { as: 'cities', foreignKey: 'country_id'}
  );
  countries_languages.belongsTo(
    countries,
    { as: 'country', foreignKey: 'country_id'}
  );
  countries.hasMany(
    countries_languages,
    { as: 'countries_languages', foreignKey: 'country_id'}
  );
  countries.belongsTo(
    currencies,
    { as: 'currency', foreignKey: 'currency_id'}
  );
  currencies.hasMany(
    countries,
    { as: 'countries', foreignKey: 'currency_id'}
  );
  countries_languages.belongsTo(
    languages,
    { as: 'language', foreignKey: 'language_id'}
  );
  languages.hasMany(
    countries_languages,
    { as: 'countries_languages', foreignKey: 'language_id'}
  );

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

-- CreateTable
CREATE TABLE IF NOT EXISTS users (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS cities
(
    id integer NOT NULL,
    "name" character varying(255),
    slug character varying(255),
    "native" character varying(255),
    capital boolean,
    country_id integer,
    "population" integer,
    latitude character varying(255),
    tz character varying(255),
    timezone character varying(255),
    region_id integer,
    distrinct_id integer,
    longitude character varying(255),
    PRIMARY KEY (id)
    -- CONSTRAINT cities_pkey PRIMARY KEY (id),
    -- CONSTRAINT city FOREIGN KEY (country_id)
    --     REFERENCES countries (id) MATCH SIMPLE
    --     ON UPDATE NO ACTION
    --     ON DELETE NO ACTION
    --     NOT VALID
);

CREATE TABLE IF NOT EXISTS countries 
(
    id integer NOT NULL,
    currency_id integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "native" character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    abbr character varying(255),
    capital character varying(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS continents
(
    id integer NOT NULL,
    "name" character varying(255) NOT NULL,
    abbr character varying(255),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS currencies
(
    id integer NOT NULL,
    "native" character varying(255),
    "name" character varying(255),
    abbr character varying(255),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS countries_languages
(
    id integer NOT NULL,
    "country_id" integer,
    "language_id" integer,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS languages
(
    id integer NOT NULL,
    "native" character varying(255) NOT NULL,
    "name" character varying(255) NOT NULL,
    abbr character varying(255) NOT NULL,
    rtl boolean,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS regions
(
    id integer NOT NULL,
    "native" character varying(255),
    "name" character varying(255),
    code character varying(10),
    country_id integer,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS districts
(
    id integer NOT NULL,
    "native" character varying(255) NOT NULL,
    "name" character varying(255) NOT NULL,
    country_id integer,
    PRIMARY KEY (id)
);
-- Seed
INSERT INTO users (id, name, email) VALUES ('userid', 'Gopher', 'hello@gopher.com');


-- ALTER TABLE cities ADD CONSTRAINT FK_cities__country_id FOREIGN KEY (country_id) REFERENCES public.countries(id);
ALTER TABLE countries ADD CONSTRAINT FK_countries__currency_id FOREIGN KEY (currency_id) REFERENCES currencies(id);
-- ALTER TABLE public.cities ADD CONSTRAINT FK_cities__region_id FOREIGN KEY (region_id) REFERENCES public.regions(id);
-- ALTER TABLE public.cities ADD CONSTRAINT FK_cities__distrinct_id FOREIGN KEY (distrinct_id) REFERENCES public.districts(id);


COPY languages FROM '/app/data/languages' WITH (FORMAT csv);
COPY currencies FROM '/app/data/currencies' WITH (FORMAT csv);
COPY countries FROM '/app/data/countries' WITH (FORMAT csv);
COPY continents FROM '/app/data/continents' WITH (FORMAT csv);
COPY countries_languages FROM '/app/data/countries_languages' WITH (FORMAT csv);
COPY regions FROM '/app/data/regions' WITH (FORMAT csv);
COPY districts FROM '/app/data/districts' WITH (FORMAT csv);
-- COPY cities FROM '/app/data/cities' WITH (FORMAT csv/* , delimiter ';' */);
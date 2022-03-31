#!/bin/bash

psql -U $POSTGRES_USER -d $POSTGRES_DB -a -f /app/scripts/db/dump.sql

# psql -c "COPY tablename FROM '/app/data/mydata.csv' delimiter ',' csv;"
psql -U $POSTGRES_USER -d $POSTGRES_DB -c "COPY cities FROM '/app/data/cities'"
# psql -U postgres -d postgres -c "COPY cities FROM '/app/data/cities' WITH (FORMAT csv, delimiter ';')"
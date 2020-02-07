DROP TABLE IF EXISTS visitors;
CREATE TABLE visitors(
    visitor_ID SERIAL PRIMARY KEY,
    visitor_name varchar NOT NULL,
    visitor_age integer NOT NULL,
    date_of_visit date NOT NULL,
    time_of_visit time NOT NULL,
    name_of_assistant varchar NOT NULL,
    comments varchar NOT NULL
);
DROP TABLE IF EXISTS "visitors";
CREATE TABLE "visitors"(
    "visitor_name" text NOT NULL,
    "visitor_age" integer NOT NULL,
    "date_of_visit" date NOT NULL,
    "time_of_visit" time without time zone NOT NULL,
    "name_of_assistant" text NOT NULL,
    "comments" text NOT NULL
);

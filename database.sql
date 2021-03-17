
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

CREATE TABLE "user_event" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"event_id" int NOT NULL,
	"check_in" TIMESTAMP NOT NULL,
	"check_out" TIMESTAMP NOT NULL,
	"total_time" int NOT NULL,
	CONSTRAINT "user_event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"id" serial NOT NULL,
	"category" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"phone_number" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" int NOT NULL,
	"dob" DATE NOT NULL,
	"involved_w_sond_since" DATE,
	"college_id" int NOT NULL,
	"password" varchar(255),
	"access_level" int NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "event" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"special_inst" varchar(255),
	"location" varchar(255) NOT NULL,
	"date" DATE,
	"pic_url" varchar(2550),
	CONSTRAINT "event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "affiliation" (
	"id" serial NOT NULL,
	"college_name" varchar(255) NOT NULL,
	CONSTRAINT "affiliation_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk1" FOREIGN KEY ("event_id") REFERENCES "event"("id");

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("college_id") REFERENCES "affiliation"("id");



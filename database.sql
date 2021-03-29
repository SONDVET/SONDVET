
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
	"check_in" TIMESTAMP,
	"check_out" TIMESTAMP,
	"total_time" interval NOT NULL DEFAULT '0',
	CONSTRAINT "user_event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"id" serial NOT NULL,
	"category" varchar(255) NOT NULL DEFAULT 'SO College',
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
	"access_level" int NOT NULL DEFAULT '1',
	"archived" BOOLEAN NOT NULL DEFAULT 'FALSE',
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
	"time" varchar(255),
	"archived" BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT "event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "affiliation" (
	"id" serial NOT NULL,
	"college_name" varchar(255) NOT NULL,
	"inactive" BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT "affiliation_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_group" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"group_id" int NOT NULL,
	CONSTRAINT "user_group_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_event" ADD CONSTRAINT "user_event_fk1" FOREIGN KEY ("event_id") REFERENCES "event"("id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("college_id") REFERENCES "affiliation"("id");
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_fk1" FOREIGN KEY ("group_id") REFERENCES "affiliation"("id");


-- Create Starting Affiliatons
INSERT INTO "affiliation" ("college_name") VALUES ('NDSU');
INSERT INTO "affiliation" ("college_name") VALUES ('MSU');
INSERT INTO "affiliation" ("college_name") VALUES ('U Mary');
INSERT INTO "affiliation" ("college_name") VALUES ('UND');
INSERT INTO "affiliation" ("college_name") VALUES ('VSCU');

-- Create Starting Events
INSERT INTO "event" ("name" , "description" , "special_inst" , "location" , "date" , "pic_url", "time")
VALUES ('Fargo Polar Plunge' , 'Jump in some cold cold water for a good good cause' , 'BYOT (Bring Your Own Towel)' , 'Delta Hotels Fargo' , '20210410' , 'https://cdn.firespring.com/images/078a2188-221f-4876-8a49-eaea25b20932.png', '9:00');
INSERT INTO "event" ("name" , "description" , "special_inst" , "location" , "date" , "pic_url", "time")
VALUES ('NDSU Bi - Weekly Meeting' , 'We will be meeting to discuss things and such' , 'Bring Snacks to Share' , 'Bergum Hall' , '20210823' , 'https://news.prairiepublic.org/sites/ndpr/files/201906/NDSO.jpg', '16:00');

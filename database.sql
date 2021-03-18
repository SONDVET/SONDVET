
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
	"total_time" int NOT NULL DEFAULT '0',
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

-- Create Starting Affiliatons
INSERT INTO "affiliation" ("college_name") VALUES ('NDSU');
INSERT INTO "affiliation" ("college_name") VALUES ('MSU');
INSERT INTO "affiliation" ("college_name") VALUES ('U Mary');
INSERT INTO "affiliation" ("college_name") VALUES ('UND');
INSERT INTO "affiliation" ("college_name") VALUES ('VSCU');

-- Create Starting Users
INSERT INTO "user" ("category" , "first_name" , "last_name" , "email" , "phone_number" , "address" , "city" , "state" , "zip" , "dob" , "involved_w_sond_since" , "college_id" , "password" , "access_level" ) 
VALUES ( 'Officer' , 'Cody' , 'Njos' , 'cody.njos@live.com' , '701-400-4142' , '3201 23rd ave S.' , 'Fargo' , 'ND' , 58103 , '19940406' , '20200304' , 1 , '123' , 2);
INSERT INTO "user" ("category" , "first_name" , "last_name" , "email" , "phone_number" , "address" , "city" , "state" , "zip" , "dob" , "involved_w_sond_since" , "college_id" , "password" , "access_level" ) 
VALUES ( 'Admin' , 'Dwight' , 'Schrute' , 'dschrute@gmail.com' , '701-232-5555' , '1134 1st St N' , 'Fargo' , 'ND' , 58102 , '19821110' , '20010101' , 1 , 'bigtuna' , 1);
INSERT INTO "user" ("category" , "first_name" , "last_name" , "email" , "phone_number" , "address" , "city" , "state" , "zip" , "dob" , "involved_w_sond_since" , "college_id" , "password" , "access_level" ) 
VALUES ( 'Volunteer' , 'Lance' , 'Gagner' , 'gagnerlance@gmail.com' , '701-400-5555' , '3342 29th ave' , 'Fargo' , 'ND' , 58103 , '19950702' , '20200304' , 1 , '123' , 1);
-- Create Starting Even
INSERT INTO "event" ("name" , "description" , "special_inst" , "location" , "date" , "pic_url")
VALUES ('Fargo Polar Plunge' , 'Jump in some cold cold water for a good good cause' , 'BYOT (Bring Your Own Towel)' , 'Delta Hotels Fargo' , '20210410' , 'https://cdn.firespring.com/images/078a2188-221f-4876-8a49-eaea25b20932.png');
INSERT INTO "event" ("name" , "description" , "special_inst" , "location" , "date" , "pic_url")
VALUES ('NDSU Bi - Weekly Meeting' , 'We will be meeting to discuss things and such' , 'Bring Snacks to Share' , 'Bergum Hall' , '20210823' , 'https://news.prairiepublic.org/sites/ndpr/files/201906/NDSO.jpg');

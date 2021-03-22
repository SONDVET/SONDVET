// join request put in the wrong place, here for containment
`SELECT "user"."id", "category", "first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "dob", "involved_w_sond_since", "college_id", "access_level",
        "college_name"
    FROM "user"
    FUll JOIN "affiliation" ON "user"."college_id" = "affiliation"."id"
    WHERE "college_id" = ${req.params.id}`;
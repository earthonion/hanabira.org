#!/bin/bash

# shell wrapper around DB seeder scripts



#mongod --dbpath /var/lib/mongodb --bind_ip_all --fork --logpath /var/log/mongodb/mongod.log 

sleep 10
node ./seeding_scripts/word_relationships_GPT.js 
sleep 3
node ./seeding_scripts/seed_tanos_vocab_to_db.js 
sleep 3 
node ./seeding_scripts/seed_grammar_to_db.js 
sleep 3 
node ./seeding_scripts/seed_kanji_to_db.js 
sleep 3 
node ./seeding_scripts/seed_reading_to_db.js 
sleep 3 
node ./seeding_scripts/seed_grammar_to_db_other_langs.js 
sleep 3 
node ./my_server.js

exit 0
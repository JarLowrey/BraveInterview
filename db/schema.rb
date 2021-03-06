# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_01_213147) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "film_characters", force: :cascade do |t|
    t.bigint "person_id", null: false
    t.bigint "film_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["film_id"], name: "index_film_characters_on_film_id"
    t.index ["person_id"], name: "index_film_characters_on_person_id"
  end

  create_table "films", force: :cascade do |t|
    t.string "title"
    t.integer "episode_id"
    t.string "opening_crawl"
    t.string "director"
    t.string "producer"
    t.date "release_date"
    t.string "species"
    t.string "starships"
    t.string "vehicles"
    t.string "planets"
    t.string "url", null: false
    t.string "created"
    t.string "edited"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_films_on_title"
    t.index ["url"], name: "index_films_on_url"
  end

  create_table "people", force: :cascade do |t|
    t.string "name"
    t.string "birth_year"
    t.string "eye_color"
    t.string "gender"
    t.string "hair_color"
    t.string "height"
    t.string "mass"
    t.string "skin_color"
    t.string "homeworld"
    t.string "species"
    t.string "starships"
    t.string "vehicles"
    t.string "url", null: false
    t.string "created"
    t.string "edited"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_people_on_name"
    t.index ["url"], name: "index_people_on_url"
  end

end

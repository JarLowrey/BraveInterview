class CreateFilms < ActiveRecord::Migration[5.2]
  def change
    create_table :films do |t|
      t.string :title, index: true #is a search field

      t.integer :episode_id
      t.string :opening_crawl

      t.string :director
      t.string :producer
      t.datetime :release_date

      #other tables film is related to, but not creating migrations for
      t.string :species
      t.string :starships
      t.string :vehicles
      t.string :planets

      t.integer :swapi_id #extracted from their URL property
      t.datetime :created
      t.datetime :edited

      t.timestamps
    end
  end
end

class CreatePeople < ActiveRecord::Migration[5.2]
  def change
    create_table :people do |t|
      t.string :name, index: true #is a search field

      t.string :birth_year
      t.string :homeworld

      #other tables person is related to, but not creating migrations for
      t.string :species
      t.string :starships
      t.string :vehicles

      t.string :eye_color
      t.string :hair_color
      t.string :skin_color

      t.integer :height
      t.integer :mass

      t.integer :gender

      t.integer :swapi_id #extracted from their URL property
      t.datetime :created
      t.datetime :edited
      
      t.timestamps
    end
  end
end

class CreatePeople < ActiveRecord::Migration[5.2]
  def change
    create_table :people do |t|
      t.string :name, index: true #is a search field
      t.integer :swapi_id, index: true

      t.string :birth_year
      t.string :eye_color
      t.string :gender
      t.string :hair_color
      t.string :height
      t.string :mass
      t.string :skin_color
      t.string :homeworld

      #other tables person is related to, but not creating migrations for
      t.string :species
      t.string :starships
      t.string :vehicles

      t.string :url
      t.string :created
      t.string :edited
      
      t.timestamps
    end
  end
end

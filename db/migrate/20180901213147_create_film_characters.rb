class CreateFilmCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :film_characters do |t|
      t.references :person, null: false, index: true
      t.references :film, null: false, index: true

      t.timestamps
    end
  end
end

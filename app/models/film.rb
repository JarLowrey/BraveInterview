class Film < ApplicationRecord
    has_many :film_characters
    has_many :people, through: :film_characters, dependent: :destroy
end

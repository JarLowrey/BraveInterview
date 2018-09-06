class Film < ApplicationRecord
    has_many :people, through: :film_character, dependent: :destroy
end

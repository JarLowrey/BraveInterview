class Film < ApplicationRecord
    has_many :people, through: :film_character
end

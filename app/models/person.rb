class Person < ApplicationRecord
    has_many :film_characters
    has_many :films, through: :film_characters, dependent: :destroy
end
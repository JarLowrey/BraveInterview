class Person < ApplicationRecord
    enum gender: [:unknown, :Female, :Male, :NA]
    has_many :films, through: :film_character
end
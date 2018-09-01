# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

film = Film.create!({title: "sw1", swapi_id: -10})
person = Person.create!({name: "some_name", swapi_id: -5})

person.films.push(film)
films.people.push(person)

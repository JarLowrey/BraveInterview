# README

## Build

To run on your local machine, first setup [Postgres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04). Then download the code and run `bundle install`. Create your database:

```
rake run db:create
rake run db:migrate
```

Finally, run the rails server with `rails s` and Webpack server with `./bin/webpack-dev-server` simultaneously in two seperate terminals.

### Quick Explanation

This app fetches, caches, and displays data from the [SWAPI API](https://swapi.co/) using Rails 5.2.1 and Webpacker 3.5.5.


#### Server

All data can be fetched and displayed, though only the `People` and `Films` resources are cached. Search is performed through the route `/search/:resource_type/:search_term`. 

`People` and `Films` resources are related through a Many-to-Many database model with a intermediary join table: `Film Character`. When a `Person` resource is fetched, the associated `Film` urls are used to find related `Film` and connect them to the new `Person`. New `Films` are created using the film URL if necessary. This ensures good data integrity. 

Currently, all other relations are stored as a string property. To further normalize and improve the resource URLs this could be broken out into a seperate table or many-to-many models similar to `Films` or `People`.

#### Client

The front-end is built using Webpacker, React, React-Router, Material-UI, and Babel.

All routes other than search are redirected to React-Router, which has an Index/Search page and a 404 page.
When the user searches, React-Router updates the URL with search parameters to reflect that search (ensuring the page is shareable). 
When this updated URL is entered, the browser will perform a search using the necessary parameters.

Material UI is used to provide a simple and clear design for a good user experience. 
Babel transpiles and ensures minification (~1.6KB in production) and improved browser compatibility.
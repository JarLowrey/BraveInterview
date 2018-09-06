Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "pages#root"

  get "search/:type/:search_term", to: "search#perform_search"

  get '*path', to: 'pages#root'
end

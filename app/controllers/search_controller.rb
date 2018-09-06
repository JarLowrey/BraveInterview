class SearchController < ApplicationController
    def perform_search
        obj = {type: params[:type], term: params[:search_term]}
        render json: obj, status: :ok
    end
end

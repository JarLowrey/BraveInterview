class SearchController < ApplicationController
    def perform_search
        type = params[:type]
        search_term = params[:search_term]
        is_id_lookup = is_integer?(search_term)

        records = nil

        if is_cached_type?(type)
            if is_id_lookup
                model = if type =='people' then Person else Film end
                records = model.find_by swapi_id: search_term
            else
                if type == 'people'
                    records = Person.find_by name: search_term
                elsif type == 'films'
                    records = Film.find_by title: search_term
                end
            end
        end

        if records == nil || records.blank?
            search_at_end_of_url = if is_id_lookup then search_term else '?search='+search_term end
            url = 'http://swapi.co/api/' + type +'/'+ search_at_end_of_url
            swapi_response = HTTParty.get(url)
            records = swapi_response.body
        end

        render json: records, status: :ok
    end

    private

    def is_integer?(str) 
        Integer(str) #Exceptions aren't control flow...but this is the canonical way to determine "integerness" of a string in Ruby
        return true
    rescue ArgumentError
        return false
    end

    def is_cached_type?(type)
        return (type == 'people' || type == 'films')
    end

    def save_obj(type, obj)

    end
end

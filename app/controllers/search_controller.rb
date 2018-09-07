class SearchController < ApplicationController
    def perform_search
        type = params[:type]
        search_term = params[:search_term]
        is_id_lookup = is_integer?(search_term)

        record = nil
        status = :ok

        if is_cached_type?(type)
            if is_id_lookup
                model = if type =='people' then Person else Film end
                record = model.find_by swapi_id: search_term
            else
                if type == 'people'
                    record = Person.find_by name: search_term
                elsif type == 'films'
                    record = Film.find_by title: search_term
                end
            end
        end
        
        if record == nil || record.blank?
            search_at_end_of_url = if is_id_lookup then search_term else '?search='+search_term end
            url = 'http://swapi.co/api/' + type +'/'+ search_at_end_of_url
            swapi_response = HTTParty.get(url)
            status = swapi_response.code
            if status == 200
                record = JSON.parse( swapi_response.body )
                record = if record.fetch('count',0) > 0 then record['results'][0] else record end
                save_swapi_api_result(type, record)
            end
        end

        render json: record, status: status
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

    def save_swapi_api_result(type, obj)
        if not is_cached_type?(type)
            return
        end
        
        if type == 'people'
            save_person(obj)
        elsif type == 'films'
            save_film(obj)
        end
    end

    def parse_swapi_id(swapi_url)
        segments = swapi_url.split('/')
        id = segments[segments.count-1]
        return Integer(id)
    end

    def save_person(resp)
        puts JSON.pretty_generate(resp)

        person = Person.new(resp)
        debugger
        person.save
    end

    def save_film(swapi_response)
    end
end

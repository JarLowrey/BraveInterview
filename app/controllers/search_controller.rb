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
                record = model.find_by url: search_term
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

    def save_swapi_api_result(type, resp)
        if not is_cached_type?(type)
            return
        end
        
        if is_cached_type?(type)
            model = nil
            if type == 'people'
                resp['films'] = find_and_create_from_urls(Film, resp['films'])
                model = Person
            elsif type == 'films'
                resp['people'] = find_and_create_from_urls(Person, resp['characters'])
                resp.delete('characters')
                model = Film
            end
            create_or_update_cached_record(model, resp)
        end
    end

    def parse_swapi_id(swapi_url)
        segments = swapi_url.split('/')
        id = segments[segments.count-1]
        return Integer(id)
    end

    def find_and_create_from_urls(model, urls)
        existing_records =  model.where(url: urls)
        records = existing_records.to_a
        records_to_make = urls - existing_records.pluck(:url)
        records_to_make.each do |url|
            this_record = model.new url: url
            this_record.save
            records.append(this_record)
        end
        return records
    end

    def create_or_update_cached_record(model, record_values)
        record = model.find_by url: record_values['url']
        if record != nil
            record.update(record_values)
        else
            record = model.new(record_values)
        end
        record.save
    end
end

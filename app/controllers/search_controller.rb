class SearchController < ApplicationController
    def perform_search
        type = params[:type]
        search_term = params[:search_term]
        is_id_lookup = is_integer?(search_term)

        records = nil
        status = :ok

        if is_cached_type?(type)
            if is_id_lookup
                model = if type =='people' then Person else Film end
                records = model.find_by url: search_term
            else
                if type == 'people'
                    records = Person.where(name: search_term).to_a
                elsif type == 'films'
                    records = Film.where(title: search_term).to_a
                end
            end
        end
        
        if records == nil || records.blank?
            search_at_end_of_url = if is_id_lookup then search_term else '?search='+search_term end
            url = 'http://swapi.co/api/' + type +'/'+ search_at_end_of_url
            swapi_response = HTTParty.get(url)
            status = swapi_response.code
            if status == 200
                records = JSON.parse( swapi_response.body )
                records = if records.key?('results') then records['results'] else [records] end
                records.each do |r|
                    save_swapi_api_result(type, r)
                end
            end
        end

        render json: records, status: status
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

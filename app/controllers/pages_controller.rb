class PagesController < ApplicationController
    def root
    end
    def unknown_url
        redirect_to root_url
    end
end

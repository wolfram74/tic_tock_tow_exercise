class WelcomeController < ApplicationController
  def index
    "%s and %s" % ["stuff", "other stuff"]
  end

end

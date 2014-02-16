# Load the rails application
require File.expand_path('../application', __FILE__)

# for better errors
#BetterErrors::Middleware.allow_ip! ENV['TRUSTED_IP'] if ENV['TRUSTED_IP']

# Initialize the rails application
RailsTuto::Application.initialize!


# initialize debug setteing class
p "std_string_color : red"
class String  
  def deb
    if self.empty?
      print "\e[33m OBJ to s : Empty \e[0m \n"
    else
      print "\e[33m #{self}\e[0m \n"
    end
  end
end

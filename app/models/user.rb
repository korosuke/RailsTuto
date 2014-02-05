class User < ActiveRecord::Base
  attr_accessible :desc, :email, :name, :user_id
end

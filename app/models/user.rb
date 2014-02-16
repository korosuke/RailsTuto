class User < ActiveRecord::Base
  attr_accessible :memo, :name, :num
end

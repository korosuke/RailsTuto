class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :user_id
      t.string :name
      t.string :email
      t.string :desc

      t.timestamps
    end
  end
end

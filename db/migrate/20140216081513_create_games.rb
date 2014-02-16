class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :title
      t.string :desc
      t.string :review

      t.timestamps
    end
  end
end

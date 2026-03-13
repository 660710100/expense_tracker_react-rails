# backend/app/models/expense.rb
class Expense
  include Mongoid::Document
  include Mongoid::Timestamps # Automatically adds created_at and updated_at

  field :title, type: String
  field :amount, type: Float
  field :category, type: String
end
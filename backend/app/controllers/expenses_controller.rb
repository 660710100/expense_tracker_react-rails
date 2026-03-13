# backend/app/controllers/expenses_controller.rb
class ExpensesController < ApplicationController
  def index
    @expenses = Expense.all.order(created_at: :desc)
    render json: @expenses
  end

  def create
    @expense = Expense.new(expense_params)
    if @expense.save
      render json: @expense, status: :created
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @expense = Expense.find(params[:id])
    @expense.destroy
    head :no_content
  end

  private

  def expense_params
    params.require(:expense).permit(:title, :amount, :category)
  end
end
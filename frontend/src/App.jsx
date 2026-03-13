import { useState, useEffect } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  // API will run on port 3001
  const API_URL = 'http://localhost:3001/expenses'

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setExpenses(data)
    } catch (error) {
      console.error("Failed to fetch expenses:", error)
    }
  }

  const addExpense = async (e) => {
    e.preventDefault()
    const newExpense = { title, amount: parseFloat(amount), category }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expense: newExpense })
      })

      if (res.ok) {
        setTitle('')
        setAmount('')
        setCategory('')
        fetchExpenses()
      }
    } catch (error) {
      console.error("Failed to add expense:", error)
    }
  }

  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchExpenses()
      }
    } catch (error) {
      console.error("Failed to delete expense:", error)
    }
  }

  // Calculate total expense
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div>
      <h1>Expense Tracker</h1>

      <h2>Total: ${total.toFixed(2)}</h2>

      <form onSubmit={addExpense} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          step="0.01"
        />
        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {expenses.map(exp => {
          const id = exp._id.$oid || exp._id;
          return (
            <li key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
              <span><strong>{exp.title}</strong> ({exp.category}) - ${exp.amount.toFixed(2)}</span>
              <button onClick={() => deleteExpense(id)} style={{ cursor: 'pointer', color: 'red' }}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
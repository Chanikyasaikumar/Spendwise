import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, History as HistoryIcon, ChevronDown } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState([]);
  // 1. Changed default category to an empty string for the placeholder
  const [form, setForm] = useState({ title: '', amount: '', category: '' });

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(res.data);
    } catch (err) { console.error("Connection error", err); }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure a category was selected
    if (!form.category) {
      alert("Please select a category");
      return;
    }

    await axios.post('http://localhost:5000/api/expenses', {
      ...form,
      amount: parseFloat(form.amount)
    });

    // Reset to placeholder after saving
    setForm({ title: '', amount: '', category: '' });
    fetchExpenses();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">

      <header className="flex items-center justify-center gap-3 mb-12">
        <div className="p-2 bg-blue-600 rounded-lg shadow-md">
          <Wallet className="text-white w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">SpendWise</h1>
      </header>

      <main className="max-w-5xl mx-auto space-y-12">

        <section className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 p-3">
            <h2 className="text-center text-white font-bold text-lg">New Expense</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="flex flex-row gap-4 items-end">
              <div className="flex-[2]">
                <label className="block text-sm font-black text-gray-800 uppercase mb-2">Title</label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Item name" value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})} required
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-black text-gray-800 uppercase mb-2">Amount</label>
                <input
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00" type="number" step="0.01" value={form.amount}
                  onChange={e => setForm({...form, amount: e.target.value})} required
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-black text-gray-800 uppercase mb-2">Category</label>
                <div className="relative">
                  <select
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value})}
                    required
                  >
                    {/* Placeholder option */}
                    <option value="" disabled>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all active:scale-95 text-sm uppercase tracking-wider">
                Save Transaction
              </button>
            </div>
          </form>
        </section>

        <section className="space-y-6">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800">
            <HistoryIcon className="w-6 h-6 text-blue-600" /> History
          </h2>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-black text-gray-500 uppercase">Title</th>
                  <th className="p-4 text-xs font-black text-gray-500 uppercase text-center">Category</th>
                  <th className="p-4 text-xs font-black text-gray-500 uppercase text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {expenses.length > 0 ? expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 font-semibold text-gray-700">{exp.title}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase">
                        {exp.category}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-blue-600">
                      ${parseFloat(exp.amount).toFixed(2)}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-gray-400 italic">No transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
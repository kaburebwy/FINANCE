import { useState } from 'react';
import { createTransaction } from '../api';
export default function TransactionForm({ onSaved }){
  const [form, setForm] = useState({ description:'', category:'', date:'', amount:'', type:'expense' });
  async function submit(e){
    e.preventDefault();
    const payload = { ...form, amount: Number(form.amount), date: form.date };
    const saved = await createTransaction(payload);
    setForm({ description:'', category:'', date:'', amount:'', type:'expense' });
    onSaved && onSaved(saved);
  }
  return (
    <form onSubmit={submit} className="space-y-2">
      <input value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Descrição" required />
      <input value={form.category} onChange={e=>setForm({...form, category:e.target.value})} placeholder="Categoria" />
      <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required />
      <input value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} placeholder="Valor" required />
      <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
        <option value="income">Entrada</option>
        <option value="expense">Saída</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
}

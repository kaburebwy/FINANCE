import { useEffect, useState } from 'react';
import { fetchTransactions } from '../api';
import TransactionForm from './TransactionForm';
import UploadInvoice from './UploadInvoice';
export default function Dashboard(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ load(); }, []);
  async function load(){ const data = await fetchTransactions(); setItems(data); }
  function handleSaved(){ load(); }
  return (
    <div className="p-4">
      <h2 className="text-2xl">Dashboard Financeiro</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="card p-4"><h3>Adicionar manual</h3><TransactionForm onSaved={handleSaved} /></div>
        <div className="card p-4"><h3>Upload de fatura (PDF)</h3><UploadInvoice onUploaded={handleSaved} /></div>
      </div>
      <div className="mt-6">
        <h3>Transações</h3>
        <table className="w-full"><thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th></tr></thead>
          <tbody>{items.map(it=> (<tr key={it._id}><td>{new Date(it.date).toLocaleDateString()}</td><td>{it.description}</td><td>{it.category}</td><td>{it.amount}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

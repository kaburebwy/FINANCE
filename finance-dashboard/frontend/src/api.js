const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
export async function fetchTransactions(params = {}){
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/transactions?${qs}`);
  return res.json();
}
export async function createTransaction(body){
  const res = await fetch(`${API_BASE}/transactions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  return res.json();
}
export async function uploadInvoice(file){
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/uploads/invoice`, { method: 'POST', body: form });
  return res.json();
}

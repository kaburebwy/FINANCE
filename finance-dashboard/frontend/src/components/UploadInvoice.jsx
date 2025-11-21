import { useState } from 'react';
import { uploadInvoice } from '../api';
export default function UploadInvoice({ onUploaded }){
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  async function submit(e){
    e.preventDefault();
    if(!file) return alert('Escolha um PDF');
    setLoading(true);
    const res = await uploadInvoice(file);
    setLoading(false);
    if(res.success){ onUploaded && onUploaded(res.transaction); }
    else alert('Erro ao enviar');
  }
  return (
    <form onSubmit={submit} className="space-y-2">
      <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files[0])} />
      <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar PDF'}</button>
    </form>
  );
}

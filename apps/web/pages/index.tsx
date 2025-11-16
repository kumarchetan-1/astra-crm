import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetcher = (url:string) => fetch(url).then(r => r.json());

export default function Home() {
  const { data: leads } = useSWR('/api/proxy/leads', fetcher);
  const [wsStatus, setWsStatus] = useState('disconnected');
  useEffect(() => {
    const ws = new WebSocket((process.env.NEXT_PUBLIC_WS || 'ws://localhost:5000'));
    ws.onopen = () => setWsStatus('open');
    ws.onmessage = (e) => {
      console.log('ws msg', e.data);
    };
    return () => ws.close();
  }, []);
  return (
    <div style={{fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
        <h1 style={{margin:0}}>Astra — Minimal CRM</h1>
        <nav>
          <button style={{padding:'8px 12px', borderRadius:8}}>New Lead</button>
        </nav>
      </header>

      <section style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:24}}>
        <main>
          <div style={{display:'grid', gap:12}}>
            {leads ? leads.map((l:any) => (
              <div key={l.id} style={{padding:12, borderRadius:12, boxShadow:'0 6px 18px rgba(0,0,0,0.06)', background:'#fff'}}>
                <div style={{fontWeight:600}}>{l.name}</div>
                <div style={{fontSize:13, color:'#555'}}>{l.email} • {l.status}</div>
              </div>
            )) : <div>Loading leads...</div>}
          </div>
        </main>
        <aside>
          <div style={{padding:12, borderRadius:12, boxShadow:'0 6px 18px rgba(0,0,0,0.06)', background:'#fff'}}>
            <h3 style={{marginTop:0}}>Command</h3>
            <div>
              <input placeholder="e.g. show leads contacted last week" style={{width:'100%', padding:8, borderRadius:8}} />
              <div style={{height:12}} />
              <button style={{padding:8, width:'100%', borderRadius:8}}>Run</button>
            </div>
            <div style={{marginTop:12}}>
              <p>WS status: {wsStatus}</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

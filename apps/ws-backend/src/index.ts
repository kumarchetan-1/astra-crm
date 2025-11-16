import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const wss = new WebSocketServer({ port: Number(process.env.WS_BACKEND_PORT) || 5000 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.type === 'subscribe') {
        ws.send(JSON.stringify({ type: 'subscribed', channel: data.channel || 'default' }));
      }
      if (data.type === 'notify') {
        // broadcast to all
        const payload = { type: 'lead.created', payload: data.payload || {} };
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
          }
        });
      }
    } catch (err) {
      ws.send(JSON.stringify({ error: 'invalid message' }));
    }
  });

  ws.send(JSON.stringify({ type: 'welcome', now: new Date().toISOString() }));
});

console.log('ws-backend listening on port', process.env.WS_BACKEND_PORT || 5000);

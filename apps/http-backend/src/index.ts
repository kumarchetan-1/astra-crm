import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: { company: true, activities: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(leads);
  } catch (err: any) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/leads', async (req, res) => {
  const { name, email, companyId } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name,email required' });
  try {
    const lead = await prisma.lead.create({
      data: { name, email, companyId: companyId || undefined }
    });
    // notify ws backend - naive approach: we won't implement broker here; client can use WS
    res.status(201).json(lead);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/companies', async (_req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (err: any) {
    console.error('Error fetching companies:', err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.HTTP_BACKEND_PORT || 4000;
app.listen(port, () => {
  console.log(`http-backend listening on ${port}`);
});

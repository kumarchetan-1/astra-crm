-- minimal seed data
INSERT INTO "Company" (name, domain, "createdAt", "updatedAt") VALUES ('Acme Corp','acme.com', now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "Lead" (name, email, status, "companyId", "createdAt", "updatedAt") VALUES
('Raj Sharma','raj@acme.com','new',1, now(), now()),
('Mira Patel','mira@acme.com','contacted',1, now(), now()),
('Aman Verma','aman@acme.com','qualified',1, now(), now())
ON CONFLICT DO NOTHING;

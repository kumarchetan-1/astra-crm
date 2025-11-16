export type ID = number;

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
  notes?: string | null;
  companyId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProduct {
  id: number;
  code: string;
  name: string | null;
  user: { id: number; email: string } | null;
}
import { api } from '../api/client';

export async function getDashboardSummary() {
  const { data } = await api.get('/dashboard/summary');
  return data;
}

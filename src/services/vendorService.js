import { api } from '../api/client';

export async function getVendors() {
  const { data } = await api.get('/vendors');
  return data;
}

export async function createVendor(payload) {
  const { data } = await api.post('/vendors', payload);
  return data;
}

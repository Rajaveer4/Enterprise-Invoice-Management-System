import { api } from '../api/client';

export async function getInvoices() {
  const { data } = await api.get('/invoices');
  return data;
}

export async function getInvoice(id) {
  const { data } = await api.get(`/invoices/${id}`);
  return data;
}

export async function createInvoice(payload) {
  const { data } = await api.post('/invoices', payload);
  return data;
}

export async function reviewInvoice(id, remarks) {
  const { data } = await api.put(`/invoices/${id}/review`, { remarks });
  return data;
}

export async function approveInvoice(id, remarks) {
  const { data } = await api.put(`/invoices/${id}/approve`, { remarks });
  return data;
}

export async function rejectInvoice(id, remarks) {
  const { data } = await api.put(`/invoices/${id}/reject`, { remarks });
  return data;
}

export async function completePayment(id, payload) {
  const { data } = await api.put(`/invoices/${id}/payment`, payload);
  return data;
}

export async function getApprovalHistory(invoiceId) {
  const { data } = await api.get(`/invoices/${invoiceId}/approvals`);
  return data;
}

export async function getAuditLogs(invoiceId) {
  const { data } = await api.get(`/audit-logs/Invoice/${invoiceId}`);
  return data;
}

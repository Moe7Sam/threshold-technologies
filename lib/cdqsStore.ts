import { CDQSApplication, CertificatePayload, cdqsOffer } from '@/lib/cdqs';

type SupabaseConfig = {
  kind: 'supabase';
  url: string;
  key: string;
};

type SheetsConfig = {
  kind: 'sheets';
  url: string;
};

export type StoredCertificate = CertificatePayload & {
  id: string;
  verificationToken: string;
  verificationUrl?: string;
  status: 'active' | 'revoked';
};

export type StorageState = {
  ready: boolean;
  mode: 'supabase' | 'sheets' | 'unconfigured';
  label: string;
  message?: string;
};

function config(): SupabaseConfig | SheetsConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) return { kind: 'supabase', url: url.replace(/\/$/, ''), key };

  const sheetsUrl = process.env.NEXT_PUBLIC_CDQS_GOOGLE_SCRIPT_URL;
  if (sheetsUrl) return { kind: 'sheets', url: sheetsUrl };

  return null;
}

export function cdqsStorageState(): StorageState {
  const current = config();

  if (!current) {
    return {
      ready: false,
      mode: 'unconfigured',
      label: 'Local/unconfigured mode',
      message:
        'Persistent storage is not configured. Add Supabase env vars and run the CDQS SQL setup, or add NEXT_PUBLIC_CDQS_GOOGLE_SCRIPT_URL for temporary Google Sheets storage.',
    };
  }

  return {
    ready: true,
    mode: current.kind,
    label: current.kind === 'supabase' ? 'Supabase connected' : 'Google Sheets connected',
  };
}

export async function supabaseFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const current = config();
  if (!current) throw new Error(cdqsStorageState().message);
  if (current.kind !== 'supabase') throw new Error('Supabase is not configured.');

  const response = await fetch(`${current.url}${path}`, {
    ...init,
    headers: {
      apikey: current.key,
      Authorization: `Bearer ${current.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  if (!text) return undefined as T;

  return JSON.parse(text) as T;
}

export async function sheetsFetch<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const current = config();
  if (!current) throw new Error(cdqsStorageState().message);
  if (current.kind !== 'sheets') throw new Error('Google Sheets storage is not configured.');

  const response = await fetch(current.url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload }),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets request failed with ${response.status}`);
  }

  const data = await response.json();
  if (!data.ok) throw new Error(data.error || 'Google Sheets request failed.');
  return data as T;
}

function fromApplicationRow(row: Record<string, unknown>): CDQSApplication {
  return {
    id: String(row.id),
    createdAt: String(row.created_at || '').slice(0, 10),
    fullName: String(row.full_name || ''),
    email: String(row.email || ''),
    phone: String(row.phone || ''),
    role: String(row.role || ''),
    company: String(row.company || ''),
    yearsExperience: String(row.years_experience || ''),
    city: String(row.city || ''),
    goal: String(row.goal || ''),
    paymentPreference: String(row.payment_preference || ''),
    status: String(row.status || 'new') as CDQSApplication['status'],
    revenueAed: Number(row.revenue_aed || 0),
  };
}

export async function saveApplication(application: CDQSApplication) {
  const current = config();
  if (!current) throw new Error(cdqsStorageState().message);

  if (current.kind === 'sheets') {
    await sheetsFetch('submitApplication', { application });
    return application;
  }

  await supabaseFetch<void>('/rest/v1/cdqs_applications', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      id: application.id,
      full_name: application.fullName,
      email: application.email,
      phone: application.phone,
      role: application.role,
      company: application.company,
      years_experience: application.yearsExperience,
      city: application.city,
      goal: application.goal,
      payment_preference: application.paymentPreference,
      status: application.status,
      revenue_aed: application.revenueAed,
    }),
  });

  return application;
}

export async function loadApplications(adminPin: string) {
  const current = config();
  if (!current) throw new Error(cdqsStorageState().message);

  if (current.kind === 'sheets') {
    const data = await sheetsFetch<{ ok: true; applications: CDQSApplication[] }>('listApplications', { adminPin });
    return data.applications;
  }

  const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_admin_list_applications', {
    method: 'POST',
    body: JSON.stringify({ p_admin_pin: adminPin }),
  });

  return rows.map(fromApplicationRow);
}

export async function createCertificate(payload: CertificatePayload, adminPin: string) {
  const current = config();
  if (!current) throw new Error(cdqsStorageState().message);

  if (current.kind === 'sheets') {
    const data = await sheetsFetch<{ ok: true; certificate: StoredCertificate }>('createCertificate', {
      adminPin,
      certificate: payload,
    });
    return data.certificate;
  }

  const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_admin_create_certificate', {
    method: 'POST',
    body: JSON.stringify({
      p_admin_pin: adminPin,
      p_certificate_number: payload.certificateNumber,
      p_student_name: payload.studentName,
      p_role_title: payload.role,
      p_cohort_name: payload.cohort || cdqsOffer.cohort,
      p_issue_date: payload.issueDate,
      p_verifier_name: payload.verifier,
    }),
  });

  const row = rows[0];
  return {
    id: String(row.id),
    certificateNumber: String(row.certificate_number),
    studentName: String(row.student_name),
    role: String(row.role_title),
    cohort: String(row.cohort_name),
    issueDate: String(row.issue_date),
    verifier: String(row.verifier_name),
    verificationToken: String(row.verification_token),
    status: String(row.status || 'active') as StoredCertificate['status'],
  };
}

export async function verifyCertificate(token: string) {
  const current = config();
  if (!current) throw new Error(cdqsStorageState().message);

  if (current.kind === 'sheets') {
    const data = await sheetsFetch<{ ok: true; certificate: StoredCertificate | null }>('verifyCertificate', { token });
    return data.certificate;
  }

  const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_verify_certificate', {
    method: 'POST',
    body: JSON.stringify({ p_verification_token: token }),
  });

  const row = rows[0];
  if (!row) return null;

  return {
    id: String(row.id),
    certificateNumber: String(row.certificate_number),
    studentName: String(row.student_name),
    role: String(row.role_title),
    cohort: String(row.cohort_name),
    issueDate: String(row.issue_date),
    verifier: String(row.verifier_name),
    verificationToken: String(row.verification_token),
    status: String(row.status || 'active') as StoredCertificate['status'],
  };
}

export type ApplicationStatus =
  | 'new'
  | 'qualified'
  | 'payment_pending'
  | 'paid'
  | 'onboarded'
  | 'certified';

export type CDQSApplication = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  yearsExperience: string;
  city: string;
  goal: string;
  paymentPreference: string;
  status: ApplicationStatus;
  revenueAed: number;
};

export type CertificatePayload = {
  certificateNumber: string;
  studentName: string;
  role: string;
  cohort: string;
  issueDate: string;
  verifier: string;
};

export const cdqsOffer = {
  cohort: 'CDQS Cohort 001',
  title: 'Certified Digital Quantity Surveying',
  targetRevenue: 25000,
  targetSeats: 10,
  seatPrice: 2500,
  startDate: 'July 2026',
  promise:
    'A compact professional verification sprint for UAE QS, Civil and BIM professionals who need proof-ready digital QS competence.',
};

export const competencyAreas = [
  'Digital measurement workflow',
  'BOQ and quantity validation',
  'Cost reporting pack',
  'Variation and claim evidence',
  'Portfolio-ready QS case file',
];

export const sampleApplications: CDQSApplication[] = [
  {
    id: 'CDQS-LEAD-001',
    createdAt: '2026-06-19',
    fullName: 'Sample Applicant',
    email: 'sample@example.com',
    phone: '+971 50 000 0000',
    role: 'Quantity Surveyor',
    company: 'UAE Contractor',
    yearsExperience: '3-5',
    city: 'Dubai',
    goal: 'Build a verified QS portfolio for employer review.',
    paymentPreference: 'Full payment',
    status: 'qualified',
    revenueAed: 0,
  },
];

export function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function encodeCertificate(payload: CertificatePayload) {
  if (typeof window === 'undefined') {
    return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  }

  return btoa(JSON.stringify(payload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function decodeCertificate(token: string): CertificatePayload | null {
  try {
    const normalized = token.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    const json =
      typeof window === 'undefined'
        ? Buffer.from(padded, 'base64').toString('utf8')
        : atob(padded);

    return JSON.parse(json) as CertificatePayload;
  } catch {
    return null;
  }
}

export function toCsv(rows: CDQSApplication[]) {
  const headers = [
    'Lead ID',
    'Created',
    'Name',
    'Email',
    'Phone',
    'Role',
    'Company',
    'Experience',
    'City',
    'Goal',
    'Payment Preference',
    'Status',
    'Revenue AED',
  ];

  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const body = rows.map((row) =>
    [
      row.id,
      row.createdAt,
      row.fullName,
      row.email,
      row.phone,
      row.role,
      row.company,
      row.yearsExperience,
      row.city,
      row.goal,
      row.paymentPreference,
      row.status,
      row.revenueAed,
    ]
      .map(escape)
      .join(','),
  );

  return [headers.map(escape).join(','), ...body].join('\n');
}

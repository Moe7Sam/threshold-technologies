export type RegistryStatus = 'candidate' | 'evidence_submitted' | 'under_review' | 'verified' | 'rejected';

export type CertificationCode = 'CDQS' | 'CBIM' | 'CCI';

export type RegistryMember = {
  id: string;
  applicationId?: string;
  fullName: string;
  title: string;
  company: string;
  location: string;
  email: string;
  linkedin: string;
  certification: CertificationCode;
  cohort: string;
  status: RegistryStatus;
  registrationNumber: string;
  profileToken?: string;
  issuedAt?: string;
  validUntil?: string;
};

export type EvidenceItem = {
  id: string;
  memberId: string;
  title: string;
  category: string;
  fileName: string;
  notes: string;
  status: 'submitted' | 'approved' | 'needs_revision';
  submittedAt: string;
};

export type RegistryCertificatePayload = {
  registrationNumber: string;
  certificateNumber: string;
  fullName: string;
  title: string;
  certification: CertificationCode;
  certificationName: string;
  cohort: string;
  status: 'Active' | 'Revoked';
  issuedAt: string;
  validUntil: string;
};

export const registryBrand = {
  name: 'Threshold Professional Registry',
  issuer: 'Threshold Technologies',
  phase: 'MVP Registry',
  purpose: 'Professional competency verification for construction and commercial technology talent.',
};

export const certifications = [
  {
    code: 'CDQS' as const,
    name: 'Certified Digital Quantity Surveyor',
    status: 'Active for Cohort 001',
  },
  {
    code: 'CBIM' as const,
    name: 'Certified BIM Professional',
    status: 'Future registry pathway',
  },
  {
    code: 'CCI' as const,
    name: 'Certified Commercial Intelligence Professional',
    status: 'Future registry pathway',
  },
];

export const cdqsCompetencyStandards = [
  'Digital measurement and quantity validation',
  'BOQ structure, audit trail and documentation control',
  'Cost report preparation and commercial summary',
  'Variation evidence and claim support pack',
  'Professional portfolio case file for employer review',
];

export const sampleMember: RegistryMember = {
  id: 'tpr-cdqs-001',
  fullName: 'Aisha Khan',
  title: 'Quantity Surveyor',
  company: 'UAE Construction Group',
  location: 'Dubai, UAE',
  email: 'aisha@example.com',
  linkedin: 'https://linkedin.com/in/sample',
  certification: 'CDQS',
  cohort: 'CDQS Cohort 001',
  status: 'verified',
  registrationNumber: 'TPR-CDQS-001',
  profileToken: 'sample-profile-token',
  issuedAt: '2026-07-31',
  validUntil: '2028-07-31',
};

export const sampleEvidence: EvidenceItem[] = [
  {
    id: 'evidence-001',
    memberId: 'tpr-cdqs-001',
    title: 'Digital measurement workbook',
    category: 'Measurement',
    fileName: 'measurement-workbook.pdf',
    notes: 'Submitted as final CDQS case evidence.',
    status: 'approved',
    submittedAt: '2026-07-20',
  },
  {
    id: 'evidence-002',
    memberId: 'tpr-cdqs-001',
    title: 'Cost report pack',
    category: 'Commercial reporting',
    fileName: 'cost-report-pack.pdf',
    notes: 'Includes summary, assumptions and validation notes.',
    status: 'approved',
    submittedAt: '2026-07-24',
  },
];

export function encodeRegistryPayload(payload: RegistryCertificatePayload) {
  if (typeof window === 'undefined') {
    return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  }

  return btoa(JSON.stringify(payload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function decodeRegistryPayload(token: string): RegistryCertificatePayload | null {
  try {
    const normalized = token.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    const json =
      typeof window === 'undefined'
        ? Buffer.from(padded, 'base64').toString('utf8')
        : atob(padded);

    return JSON.parse(json) as RegistryCertificatePayload;
  } catch {
    return null;
  }
}

export function makeRegistryId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function certificationName(code: CertificationCode) {
  return certifications.find((item) => item.code === code)?.name || code;
}

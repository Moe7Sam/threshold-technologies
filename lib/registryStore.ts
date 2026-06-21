import { CDQSApplication } from '@/lib/cdqs';
import { EvidenceItem, RegistryMember } from '@/lib/registry';
import { cdqsStorageState, sheetsFetch, supabaseFetch } from '@/lib/cdqsStore';

function fromProfileRow(row: Record<string, unknown>): RegistryMember {
  return {
    id: String(row.id),
    applicationId: String(row.application_id || row.applicationId || ''),
    fullName: String(row.full_name || row.fullName || ''),
    title: String(row.title || ''),
    company: String(row.company || ''),
    location: String(row.location || 'UAE'),
    email: String(row.email || ''),
    linkedin: String(row.linkedin || ''),
    certification: 'CDQS',
    cohort: String(row.cohort || 'CDQS Cohort 001'),
    status: String(row.status || 'candidate') as RegistryMember['status'],
    registrationNumber: String(row.registration_number || row.registrationNumber || ''),
    profileToken: String(row.profile_token || row.profileToken || ''),
    issuedAt: row.issued_at || row.issuedAt ? String(row.issued_at || row.issuedAt) : undefined,
    validUntil: row.valid_until || row.validUntil ? String(row.valid_until || row.validUntil) : undefined,
  };
}

function fromEvidenceRow(row: Record<string, unknown>): EvidenceItem {
  return {
    id: String(row.id),
    memberId: String(row.profile_id || row.memberId || ''),
    title: String(row.title || ''),
    category: String(row.category || ''),
    fileName: String(row.file_name || row.fileName || ''),
    notes: String(row.notes || ''),
    status: String(row.status || 'submitted') as EvidenceItem['status'],
    submittedAt: String(row.submitted_at || row.submittedAt || '').slice(0, 10),
  };
}

export async function acceptApplication(application: CDQSApplication, adminPin: string) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_admin_accept_application', {
      method: 'POST',
      body: JSON.stringify({
        p_admin_pin: adminPin,
        p_application_id: application.id,
        p_revenue_aed: application.revenueAed || 2500,
      }),
    });
    return fromProfileRow(rows[0]);
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; profile: RegistryMember }>('acceptApplication', {
      adminPin,
      application,
    });
    return data.profile;
  }
}

export async function loadRegistryProfile(profileToken: string) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_registry_get_profile', {
      method: 'POST',
      body: JSON.stringify({ p_profile_token: profileToken }),
    });
    return rows[0] ? fromProfileRow(rows[0]) : null;
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; profile: RegistryMember | null }>('getRegistryProfile', {
      profileToken,
    });
    return data.profile;
  }
}

export async function loadRegistryEvidence(profileToken: string) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_registry_list_evidence', {
      method: 'POST',
      body: JSON.stringify({ p_profile_token: profileToken }),
    });
    return rows.map(fromEvidenceRow);
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; evidence: EvidenceItem[] }>('listRegistryEvidence', {
      profileToken,
    });
    return data.evidence;
  }
}

export async function submitRegistryEvidence(profileToken: string, evidence: EvidenceItem) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_registry_submit_evidence', {
      method: 'POST',
      body: JSON.stringify({
        p_profile_token: profileToken,
        p_title: evidence.title,
        p_category: evidence.category,
        p_file_name: evidence.fileName,
        p_notes: evidence.notes,
      }),
    });
    return fromEvidenceRow(rows[0]);
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; evidence: EvidenceItem }>('submitRegistryEvidence', {
      profileToken,
      evidence,
    });
    return data.evidence;
  }
}

export async function adminListRegistry(adminPin: string) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_admin_list_registry_profiles', {
      method: 'POST',
      body: JSON.stringify({ p_admin_pin: adminPin }),
    });
    return rows.map(fromProfileRow);
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; profiles: RegistryMember[] }>('listRegistryProfiles', { adminPin });
    return data.profiles;
  }
}

export async function adminListEvidence(adminPin: string, profileId: string) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_admin_list_evidence', {
      method: 'POST',
      body: JSON.stringify({ p_admin_pin: adminPin, p_profile_id: profileId }),
    });
    return rows.map(fromEvidenceRow);
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; evidence: EvidenceItem[] }>('adminListEvidence', {
      adminPin,
      profileId,
    });
    return data.evidence;
  }
}

export async function adminReviewEvidence(adminPin: string, evidenceId: string, status: EvidenceItem['status']) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_admin_review_evidence', {
      method: 'POST',
      body: JSON.stringify({ p_admin_pin: adminPin, p_evidence_id: evidenceId, p_review_status: status }),
    });
    return fromEvidenceRow(rows[0]);
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; evidence: EvidenceItem }>('reviewEvidence', {
      adminPin,
      evidenceId,
      status,
    });
    return data.evidence;
  }
}

export async function adminApproveRegistry(adminPin: string, profileId: string) {
  if (!cdqsStorageState().ready) throw new Error(cdqsStorageState().message);

  try {
    const rows = await supabaseFetch<Array<Record<string, unknown>>>('/rest/v1/rpc/cdqs_admin_approve_registry_profile', {
      method: 'POST',
      body: JSON.stringify({ p_admin_pin: adminPin, p_profile_id: profileId }),
    });
    return fromProfileRow(rows[0]);
  } catch (error) {
    if (!String(error).includes('Supabase is not configured')) throw error;
    const data = await sheetsFetch<{ ok: true; profile: RegistryMember }>('approveRegistryProfile', {
      adminPin,
      profileId,
    });
    return data.profile;
  }
}

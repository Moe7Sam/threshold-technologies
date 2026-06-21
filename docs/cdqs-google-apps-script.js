const ADMIN_PIN_PROPERTY = 'CDQS_ADMIN_PIN';

function doPost(event) {
  try {
    const body = JSON.parse(event.postData.contents || '{}');
    const sheet = SpreadsheetApp.getActiveSpreadsheet();

    if (body.action === 'submitApplication') {
      return json(submitApplication(sheet, body.application));
    }

    if (body.action === 'listApplications') {
      assertAdmin(body.adminPin);
      return json({ ok: true, applications: listApplications(sheet) });
    }

    if (body.action === 'createCertificate') {
      assertAdmin(body.adminPin);
      return json({ ok: true, certificate: createCertificate(sheet, body.certificate) });
    }

    if (body.action === 'verifyCertificate') {
      return json({ ok: true, certificate: verifyCertificate(sheet, body.token) });
    }

    if (body.action === 'acceptApplication') {
      assertAdmin(body.adminPin);
      return json({ ok: true, profile: acceptApplication(sheet, body.application) });
    }

    if (body.action === 'getRegistryProfile') {
      return json({ ok: true, profile: getRegistryProfile(sheet, body.profileToken) });
    }

    if (body.action === 'listRegistryEvidence') {
      return json({ ok: true, evidence: listRegistryEvidence(sheet, body.profileToken) });
    }

    if (body.action === 'submitRegistryEvidence') {
      return json({ ok: true, evidence: submitRegistryEvidence(sheet, body.profileToken, body.evidence) });
    }

    if (body.action === 'listRegistryProfiles') {
      assertAdmin(body.adminPin);
      return json({ ok: true, profiles: listRegistryProfiles(sheet) });
    }

    if (body.action === 'adminListEvidence') {
      assertAdmin(body.adminPin);
      return json({ ok: true, evidence: adminListEvidence(sheet, body.profileId) });
    }

    if (body.action === 'reviewEvidence') {
      assertAdmin(body.adminPin);
      return json({ ok: true, evidence: reviewEvidence(sheet, body.evidenceId, body.status) });
    }

    if (body.action === 'approveRegistryProfile') {
      assertAdmin(body.adminPin);
      return json({ ok: true, profile: approveRegistryProfile(sheet, body.profileId) });
    }

    throw new Error('Unknown action.');
  } catch (error) {
    return json({ ok: false, error: String(error.message || error) });
  }
}

function submitApplication(sheet, application) {
  const tab = getOrCreateSheet(sheet, 'Applications', [
    'id',
    'createdAt',
    'fullName',
    'email',
    'phone',
    'role',
    'company',
    'yearsExperience',
    'city',
    'goal',
    'paymentPreference',
    'status',
    'revenueAed',
  ]);

  tab.appendRow([
    application.id,
    application.createdAt,
    application.fullName,
    application.email,
    application.phone,
    application.role,
    application.company,
    application.yearsExperience,
    application.city,
    application.goal,
    application.paymentPreference,
    application.status || 'new',
    Number(application.revenueAed || 0),
  ]);

  return { ok: true };
}

function listApplications(sheet) {
  const tab = getOrCreateSheet(sheet, 'Applications', []);
  const rows = tab.getDataRange().getValues();
  const headers = rows.shift() || [];

  return rows
    .filter((row) => row[0])
    .map((row) => objectFromRow(headers, row))
    .reverse();
}

function createCertificate(sheet, certificate) {
  const tab = getOrCreateSheet(sheet, 'Certificates', [
    'id',
    'certificateNumber',
    'studentName',
    'role',
    'cohort',
    'issueDate',
    'verifier',
    'verificationToken',
    'status',
  ]);

  const token = Utilities.getUuid().replace(/-/g, '');
  const record = {
    id: Utilities.getUuid(),
    certificateNumber: certificate.certificateNumber,
    studentName: certificate.studentName,
    role: certificate.role,
    cohort: certificate.cohort,
    issueDate: certificate.issueDate,
    verifier: certificate.verifier,
    verificationToken: token,
    status: 'active',
  };

  tab.appendRow([
    record.id,
    record.certificateNumber,
    record.studentName,
    record.role,
    record.cohort,
    record.issueDate,
    record.verifier,
    record.verificationToken,
    record.status,
  ]);

  return record;
}

function verifyCertificate(sheet, token) {
  const tab = getOrCreateSheet(sheet, 'Certificates', []);
  const rows = tab.getDataRange().getValues();
  const headers = rows.shift() || [];
  const records = rows.filter((row) => row[7] === token).map((row) => objectFromRow(headers, row));

  return records[0] || null;
}

function acceptApplication(sheet, application) {
  const applications = getOrCreateSheet(sheet, 'Applications', []);
  const appRows = applications.getDataRange().getValues();
  for (let index = 1; index < appRows.length; index++) {
    if (appRows[index][0] === application.id) {
      applications.getRange(index + 1, 12).setValue('paid');
      applications.getRange(index + 1, 13).setValue(Number(application.revenueAed || 2500));
    }
  }

  const tab = getOrCreateSheet(sheet, 'RegistryProfiles', [
    'id',
    'applicationId',
    'fullName',
    'email',
    'title',
    'company',
    'location',
    'linkedin',
    'certification',
    'cohort',
    'status',
    'registrationNumber',
    'profileToken',
    'issuedAt',
    'validUntil',
  ]);

  const existing = listRegistryProfiles(sheet).find((profile) => profile.applicationId === application.id);
  if (existing) return existing;

  const count = Math.max(tab.getLastRow() - 1, 0) + 1;
  const profile = {
    id: Utilities.getUuid(),
    applicationId: application.id,
    fullName: application.fullName,
    email: application.email,
    title: application.role || 'Quantity Surveyor',
    company: application.company || '',
    location: application.city || 'UAE',
    linkedin: '',
    certification: 'CDQS',
    cohort: 'CDQS Cohort 001',
    status: 'candidate',
    registrationNumber: `TPR-CDQS-${String(count).padStart(3, '0')}`,
    profileToken: Utilities.getUuid().replace(/-/g, ''),
    issuedAt: '',
    validUntil: '',
  };

  tab.appendRow([
    profile.id,
    profile.applicationId,
    profile.fullName,
    profile.email,
    profile.title,
    profile.company,
    profile.location,
    profile.linkedin,
    profile.certification,
    profile.cohort,
    profile.status,
    profile.registrationNumber,
    profile.profileToken,
    profile.issuedAt,
    profile.validUntil,
  ]);

  return profile;
}

function listRegistryProfiles(sheet) {
  const tab = getOrCreateSheet(sheet, 'RegistryProfiles', []);
  const rows = tab.getDataRange().getValues();
  const headers = rows.shift() || [];
  return rows.filter((row) => row[0]).map((row) => objectFromRow(headers, row));
}

function getRegistryProfile(sheet, profileToken) {
  return listRegistryProfiles(sheet).find((profile) => profile.profileToken === profileToken) || null;
}

function submitRegistryEvidence(sheet, profileToken, evidence) {
  const profile = getRegistryProfile(sheet, profileToken);
  if (!profile) throw new Error('Invalid profile token.');

  const tab = getOrCreateSheet(sheet, 'RegistryEvidence', [
    'id',
    'profile_id',
    'title',
    'category',
    'file_name',
    'notes',
    'status',
    'submitted_at',
  ]);

  const record = {
    id: Utilities.getUuid(),
    profile_id: profile.id,
    title: evidence.title,
    category: evidence.category,
    file_name: evidence.fileName,
    notes: evidence.notes,
    status: 'submitted',
    submitted_at: new Date().toISOString(),
  };

  tab.appendRow([
    record.id,
    record.profile_id,
    record.title,
    record.category,
    record.file_name,
    record.notes,
    record.status,
    record.submitted_at,
  ]);

  return record;
}

function listRegistryEvidence(sheet, profileToken) {
  const profile = getRegistryProfile(sheet, profileToken);
  if (!profile) return [];
  return adminListEvidence(sheet, profile.id);
}

function adminListEvidence(sheet, profileId) {
  const tab = getOrCreateSheet(sheet, 'RegistryEvidence', []);
  const rows = tab.getDataRange().getValues();
  const headers = rows.shift() || [];
  return rows.filter((row) => row[1] === profileId).map((row) => objectFromRow(headers, row)).reverse();
}

function reviewEvidence(sheet, evidenceId, status) {
  const tab = getOrCreateSheet(sheet, 'RegistryEvidence', []);
  const rows = tab.getDataRange().getValues();
  for (let index = 1; index < rows.length; index++) {
    if (rows[index][0] === evidenceId) {
      tab.getRange(index + 1, 7).setValue(status);
      return objectFromRow(rows[0], tab.getRange(index + 1, 1, 1, tab.getLastColumn()).getValues()[0]);
    }
  }
  throw new Error('Evidence not found.');
}

function approveRegistryProfile(sheet, profileId) {
  const tab = getOrCreateSheet(sheet, 'RegistryProfiles', []);
  const rows = tab.getDataRange().getValues();
  for (let index = 1; index < rows.length; index++) {
    if (rows[index][0] === profileId) {
      const issuedAt = new Date();
      const validUntil = new Date();
      validUntil.setFullYear(validUntil.getFullYear() + 2);
      tab.getRange(index + 1, 11).setValue('verified');
      tab.getRange(index + 1, 14).setValue(issuedAt.toISOString().slice(0, 10));
      tab.getRange(index + 1, 15).setValue(validUntil.toISOString().slice(0, 10));
      return objectFromRow(rows[0], tab.getRange(index + 1, 1, 1, tab.getLastColumn()).getValues()[0]);
    }
  }
  throw new Error('Profile not found.');
}

function assertAdmin(pin) {
  const expected = PropertiesService.getScriptProperties().getProperty(ADMIN_PIN_PROPERTY);
  if (!expected || pin !== expected) throw new Error('Invalid admin PIN.');
}

function getOrCreateSheet(spreadsheet, name, headers) {
  let tab = spreadsheet.getSheetByName(name);
  if (!tab) tab = spreadsheet.insertSheet(name);
  if (headers.length && tab.getLastRow() === 0) tab.appendRow(headers);
  return tab;
}

function objectFromRow(headers, row) {
  return headers.reduce((record, header, index) => {
    record[header] = row[index];
    return record;
  }, {});
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

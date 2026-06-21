'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import {
  CDQSApplication,
  CertificatePayload,
  cdqsOffer,
  competencyAreas,
  makeId,
  toCsv,
} from '@/lib/cdqs';
import {
  StoredCertificate,
  cdqsStorageState,
  createCertificate,
  loadApplications,
  saveApplication,
  verifyCertificate,
} from '@/lib/cdqsStore';
import { acceptApplication } from '@/lib/registryStore';

function money(value: number) {
  return `AED ${value.toLocaleString('en-AE')}`;
}

export function StorageStatus({ className = '' }: { className?: string }) {
  const storage = cdqsStorageState();

  return (
    <div className={`storage-status ${storage.mode} ${className}`}>
      <span>{storage.label}</span>
      {!storage.ready && <b>Test Mode</b>}
    </div>
  );
}

export function ProductionReadinessBanner() {
  const storage = cdqsStorageState();
  if (storage.ready) return null;

  return <div className="readiness-banner">Persistence not configured - do not launch publicly.</div>;
}

export function SetupChecklist() {
  const storage = cdqsStorageState();
  const checks = [
    ['Supabase env vars configured', storage.mode === 'supabase'],
    ['SQL migration applied', false],
    ['Test application submitted', false],
    ['Test certificate verified from incognito', false],
    ['Admin PIN changed', false],
  ];

  return (
    <div className="setup-checklist">
      <span>Production Setup Checklist</span>
      {checks.map(([label, done]) => (
        <div key={String(label)}>
          <b>{done ? 'Done' : 'Pending'}</b>
          <p>{label}</p>
        </div>
      ))}
    </div>
  );
}

export function LandingPage() {
  return (
    <main className="cdqs-page">
      <section className="cdqs-hero">
        <div>
          <p className="kicker">CDQS Cohort 001</p>
          <h1>Professional Digital QS Verification for UAE construction talent.</h1>
          <p>
            A focused sales and credentialing portal for the first 10 students. No LMS, no
            marketplace, no clutter. Just application, payment tracking, competency evidence,
            certificate generation and employer verification.
          </p>
          <div className="actions">
            <Link className="btn brass" href="/cdqs/apply">
              Apply for Cohort 001
            </Link>
            <Link className="btn" href="/cdqs/verify">
              Verify Certificate
            </Link>
          </div>
        </div>
        <aside className="cdqs-revenue-card">
          <span>Revenue Target</span>
          <strong>{money(cdqsOffer.targetRevenue)}</strong>
          <p>{cdqsOffer.targetSeats} students x {money(cdqsOffer.seatPrice)}</p>
          <ul>
            <li>LinkedIn-led acquisition</li>
            <li>Manual payment confirmation</li>
            <li>QR certificate verification</li>
            <li>Employer-ready portfolio page</li>
          </ul>
        </aside>
      </section>

      <section className="cdqs-section">
        <div className="compact-heading">
          <p className="kicker">Offer</p>
          <h2>{cdqsOffer.title}</h2>
        </div>
        <div className="cdqs-grid three">
          <article>
            <span>01</span>
            <h3>Application</h3>
            <p>Capture qualified QS, Civil and BIM applicants without a course catalog.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Sales Tracking</h3>
            <p>Track lead status, payment stage, revenue and onboarding for 10 seats.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Verification</h3>
            <p>Issue QR certificates and public employer verification pages.</p>
          </article>
        </div>
      </section>

      <section className="cdqs-section surface">
        <div className="compact-heading">
          <p className="kicker">Competence Proof</p>
          <h2>What employers should see.</h2>
        </div>
        <div className="cdqs-checklist">
          {competencyAreas.map((area) => (
            <div key={area}>
              <b>Verified</b>
              <span>{area}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const storage = cdqsStorageState();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const row: CDQSApplication = {
      id: makeId('CDQS-LEAD'),
      createdAt: new Date().toISOString().slice(0, 10),
      fullName: String(form.get('fullName') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      role: String(form.get('role') || ''),
      company: String(form.get('company') || ''),
      yearsExperience: String(form.get('yearsExperience') || ''),
      city: String(form.get('city') || ''),
      goal: String(form.get('goal') || ''),
      paymentPreference: String(form.get('paymentPreference') || ''),
      status: 'new',
      revenueAed: 0,
    };

    try {
      await saveApplication(row);
      setSubmitted(true);
      event.currentTarget.reset();
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Application could not be saved.');
    }
  }

  return (
    <main className="cdqs-page">
      <section className="cdqs-form-shell">
        <div>
          <p className="kicker">Application Form</p>
          <h1>Apply for CDQS Cohort 001.</h1>
          <p>
            This intake is saved to shared persistent storage so CDQS applicants are visible
            across devices for admin review.
          </p>
          {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
          {!storage.ready && <ProductionReadinessBanner />}
        </div>
        <form className="cdqs-form" onSubmit={submit}>
          <label>Full name<input required name="fullName" /></label>
          <label>Email<input required name="email" type="email" /></label>
          <label>Phone / WhatsApp<input required name="phone" /></label>
          <label>Current role<input name="role" placeholder="QS, Civil Engineer, BIM Professional" /></label>
          <label>Company<input name="company" /></label>
          <label>Years of experience<select name="yearsExperience"><option>0-2</option><option>3-5</option><option>6-10</option><option>10+</option></select></label>
          <label>UAE city<select name="city"><option>Dubai</option><option>Abu Dhabi</option><option>Sharjah</option><option>Ajman</option><option>Other UAE</option></select></label>
          <label>Main goal<textarea required name="goal" rows={4} placeholder="What do you want CDQS to help you prove?" /></label>
          <label>Payment preference<select name="paymentPreference"><option>Full payment</option><option>2 installments</option><option>Employer sponsored</option></select></label>
          <button className="btn brass" type="submit" disabled={!storage.ready}>Submit Application</button>
          {submitted && <p className="cdqs-success">Application saved to shared storage.</p>}
          {error && <p className="cdqs-error">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export function CRMDashboard() {
  const [rows, setRows] = useState<CDQSApplication[]>([]);
  const [adminPin, setAdminPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [handoff, setHandoff] = useState('');
  const storage = cdqsStorageState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPin = window.sessionStorage.getItem('cdqs_admin_pin') || '';
      setAdminPin(savedPin);
      if (savedPin && storage.ready) {
        loadApplications(savedPin)
          .then((data) => {
            setRows(data);
            setAuthorized(true);
          })
          .catch(() => window.sessionStorage.removeItem('cdqs_admin_pin'));
      }
    }
  }, []);

  const paid = rows.filter((row) => row.status === 'paid' || row.status === 'onboarded' || row.status === 'certified');
  const revenue = rows.reduce((sum, row) => sum + Number(row.revenueAed || 0), 0);
  const gap = Math.max(cdqsOffer.targetRevenue - revenue, 0);

  function downloadCsv() {
    const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cdqs-crm-sheet.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    try {
      const data = await loadApplications(adminPin);
      setRows(data);
      setAuthorized(true);
      window.sessionStorage.setItem('cdqs_admin_pin', adminPin);
    } catch (exception) {
      setAuthorized(false);
      setRows([]);
      setError(exception instanceof Error ? exception.message : 'Admin access failed.');
    }
  }

  async function createRegistryProfile(row: CDQSApplication) {
    setError('');
    setHandoff('');
    if (!storage.ready) {
      setError('Persistent storage is not configured. Admin actions are blocked.');
      return;
    }
    try {
      const profile = await acceptApplication({ ...row, revenueAed: row.revenueAed || cdqsOffer.seatPrice }, adminPin);
      setHandoff(
        `Registry profile created: ${profile.registrationNumber}. Student portal: /registry/portal/?token=${profile.profileToken}`,
      );
      const refreshed = await loadApplications(adminPin);
      setRows(refreshed);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Could not create registry profile.');
    }
  }

  return (
    <main className="cdqs-page">
      <section className="cdqs-dashboard">
        <StorageStatus />
        <ProductionReadinessBanner />
        <div className="compact-heading">
          <p className="kicker">CRM Sheet + Student Tracking</p>
          <h1>CDQS sales control room.</h1>
        </div>
        {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
        <SetupChecklist />
        {storage.ready && !authorized && (
          <form className="cdqs-admin-gate" onSubmit={unlock}>
            <label>Admin PIN<input value={adminPin} onChange={(event) => setAdminPin(event.target.value)} type="password" /></label>
            <button className="btn brass" type="submit">Unlock Dashboard</button>
            {error && <p className="cdqs-error">{error}</p>}
          </form>
        )}
        {authorized && (
          <>
        <div className="cdqs-metrics">
          <article><span>Leads</span><strong>{rows.length}</strong></article>
          <article><span>Paid Students</span><strong>{paid.length}/10</strong></article>
          <article><span>Revenue</span><strong>{money(revenue)}</strong></article>
          <article><span>Gap</span><strong>{money(gap)}</strong></article>
        </div>
        <div className="actions">
          <button className="btn brass" onClick={downloadCsv}>Download CRM CSV</button>
          <Link className="btn" href="/cdqs/certificates">Generate Certificate</Link>
        </div>
        {handoff && <p className="cdqs-success">{handoff}</p>}
        {error && <p className="cdqs-error">{error}</p>}
        <div className="cdqs-table-wrap">
          <table className="cdqs-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Revenue</th>
                <th>Next Action</th>
                <th>Registry</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.fullName}<small>{row.email}</small></td>
                  <td>{row.role}</td>
                  <td>{row.phone}</td>
                  <td>{row.status.replace(/_/g, ' ')}</td>
                  <td>{money(row.revenueAed)}</td>
                  <td>{row.status === 'new' ? 'Qualify by DM/call' : row.status === 'payment_pending' ? 'Send payment link' : 'Onboard / certify'}</td>
                  <td><button className="text-button" onClick={() => createRegistryProfile(row)}>Accept + create profile</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </>
        )}
      </section>
    </main>
  );
}

export function CertificateGenerator() {
  const [payload, setPayload] = useState<CertificatePayload>({
    certificateNumber: 'CDQS-001-0001',
    studentName: '',
    role: 'Quantity Surveyor',
    cohort: cdqsOffer.cohort,
    issueDate: new Date().toISOString().slice(0, 10),
    verifier: 'Threshold Technologies',
  });
  const [adminPin, setAdminPin] = useState('');
  const [certificate, setCertificate] = useState<StoredCertificate | null>(null);
  const [error, setError] = useState('');
  const storage = cdqsStorageState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAdminPin(window.sessionStorage.getItem('cdqs_admin_pin') || '');
    }
  }, []);

  const verificationUrl =
    typeof window === 'undefined' || !certificate
      ? ''
      : `${window.location.origin}/cdqs/verify/?token=${certificate.verificationToken}`;
  const qrUrl = verificationUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(verificationUrl)}`
    : '';

  function update(field: keyof CertificatePayload, value: string) {
    setPayload((current) => ({ ...current, [field]: value }));
  }

  async function issueCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!storage.ready) {
      setError('Persistent storage is not configured. Admin actions are blocked.');
      return;
    }
    try {
      const stored = await createCertificate(payload, adminPin);
      setCertificate(stored);
      window.sessionStorage.setItem('cdqs_admin_pin', adminPin);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Certificate could not be saved.');
    }
  }

  return (
    <main className="cdqs-page">
      <section className="cdqs-form-shell certificate-shell">
        <div>
          <StorageStatus />
          <ProductionReadinessBanner />
          <p className="kicker">QR Certificate Generator</p>
          <h1>Issue a verifiable CDQS certificate.</h1>
          <p>Generate and persist a certificate record after payment and competency approval.</p>
          {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
          <div className="cdqs-certificate">
            <p>Certificate of Completion</p>
            <h2>{payload.studentName || 'Student Name'}</h2>
            <span>{payload.cohort}</span>
            <b>{payload.certificateNumber}</b>
            {qrUrl && <img src={qrUrl} alt="Certificate QR code" />}
          </div>
        </div>
        <form className="cdqs-form" onSubmit={issueCertificate}>
          <label>Admin PIN<input value={adminPin} onChange={(event) => setAdminPin(event.target.value)} type="password" /></label>
          <label>Student name<input value={payload.studentName} onChange={(event) => update('studentName', event.target.value)} /></label>
          <label>Role<input value={payload.role} onChange={(event) => update('role', event.target.value)} /></label>
          <label>Certificate number<input value={payload.certificateNumber} onChange={(event) => update('certificateNumber', event.target.value)} /></label>
          <label>Issue date<input type="date" value={payload.issueDate} onChange={(event) => update('issueDate', event.target.value)} /></label>
          <label>Verifier<input value={payload.verifier} onChange={(event) => update('verifier', event.target.value)} /></label>
          <label>Verification URL<textarea readOnly rows={4} value={verificationUrl} /></label>
          <button className="btn brass" type="submit" disabled={!storage.ready}>Save Certificate Record</button>
          {certificate && <Link className="btn" href={verificationUrl}>Open Verification Page</Link>}
          {error && <p className="cdqs-error">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export function VerificationPage() {
  const [token, setToken] = useState('');
  const [certificate, setCertificate] = useState<StoredCertificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const storage = cdqsStorageState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentToken = new URLSearchParams(window.location.search).get('token') || '';
      setToken(currentToken);
      if (currentToken && storage.ready) {
        setLoading(true);
        verifyCertificate(currentToken)
          .then((data) => {
            setCertificate(data);
            setError(data ? '' : 'No certificate record was found for this token.');
          })
          .catch((exception) => setError(exception instanceof Error ? exception.message : 'Verification failed.'))
          .finally(() => setLoading(false));
      }
    }
  }, []);

  async function verifyCurrentToken() {
    setLoading(true);
    setError('');
    try {
      const data = await verifyCertificate(token);
      setCertificate(data);
      if (!data) setError('No certificate record was found for this token.');
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Verification failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="cdqs-page">
      <section className="cdqs-verify">
        <p className="kicker">Employer Verification</p>
        <h1>{certificate ? 'Certificate verified.' : 'Verify a CDQS credential.'}</h1>
        {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
        {certificate ? (
          <div className="cdqs-verification-card">
            <span className="valid-badge">{certificate.status === 'active' ? 'Valid Credential' : 'Revoked Credential'}</span>
            <h2>{certificate.studentName}</h2>
            <p>{certificate.role}</p>
            <dl>
              <div><dt>Cohort</dt><dd>{certificate.cohort}</dd></div>
              <div><dt>Certificate</dt><dd>{certificate.certificateNumber}</dd></div>
              <div><dt>Issued</dt><dd>{certificate.issueDate}</dd></div>
              <div><dt>Verifier</dt><dd>{certificate.verifier}</dd></div>
            </dl>
            <h3>Verified Competency Evidence</h3>
            <ul>
              {competencyAreas.map((area) => <li key={area}>{area}</li>)}
            </ul>
          </div>
        ) : (
          <div className="cdqs-verification-card">
            <p>Paste a verification token or open this page from a CDQS certificate QR code.</p>
            <input value={token} onChange={(event) => setToken(event.target.value)} placeholder="Verification token" />
            <button className="btn brass" onClick={verifyCurrentToken} disabled={!storage.ready || loading}>
              {loading ? 'Checking...' : 'Verify Certificate'}
            </button>
            {error && <p className="cdqs-error">{error}</p>}
          </div>
        )}
      </section>
    </main>
  );
}

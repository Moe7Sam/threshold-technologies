# CDQS Temporary Google Sheets Storage

Use this only when Supabase is not ready. Supabase remains the preferred persistent storage.

## 1. Create a Google Sheet

Create two tabs:

```text
Applications
Certificates
```

## 2. Create Apps Script

In the Sheet, open Extensions -> Apps Script and add a web app that responds to these actions:

```text
submitApplication
listApplications
createCertificate
verifyCertificate
acceptApplication
getRegistryProfile
submitRegistryEvidence
listRegistryProfiles
adminListEvidence
reviewEvidence
approveRegistryProfile
```

You can start from:

```text
docs/cdqs-google-apps-script.js
```

Set Script Property:

```text
CDQS_ADMIN_PIN=your-admin-pin
```

Expected request body:

```json
{
  "action": "submitApplication",
  "application": {}
}
```

Expected response:

```json
{
  "ok": true
}
```

For `listApplications`, return:

```json
{
  "ok": true,
  "applications": []
}
```

For `createCertificate`, return:

```json
{
  "ok": true,
  "certificate": {
    "id": "sheet-row-id",
    "certificateNumber": "CDQS-001-0001",
    "studentName": "Student Name",
    "role": "Quantity Surveyor",
    "cohort": "CDQS Cohort 001",
    "issueDate": "2026-07-31",
    "verifier": "Threshold Technologies",
    "verificationToken": "public-token",
    "status": "active"
  }
}
```

For `verifyCertificate`, return:

```json
{
  "ok": true,
  "certificate": null
}
```

or the certificate object above.

## 3. Add Environment Variable

```env
NEXT_PUBLIC_CDQS_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
```

The app will use Supabase first when Supabase env vars are present. If Supabase env vars are absent and this variable exists, it uses Google Sheets.

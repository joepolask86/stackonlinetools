export const metadata = {
  title: "Data Deletion Request | Stack Online Tools",
  description: "How to request deletion of your personal data from Stack Online Tools.",
};

export default function DataDeletionPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Data Deletion Request</h1>
      <p className="mt-4 text-gray-700">
        You can request deletion of your personal data associated with your account. This fulfills
        requirements under GDPR, CCPA, and platform policies (e.g., Facebook App Review).
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">How to Request Deletion</h2>
      <ol className="mt-3 list-decimal list-inside space-y-2 text-gray-700">
        <li>
          Send an email to <a className="text-blue-600 underline" href="mailto:support@stackonlinetools.com">support@stackonlinetools.com</a>
          
          from the email address linked to your account.
        </li>
        <li>
          Include the subject: <span className="font-medium">“Data Deletion Request”</span> and your account email.
        </li>
        <li>
          Optionally provide any additional identifiers used (e.g., provider user ID from Google/GitHub).
        </li>
      </ol>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">Automatic Request (API)</h2>
      <p className="mt-2 text-gray-700">
        Developers may POST a deletion request to our endpoint:
      </p>
      <pre className="mt-3 rounded-md bg-gray-100 p-4 text-sm overflow-x-auto">
{`POST https://stackonlinetools.com/api/data-deletion
Content-Type: application/json

{
  "email": "you@example.com",
  "provider": "google|github|twitter|facebook|email",
  "providerId": "optional-external-id"
}`}
      </pre>
      <p className="mt-3 text-gray-700">
        We verify ownership and process deletions within 30 days, subject to legal and security
        requirements. Certain records may be retained as permitted by law (e.g., fraud prevention).
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">What Gets Deleted</h2>
      <ul className="mt-3 list-disc list-inside space-y-2 text-gray-700">
        <li>Profile data (name, email, avatar URL).</li>
        <li>Authentication linkage to social providers.</li>
        <li>User-generated content, where possible, or anonymized if removal would break integrity.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-gray-900">Questions</h2>
      <p className="mt-2 text-gray-700">
        Contact us at <a className="text-blue-600 underline" href="mailto:support@stackonlinetools.com">support@stackonlinetools.com</a>.
      </p>
    </div>
  );
}



export default function PrivacyPage() {
  const sections = [
    {
      title: "What data we collect",
      body: `We collect data you provide directly:
• Contact forms: name, company, role, email, phone number
• Calculator: throughput, cost inputs, crude grade — no personally identifiable information required
• Chat widget: your messages and session identifier (randomly generated, not linked to your identity)
• Pilot and demo requests: all fields you complete in the forms

We collect limited technical data automatically:
• Browser type and version, operating system
• Pages visited and time on site (via server logs)
• IP address (used for security and approximate geolocation — not stored with your profile)`,
    },
    {
      title: "How we use your data",
      body: `• To respond to inquiries, schedule consultations, and manage pilot program communications
• To send you requested documents (white papers, data sheets)
• To improve the website and calculator accuracy
• Chat conversations may be used to improve AI response quality — we do not use chat data to identify you without your consent
• We do not sell, rent, or share your data with third parties for marketing purposes`,
    },
    {
      title: "Data storage and retention",
      body: `• Contact form submissions are stored in our CRM system
• Calculator results are stored anonymously unless you provide contact information
• Chat sessions are stored for up to 90 days for quality improvement, then deleted
• You can request deletion of your data at any time by contacting us`,
    },
    {
      title: "Third-party services",
      body: `• Hosting: Vercel (US) — subject to Vercel's privacy policy
• Database: Supabase (US) — subject to Supabase's privacy policy
• AI responses: Anthropic API (US) — chat messages are processed by Anthropic's models. We do not share your name or contact details with Anthropic
• Analytics: We do not use Google Analytics or similar tracking tools`,
    },
    {
      title: "Your rights",
      body: `You have the right to:
• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Object to processing for direct marketing purposes
• Data portability (receive your data in a machine-readable format)

To exercise any of these rights, contact us at the address below.`,
    },
    {
      title: "Cookies",
      body: `We use only essential session cookies required for the website to function (language preference, session identifier). We do not use advertising or tracking cookies. No consent banner is required for essential cookies under GDPR recital 47.`,
    },
    {
      title: "Contact",
      body: `For privacy-related questions, data requests, or complaints:
GFS — Global Fuel Solutions
Email: contact via the Contact page
This policy was last updated: April 2025`,
    },
  ];

  return (
    <div className="space-y-10 max-w-3xl">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50">Privacy Policy</h1>
        <p className="text-sm leading-relaxed text-slate-400">
          GFS respects your privacy. This policy explains what data we collect, how we use it,
          and your rights regarding it. We have written this in plain language — not legal boilerplate.
        </p>
      </section>

      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-sm font-semibold text-slate-100">{s.title}</h2>
            <div className="text-xs leading-relaxed text-slate-400 whitespace-pre-line">{s.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}

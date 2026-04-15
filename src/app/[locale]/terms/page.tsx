export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of terms",
      body: "By accessing or using the GFS EPM website (gfs-epm.com), you agree to these Terms of Use. If you do not agree, please do not use this site. These terms apply to all visitors, including prospective customers, investors, and technical reviewers.",
    },
    {
      title: "2. Nature of content",
      body: `The information on this website, including performance data, financial projections, and technical specifications, is provided for informational purposes only.

Performance data marked \"preliminary\" is based on initial laboratory and field testing and has not been independently verified. It does not constitute a warranty, guarantee, or representation of future results.

Financial figures (cost savings, ROI estimates) are illustrative models based on stated assumptions. Actual results will vary depending on crude grade, operating conditions, equipment, and other factors.`,
    },
    {
      title: "3. Calculator and tools",
      body: "The EPM ROI Calculator provides estimates based on your inputs and our economic model assumptions. Results are not a guarantee of commercial outcomes. GFS makes no warranty that calculator outputs are accurate for your specific operation. Always validate financial projections with your own engineering and finance teams.",
    },
    {
      title: "4. AI chat assistant",
      body: "The AI chat assistant on this site is powered by Anthropic's Claude AI and is provided for informational purposes. It is not a substitute for professional engineering, legal, or financial advice. Responses may contain errors or outdated information. Do not make commercial decisions based solely on chat assistant outputs.",
    },
    {
      title: "5. Intellectual property",
      body: "All content on this website — including text, data, graphics, the EPM product name, and technology descriptions — is the intellectual property of GFS or its licensors. You may not reproduce, distribute, or create derivative works from this content without express written permission.",
    },
    {
      title: "6. No commercial offer",
      body: "Nothing on this website constitutes an offer to sell, a solicitation, or a binding commercial agreement. All commercial terms are established through separate written contracts. The Pilot Request and Demo Request forms initiate a discussion process — they do not create a binding commitment by either party.",
    },
    {
      title: "7. Limitation of liability",
      body: "To the maximum extent permitted by applicable law, GFS shall not be liable for any indirect, incidental, special, or consequential damages arising from use of this website or reliance on any information provided herein. Our total liability to you for any claim arising from use of this site shall not exceed USD 100.",
    },
    {
      title: "8. Governing law",
      body: "These terms are governed by and construed in accordance with the laws of the jurisdiction in which GFS is incorporated. Any disputes shall be subject to the exclusive jurisdiction of the courts of that jurisdiction.",
    },
    {
      title: "9. Changes to these terms",
      body: "We may update these terms at any time. Changes take effect when posted on this page. Your continued use of the site after changes constitutes acceptance of the updated terms. Last updated: April 2025.",
    },
  ];

  return (
    <div className="space-y-10 max-w-3xl">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50">Terms of Use</h1>
        <p className="text-sm leading-relaxed text-slate-400">
          Please read these terms carefully. They govern your use of the GFS EPM website and
          all tools, calculators, and AI features provided on it.
        </p>
      </section>

      <div className="space-y-4">
        {sections.map((s) => (
          <section key={s.title} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-sm font-semibold text-slate-100">{s.title}</h2>
            <p className="text-xs leading-relaxed text-slate-400 whitespace-pre-line">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

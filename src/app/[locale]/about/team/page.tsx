export default function TeamPage() {
  const team = [
    {
      name: "GFS Founder / CEO",
      role: "Chief Executive Officer",
      bio: "Founded GFS with the goal of commercializing EPM chemistry for industrial-scale petroleum processing. Background in chemical engineering and petroleum industry operations spanning 15+ years across refinery, upstream, and marine sectors.",
      initials: "CEO",
    },
    {
      name: "Chief Technology Officer",
      role: "R&D & Formulation",
      bio: "Leads EPM formulation research, dosing optimization, and technical validation programs. Responsible for the proprietary chemistry behind EPM's five-function performance profile and pilot program technical oversight.",
      initials: "CTO",
    },
    {
      name: "VP Commercial",
      role: "Sales & Business Development",
      bio: "Manages refinery, marine, and upstream customer relationships. Focuses on qualifying pilot opportunities, structuring commercial agreements, and expanding the geographic footprint of EPM deployments.",
      initials: "VP",
    },
    {
      name: "Head of Operations",
      role: "Supply Chain & Logistics",
      bio: "Oversees EPM production, quality control, and delivery logistics. Ensures consistent product specification and availability for pilot and commercial customers across multiple geographies.",
      initials: "OPS",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">About</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Leadership Team
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
          GFS is a specialized additive technology company. Our team combines deep petroleum
          chemistry expertise with commercial experience in refinery, marine, and upstream operations.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        {team.map((member) => (
          <div
            key={member.initials}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex gap-4"
          >
            <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary font-semibold text-xs">
              {member.initials}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-100">{member.name}</p>
              <p className="text-xs font-medium text-secondary">{member.role}</p>
              <p className="text-xs leading-relaxed text-slate-400 pt-1">{member.bio}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-2">
        <h2 className="text-base font-semibold text-slate-100">Our approach</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          GFS operates as a lean, technically-focused organization. We do not sell on volume —
          we qualify partners, run rigorous pilots, and only move to commercial deployment when
          we can demonstrate measurable value in your specific operating environment. Every
          engagement starts with your crude slate, your current additive stack, and your cost targets.
        </p>
      </section>
    </div>
  );
}

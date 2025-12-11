import React from 'react';

export default function Services() {
  const services = [
    {
      title: 'IT Helpdesk (L1, L2, L3)',
      items: [
        'Email & password resets',
        'PC, printer & network troubleshooting',
        'Wi-Fi & connectivity issues',
        'Microsoft 365 & Google Workspace support',
        'Software installation & updates'
      ]
    },
    {
      title: 'Managed IT Support',
      items: [
        'Endpoint monitoring',
        'Patch management',
        'Backup management',
        'Device onboarding/offboarding',
        'Cloud & SaaS support'
      ]
    },
    {
      title: 'AI-Enabled Service Desk',
      items: [
        'Automated ticket creation',
        'Instant responses for common issues',
        'Intelligent routing to technicians',
        'Live dashboards & reporting'
      ]
    },
    {
      title: 'Remote + Onsite Support',
      items: [
        'Remote assistance',
        'Onsite technician visits (per SLA)'
      ]
    }
  ];

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Our Core Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <article
            key={s.title}
            className="bg-white dark:bg-[#0f1011]/80 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col"
          >
            <h4 className="text-lg font-semibold mb-4">{s.title}</h4>

            <ul className="space-y-3 flex-1 text-sm">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 leading-snug">
                  
                  {/* Icon */}
                  <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full 
                    bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-inner text-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5"
                        stroke="white"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span className="leading-6">{i}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

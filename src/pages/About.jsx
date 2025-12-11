import React from 'react'

export default function About(){
  return (
    <section>
      <h2 className="text-2xl font-bold">Who We Are</h2>
      <p className="mt-4 text-gray-600"> iBanati Digital provides modern IT helpdesk and managed support services across South Africa. We use a hybrid support model: AI-powered automation for speed, with experienced technicians for complex issues. This gives clients cost efficiency, fast resolution times, and reliable SLAs.</p>
        
      <h3 className="text-2xl font-bold mt-6">Our Commitment</h3>
      <ul className="mt-3 list-disc list-inside text-gray-600 space-y-2">
        <li>Faster resolution through AI-assisted workflows</li>
        <li>Local-language support options</li>
        <li>POPIA and industry best practice compliance</li>
        <li>Clear SLAs and reporting</li>
        <li>Affordable packages for SMEs</li>
        <li>Subcontract-ready for large organisations</li>
      </ul>
    </section>
  )
}

// src/pages/Privacy.jsx
import React from "react";

export default function Privacy() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 text-gray-300 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>

      <p className="mb-4">
        iBanati Digital (“we”, “our”, or “us”) is committed to protecting your
        personal information and ensuring transparency in how we collect,
        process, store, and secure your data.  
        This Privacy Policy explains how we comply with the South African
        Protection of Personal Information Act (POPIA) and how your data is handled
        when you access our website or engage with our services.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Information We Collect</h2>
      <p className="mb-2">We may collect personal information in the following ways:</p>

      <ul className="list-disc ml-6 mb-4">
        <li><strong>Directly from you</strong> — when submitting contact forms, requesting quotes, or emailing us.</li>
        <li><strong>Automatically</strong> — through website analytics, cookies, or service usage logs.</li>
        <li><strong>During service delivery</strong> — from clients receiving IT support, technical assistance, or consulting.</li>
      </ul>

      <p className="mb-4">The types of data we may collect include:</p>

      <ul className="list-disc ml-6 mb-6">
        <li>Name and surname</li>
        <li>Email address and phone number</li>
        <li>Company or business details</li>
        <li>Technical information (IP address, device information, browser type)</li>
        <li>Service-related data shared for troubleshooting or support</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. How We Use Your Information</h2>
      <p className="mb-4">We use personal information for legitimate business purposes, including:</p>

      <ul className="list-disc ml-6 mb-6">
        <li>Responding to contact or quote requests</li>
        <li>Providing IT support, consulting, and managed service solutions</li>
        <li>Improving website functionality and user experience</li>
        <li>Internal analytics and service optimisation (AI-assisted where applicable)</li>
        <li>Sending updates, proposals, or service-related communication</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. POPIA Compliance</h2>
      <p className="mb-4">
        We comply with all requirements outlined in the Protection of Personal
        Information Act (POPIA). This includes:
      </p>

      <ul className="list-disc ml-6 mb-6">
        <li>Collecting only the information necessary for service delivery</li>
        <li>Ensuring personal data is processed lawfully and transparently</li>
        <li>Securing all personal information against loss or unauthorised access</li>
        <li>Using data only for the purpose for which it was collected</li>
        <li>Allowing users to request access, updates, or deletion of their information</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Cookies & Website Analytics</h2>
      <p className="mb-4">Our website may use cookies or traffic analysis tools to:</p>

      <ul className="list-disc ml-6 mb-6">
        <li>Improve performance and loading speeds</li>
        <li>Understand user behaviour and website usage trends</li>
        <li>Enhance security and detect anomalies</li>
      </ul>

      <p className="mb-4">
        You may disable cookies in your browser settings. Some site features may not
        function correctly without cookies.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Information Sharing</h2>
      <p className="mb-4">
        We do <strong>not sell</strong> or share personal data with unauthorised third parties.
        Information may be shared only with:
      </p>

      <ul className="list-disc ml-6 mb-6">
        <li>Service providers under confidentiality agreements (e.g., hosting, email systems)</li>
        <li>Technicians or trusted suppliers involved in delivering your service</li>
        <li>Regulatory authorities where legally required</li>
      </ul>

      <p className="mb-4">
        All partners who handle client data must meet acceptable security and compliance standards.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">6. Data Security</h2>
      <p className="mb-4">
        We implement reasonable technical and organisational safeguards to protect
        personal information, including:
      </p>

      <ul className="list-disc ml-6 mb-6">
        <li>Restricted access to information</li>
        <li>Encrypted communication channels where applicable</li>
        <li>Secure storage and controlled deletion processes</li>
        <li>Internal policies for data handling, support logs, and backups</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">7. Your Rights Under POPIA</h2>
      <p className="mb-4">
        As a user, you have the right to request the following at any time:
      </p>

      <ul className="list-disc ml-6 mb-6">
        <li>Access to the personal information we hold about you</li>
        <li>Correction or updating of inaccurate information</li>
        <li>Deletion of your data where applicable</li>
        <li>Withdrawal of consent for optional processing activities</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">8. Retention of Personal Information</h2>
      <p className="mb-6">
        We retain information only for as long as necessary for operational,
        regulatory, or legal requirements. After this, data is securely destroyed.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">9. Changes to This Privacy Policy</h2>
      <p className="mb-6">
        We may update this Policy occasionally. The updated version will always be
        posted on this page with a revised effective date. Continued use of our
        website implies acceptance of any changes.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3">10. Contact Information</h2>
      <p className="mb-4">
        For privacy-related enquiries, POPIA requests, or clarification, contact us:  
        <br />
        <strong>Email:</strong> info@ibanatidigital.co.za  
        <br />
        <strong>Location:</strong> South Africa  
      </p>
    </section>
  );
}

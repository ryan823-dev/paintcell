import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | TDPaintCell</title>
        <meta name="description" content="Privacy Policy for TDPaintCell - how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="container-wide py-16 md:py-24">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: 2026-01-01</p>

          <h2>Overview</h2>
          <p>
            TDPaintCell ("we", "us", "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect personal information when you visit tdpaintcell.com (the "Site") or contact us for an engineering-led project assessment.
          </p>

          <h2>Information we collect</h2>
          <p>We may collect the following categories of information:</p>
          <ul>
            <li>Contact information you provide, such as your name, company, email address, phone number, and job role.</li>
            <li>Project-related information you submit through forms or consultations, such as part descriptions, photos, CAD links, throughput targets, and site constraints.</li>
            <li>Technical information collected automatically, such as device type, browser type, IP address, pages viewed, and approximate location derived from IP.</li>
            <li>Cookies and similar technologies, as described in our Cookie Policy.</li>
          </ul>

          <h2>How we use information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Respond to inquiries and provide engineering review or project consultation</li>
            <li>Evaluate feasibility and prepare a project-specific assessment or proposal</li>
            <li>Improve the Site, its content, and user experience</li>
            <li>Protect the Site from fraud, abuse, and security risks</li>
            <li>Comply with legal obligations where applicable</li>
          </ul>

          <h2>Legal bases (where applicable)</h2>
          <p>
            Depending on your location, we may process information based on one or more of the following legal bases: your consent, performance of a contract or steps prior to entering a contract, legitimate interests (such as responding to business inquiries and improving our services), and legal compliance.
          </p>

          <h2>Sharing of information</h2>
          <p>We do not sell your personal information. We may share information only when necessary:</p>
          <ul>
            <li>Service providers (e.g., website hosting, analytics, email delivery) who process data on our behalf under appropriate safeguards</li>
            <li>Professional advisors (legal, accounting) where required</li>
            <li>Authorities if required by law or to protect rights and safety</li>
          </ul>

          <h2>International transfers</h2>
          <p>
            Your information may be processed in countries other than your own. Where required, we use appropriate safeguards for cross-border transfers.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain personal information only as long as necessary for the purposes described in this policy, including responding to inquiries, maintaining business records, and meeting legal requirements.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational measures designed to protect information. However, no method of transmission or storage is completely secure.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights such as access, correction, deletion, objection, restriction, and data portability. You may also withdraw consent where processing is based on consent.
          </p>
          <p>
            To exercise rights, contact: <a href="mailto:engineering@tdpaintcell.com">engineering@tdpaintcell.com</a>.
          </p>

          <h2>Children's privacy</h2>
          <p>
            The Site is intended for business users and is not directed to children.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The "Last updated" date will reflect the latest version.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy requests and questions, contact: <a href="mailto:engineering@tdpaintcell.com">engineering@tdpaintcell.com</a>.
          </p>
        </article>
      </div>
    </>
  );
}

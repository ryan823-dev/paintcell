import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Use | TDPaintCell</title>
        <meta name="description" content="Terms of Use for TDPaintCell website and services." />
      </Helmet>
      
      <div className="container-wide py-16 md:py-24">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h1>Terms of Use</h1>
          <p className="text-muted-foreground">Last updated: 2026-01-01</p>

          <h2>Acceptance of terms</h2>
          <p>
            By accessing or using tdpaintcell.com (the "Site"), you agree to these Terms of Use. If you do not agree, do not use the Site.
          </p>

          <h2>Site purpose</h2>
          <p>
            The Site provides information about robotic spray painting paint cells and offers engineering-led project assessment tools and consultation. Content is provided for general informational purposes and does not constitute engineering advice for your specific site unless explicitly agreed in writing.
          </p>

          <h2>No instant pricing</h2>
          <p>
            Any assessment tools, checklists, or consultations are intended to collect requirements and support preliminary engineering review. The Site does not provide instant or binding pricing.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on the Site, including text, graphics, logos, and designs, is owned by TDPaintCell or its licensors and is protected by applicable intellectual property laws. You may not copy, modify, distribute, or create derivative works without prior written permission, except for normal browsing and internal evaluation.
          </p>

          <h2>User submissions</h2>
          <p>
            If you submit information (including files, links, photos, CAD references, or project requirements), you represent that you have the right to share it. You grant us a limited right to use submitted information solely to evaluate your inquiry, provide responses, and prepare project assessment materials.
          </p>

          <h2>Third-party links</h2>
          <p>
            The Site may contain links to third-party websites. We are not responsible for third-party content, policies, or practices.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The Site is provided on an "as is" and "as available" basis. We do not warrant that the Site will be uninterrupted or error-free. Any statements regarding performance or results depend on part geometry, production volume, paint characteristics, and site constraints, and must be validated.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, TDPaintCell will not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Site.
          </p>

          <h2>Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless TDPaintCell from claims arising out of your misuse of the Site or violation of these Terms.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by applicable laws where TDPaintCell operates, without regard to conflict-of-law principles. Any disputes will be handled in a competent jurisdiction.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these Terms from time to time. The "Last updated" date will reflect the latest version.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms: <a href="mailto:engineering@tdpaintcell.com">engineering@tdpaintcell.com</a>.
          </p>
        </article>
      </div>
    </>
  );
}

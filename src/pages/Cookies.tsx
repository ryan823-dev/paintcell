import { Helmet } from "react-helmet-async";

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | TDPaintCell</title>
        <meta name="description" content="Cookie Policy for TDPaintCell - how we use cookies and similar technologies." />
      </Helmet>
      
      <div className="container-wide py-16 md:py-24">
        <article className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h1>Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: 2026-01-01</p>

          <h2>What are cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help the site function, improve performance, and provide analytics.
          </p>

          <h2>How we use cookies</h2>
          <p>We may use cookies and similar technologies to:</p>
          <ul>
            <li>Enable core site functionality</li>
            <li>Remember preferences (where applicable)</li>
            <li>Measure site usage and improve content and navigation</li>
            <li>Protect the site from abuse and security threats</li>
          </ul>

          <h2>Types of cookies</h2>
          <ul>
            <li><strong>Strictly necessary cookies:</strong> required for the site to operate.</li>
            <li><strong>Analytics cookies:</strong> help us understand how visitors use the site (aggregated statistics).</li>
            <li><strong>Preference cookies:</strong> remember settings you choose (if implemented).</li>
          </ul>

          <h2>Managing cookies</h2>
          <p>
            You can manage or delete cookies through your browser settings. Blocking some cookies may affect site functionality.
          </p>

          <h2>Updates</h2>
          <p>
            We may update this Cookie Policy as our site functionality changes. The "Last updated" date will reflect the latest version.
          </p>

          <h2>Contact</h2>
          <p>
            For questions: <a href="mailto:engineering@tdpaintcell.com">engineering@tdpaintcell.com</a>.
          </p>
        </article>
      </div>
    </>
  );
}

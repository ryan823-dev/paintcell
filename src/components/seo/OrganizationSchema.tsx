import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/seo";
import { companyProfile } from "@/lib/siteTrust";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: companyProfile.brandName,
  legalName: companyProfile.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/td-logo.png`,
  image: `${SITE_URL}/images/og-social-share.png`,
  foundingDate: String(companyProfile.foundedYear),
  email: companyProfile.primaryEmail,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${companyProfile.headquarters.streetAddress}, ${companyProfile.headquarters.district}`,
    addressLocality: companyProfile.headquarters.city,
    addressCountry: companyProfile.headquarters.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: companyProfile.primaryEmail,
    availableLanguage: ["en"],
  },
};

export function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </Helmet>
  );
}

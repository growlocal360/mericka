import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Terms of Use | Mericka Group",
  description: "The terms that govern your use of the Mericka Group website.",
};

// Update this whenever the terms change.
const LAST_UPDATED = "August 3, 2026";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-brand-900 mt-12 mb-4">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-brand-600 leading-relaxed mb-4">{children}</p>;
}
function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-brand-600 mb-4">{children}</ul>;
}

export default function TermsPage() {
  return (
    <article className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-brand-900 mb-3">Terms of Use</h1>
      <p className="text-sm text-brand-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <P>
        These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
        <span className="whitespace-nowrap">merickagroup.com</span> (the &ldquo;Site&rdquo;),
        operated by {brand.name} LLC (&ldquo;{brand.name},&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Site, you agree
        to be bound by these Terms and by our{" "}
        <Link href="/privacy" className="text-brand-accent underline hover:text-brand-highlight">
          Privacy Policy
        </Link>
        . If you do not agree, please do not use the Site.
      </P>

      <H2>Use of the Site</H2>
      <P>
        You may use the Site for lawful, informational, and business purposes only. You
        agree not to:
      </P>
      <UL>
        <li>Use the Site in any way that violates applicable law or regulation;</li>
        <li>Attempt to gain unauthorized access to the Site, its servers, or any connected systems or networks;</li>
        <li>Interfere with or disrupt the operation, security, or availability of the Site;</li>
        <li>Introduce viruses, malware, or other harmful code;</li>
        <li>Use automated means to scrape, harvest, or collect data from the Site without our prior written consent; or</li>
        <li>Use the Site to transmit unsolicited advertising, spam, or fraudulent or misleading content.</li>
      </UL>

      <H2>Intellectual Property</H2>
      <P>
        The Site and its content — including text, graphics, logos, images, page layouts,
        and the {brand.name} name and marks — are owned by {brand.name} or its licensors
        and are protected by intellectual property laws. You may view and print pages for
        your own informational, non-commercial use, but you may not otherwise copy,
        reproduce, distribute, modify, or create derivative works from the Site without our
        prior written permission. All rights not expressly granted are reserved.
      </P>

      <H2>Submissions</H2>
      <P>
        Any information you submit through the Site — such as a contact or proposal
        request, chat message, or job application — is handled as described in our{" "}
        <Link href="/privacy" className="text-brand-accent underline hover:text-brand-highlight">
          Privacy Policy
        </Link>
        . Please do not submit confidential or proprietary information through the Site
        that you do not wish to share with us. By submitting content, you represent that it
        is accurate and that you have the right to provide it, and you grant us permission
        to use it as reasonably necessary to respond to and act on your request.
      </P>

      <H2>No Offer; Informational Only</H2>
      <P>
        Descriptions of our services, capabilities, sectors, and projects are provided for
        general informational purposes and do not constitute an offer, proposal, warranty,
        or guarantee of any particular result. Any services {brand.name} performs are
        governed solely by a separate written agreement between {brand.name} and the
        client. Nothing on the Site creates a contract, business relationship, or duty
        between you and {brand.name}.
      </P>

      <H2>Employment</H2>
      <P>
        Career listings and the ability to apply through the Site are provided for
        convenience. Submitting an application does not create an employment relationship or
        a promise of employment, and any offer of employment would be made in writing and
        subject to our standard hiring process.
      </P>

      <H2>Third-Party Links and Services</H2>
      <P>
        The Site may contain links to, or features provided by, third-party websites and
        services that we do not control, including embedded forms and live chat. We provide
        these for convenience and are not responsible for the content, products, or
        practices of any third party. Your use of third-party services is subject to their
        own terms and policies.
      </P>

      <H2>Disclaimer of Warranties</H2>
      <P>
        The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as
        available,&rdquo; without warranties of any kind, whether express or implied,
        including implied warranties of merchantability, fitness for a particular purpose,
        and non-infringement. We do not warrant that the Site will be uninterrupted,
        secure, error-free, or free of harmful components, or that the information on the
        Site is complete, accurate, or current.
      </P>

      <H2>Limitation of Liability</H2>
      <P>
        To the fullest extent permitted by law, {brand.name} and its officers, employees,
        and affiliates will not be liable for any indirect, incidental, special,
        consequential, or punitive damages, or any loss of profits, data, or goodwill,
        arising out of or related to your use of, or inability to use, the Site — even if
        we have been advised of the possibility of such damages.
      </P>

      <H2>Indemnification</H2>
      <P>
        You agree to indemnify and hold harmless {brand.name} and its officers, employees,
        and affiliates from any claims, liabilities, damages, and expenses (including
        reasonable attorneys&rsquo; fees) arising out of your use of the Site or your
        violation of these Terms.
      </P>

      <H2>Governing Law</H2>
      <P>
        These Terms are governed by the laws of the State of Texas, without regard to its
        conflict-of-laws rules. You agree that any dispute arising out of or relating to
        the Site or these Terms will be subject to the exclusive jurisdiction of the state
        and federal courts located in Texas.
      </P>

      <H2>Changes to These Terms</H2>
      <P>
        We may update these Terms from time to time. When we do, we will revise the
        &ldquo;Last updated&rdquo; date above. Your continued use of the Site after any
        change indicates your acceptance of the updated Terms.
      </P>

      <H2>Contact Us</H2>
      <P>If you have questions about these Terms, contact us at:</P>
      <address className="not-italic text-brand-600 leading-relaxed">
        <div className="font-semibold text-brand-800">{brand.name} LLC</div>
        {brand.hqLines.slice(1).map((line) => (
          <div key={line}>{line}</div>
        ))}
        <div className="mt-2">
          Phone:{" "}
          <a href={brand.phoneHref} className="text-brand-accent underline hover:text-brand-highlight">
            {brand.phone}
          </a>
        </div>
        <div>
          Email:{" "}
          <a href={brand.emailHref} className="text-brand-accent underline hover:text-brand-highlight">
            {brand.email}
          </a>
        </div>
      </address>
    </article>
  );
}

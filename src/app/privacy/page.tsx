import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Privacy Policy | Mericka Group",
  description:
    "How Mericka Group collects, uses, and protects the information you share through our website.",
};

// Update this whenever the policy changes.
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

export default function PrivacyPage() {
  return (
    <article className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-brand-900 mb-3">Privacy Policy</h1>
      <p className="text-sm text-brand-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <P>
        {brand.name} LLC (&ldquo;{brand.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
        or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains what
        information we collect through {" "}
        <span className="whitespace-nowrap">merickagroup.com</span> (the
        &ldquo;Site&rdquo;), how we use and share it, and the choices you have. By using
        the Site or submitting information to us, you agree to the practices described
        here.
      </P>
      <P>
        This policy applies to information collected through our Site and related sales,
        marketing, and recruiting activities. It does not apply to information we handle
        as part of performing contracted work at a client&rsquo;s facility, which is
        governed by our agreements with that client.
      </P>

      <H2>Information We Collect</H2>
      <P>
        <strong className="text-brand-800">Information you provide.</strong> When you
        contact us, request a proposal, apply for a job, subscribe to updates, or chat
        with us, you may provide information such as your name, company, job title, email
        address, phone number, project or facility details, resume or work history, and
        anything else you choose to include in your message.
      </P>
      <P>
        <strong className="text-brand-800">Information collected automatically.</strong>{" "}
        When you visit the Site, we and our service providers may automatically collect
        certain information, including your IP address, browser and device type, operating
        system, referring pages, the pages you view, and the dates and times of your
        visits. Some of this information is collected using cookies and similar
        technologies (see <em>Cookies and Tracking</em> below).
      </P>

      <H2>How We Use Your Information</H2>
      <P>We use the information we collect to:</P>
      <UL>
        <li>Respond to your inquiries, proposal requests, and messages;</li>
        <li>Evaluate and communicate with job applicants;</li>
        <li>Provide, operate, maintain, and improve the Site;</li>
        <li>Send you information, updates, and marketing communications you request or that relate to our services;</li>
        <li>Understand how the Site is used and measure the effectiveness of our marketing;</li>
        <li>Protect the security and integrity of the Site, and detect and prevent fraud or misuse; and</li>
        <li>Comply with legal obligations and enforce our terms and agreements.</li>
      </UL>

      <H2>How We Share Your Information</H2>
      <P>We do not sell your personal information. We may share it in the following ways:</P>
      <UL>
        <li>
          <strong className="text-brand-800">Service providers.</strong> With third-party
          vendors that help us operate the Site and our business — including website
          hosting, database, customer relationship management (CRM) and marketing
          automation, online form and live-chat, analytics, and email delivery providers —
          who process information on our behalf.
        </li>
        <li>
          <strong className="text-brand-800">Legal and safety.</strong> When we believe
          disclosure is necessary to comply with applicable law, regulation, legal
          process, or governmental request, or to protect the rights, property, or safety
          of {brand.name}, our clients, or others.
        </li>
        <li>
          <strong className="text-brand-800">Business transfers.</strong> In connection
          with a merger, acquisition, financing, reorganization, or sale of assets, in
          which case information may be transferred as part of that transaction.
        </li>
      </UL>

      <H2>Cookies and Tracking</H2>
      <P>
        The Site uses cookies and similar technologies to keep the Site functioning, to
        remember your preferences, and to understand how visitors interact with our
        content. Some cookies are set by third-party services we use, such as our chat and
        form providers. You can usually adjust your browser settings to refuse or delete
        cookies; however, some parts of the Site may not function properly if you do.
      </P>

      <H2>Third-Party Services and Links</H2>
      <P>
        The Site includes forms and a live-chat feature provided by third-party platforms.
        Information you submit through those tools is processed by the applicable provider
        in order to deliver your message to us, subject to that provider&rsquo;s own
        privacy terms. The Site may also link to third-party websites we do not control.
        We are not responsible for the privacy practices of those sites, and we encourage
        you to review their policies.
      </P>

      <H2>Data Retention</H2>
      <P>
        We retain personal information for as long as needed to fulfill the purposes
        described in this policy — including responding to your inquiry, maintaining
        business and recruiting records, and complying with our legal obligations — after
        which we take reasonable steps to delete or de-identify it.
      </P>

      <H2>Data Security</H2>
      <P>
        We use reasonable administrative, technical, and physical safeguards designed to
        protect the information we collect. However, no method of transmission over the
        internet or method of electronic storage is completely secure, and we cannot
        guarantee absolute security.
      </P>

      <H2>Your Choices and Rights</H2>
      <P>
        You may opt out of our marketing emails at any time by using the unsubscribe link
        in those messages. Depending on where you live, you may have additional rights
        regarding your personal information — such as the right to request access to,
        correction of, or deletion of the information we hold about you, and the right not
        to be discriminated against for exercising those rights. To make a request, contact
        us using the details below. We may need to verify your identity before responding.
      </P>

      <H2>Children&rsquo;s Privacy</H2>
      <P>
        The Site is intended for a business audience and is not directed to children under
        16. We do not knowingly collect personal information from children. If you believe
        a child has provided us with personal information, please contact us and we will
        take appropriate steps to delete it.
      </P>

      <H2>Changes to This Policy</H2>
      <P>
        We may update this Privacy Policy from time to time. When we do, we will revise the
        &ldquo;Last updated&rdquo; date above. Your continued use of the Site after any
        change indicates your acceptance of the updated policy.
      </P>

      <H2>Contact Us</H2>
      <P>
        If you have questions about this Privacy Policy or how we handle your information,
        contact us at:
      </P>
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

      <p className="mt-12 text-sm text-brand-500">
        Looking for something else?{" "}
        <Link href="/contact" className="text-brand-accent underline hover:text-brand-highlight">
          Get in touch
        </Link>
        .
      </p>
    </article>
  );
}

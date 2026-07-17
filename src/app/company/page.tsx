import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Users } from "lucide-react";
import { brand } from "@/lib/brand";
import { safeList } from "@/lib/supabase/safe";
import GetInTouchButton from "@/components/GetInTouchButton";

type TeamMember = {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  photo_url: string | null;
};

export const revalidate = 60;

export const metadata = { title: "Company | Mericka Group" };

export default async function CompanyPage() {
  const team = await safeList<TeamMember>((sb) =>
    sb.from("team_members")
      .select("id, name, title, bio, photo_url")
      .eq("published", true)
      .order("display_order", { ascending: true })
  );

  return (
    <article>
      <header className="relative h-[55vh] min-h-[420px] bg-brand-900 flex items-end overflow-hidden">
        <Image
          src="/images/mericka-group-employees.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/80 to-brand-900/40" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Company
          </span>
          <h1 className="mt-4 text-5xl sm:text-6xl font-bold text-white">About {brand.name}</h1>
        </div>
      </header>

      <div className="pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-16">
          <p className="text-lg text-brand-600 leading-relaxed">
            Mericka Group is a nationwide{" "}
            <Link href="/scaffolding" className="text-brand-accent underline hover:text-brand-highlight">
              scaffolding
            </Link>
            ,{" "}
            <Link href="/industrial-coatings" className="text-brand-accent underline hover:text-brand-highlight">
              painting
            </Link>
            ,{" "}
            <Link href="/insulation" className="text-brand-accent underline hover:text-brand-highlight">
              insulation
            </Link>
            , and{" "}
            <Link href="/fireproofing" className="text-brand-accent underline hover:text-brand-highlight">
              fireproofing
            </Link>{" "}
            contractor built to own the soft craft scope on large-scale
            industrial and energy projects. Headquartered in Humble, Texas, the firm
            serves refining, midstream, chemical, power generation, and advanced
            technology facilities across new construction, nested maintenance,
            turnarounds, and outages — pairing a multi-skilled craft workforce with
            disciplined cost management and data-driven reporting that brings clear
            accountability to a scope often left as the least-controlled line on a
            project budget.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: Shield, title: "Safety first", body: "TRIR and EMR best-in-class. Daily JSAs and active leadership in the field." },
            { icon: Award, title: "Quality work", body: "QA/QC across every discipline, with documentation that holds up to audit." },
            { icon: Users, title: "Trained crews", body: "Certified scaffolders, painters, and insulators with documented training records." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white border border-brand-100 rounded-2xl p-8">
              <Icon className="w-7 h-7 text-brand-accent mb-4" />
              <h2 className="text-xl font-bold text-brand-900 mb-2">{title}</h2>
              <p className="text-sm text-brand-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <section id="team">
          <header className="mb-12 max-w-3xl">
            <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
              Leadership
            </span>
            <h2 className="mt-3 text-4xl font-bold text-brand-900">Our team</h2>
          </header>

          {team.length === 0 ? (
            <p className="text-brand-600 italic">Team profiles coming soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((m) => (
                <div key={m.id} className="bg-white border border-brand-100 rounded-2xl overflow-hidden">
                  <div className="relative h-64 bg-brand-100">
                    {m.photo_url && (
                      <Image src={m.photo_url} alt={m.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-900">{m.name}</h3>
                    <p className="text-sm text-brand-accent mb-3">{m.title}</p>
                    {m.bio && <p className="text-sm text-brand-600 leading-relaxed">{m.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-24 text-center bg-brand-50 rounded-3xl py-16 px-6">
          <h2 className="text-3xl font-bold text-brand-900">Let&apos;s talk</h2>
          <p className="mt-4 text-brand-600 max-w-xl mx-auto">
            Whether you&apos;re scoping a new build or planning your next outage, we&apos;d like to hear about it.
          </p>
          <GetInTouchButton className="mt-6" />
        </section>
      </div>
    </div>
    </article>
  );
}

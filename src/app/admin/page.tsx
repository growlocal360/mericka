import Link from "next/link";
import { ArrowRight, Wrench, Layers, Factory, LayoutGrid, FolderGit2, Newspaper, Briefcase, Users, MapPin, Inbox } from "lucide-react";

const tiles = [
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/capabilities", label: "Capabilities", icon: Layers },
  { href: "/admin/sectors", label: "Sectors", icon: Factory },
  { href: "/admin/sector_services", label: "Sector Services", icon: LayoutGrid },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/news", label: "News & Blog", icon: Newspaper },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/locations", label: "Locations", icon: MapPin },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Dashboard</h1>
      <p className="mt-2 text-brand-600">Manage every content type on the public site.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white border border-brand-100 rounded-xl p-5 hover:border-brand-accent/50 hover:shadow-md transition-all"
          >
            <Icon className="w-6 h-6 text-brand-accent mb-3" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-brand-900">{label}</span>
              <ArrowRight className="w-4 h-4 text-brand-400 group-hover:text-brand-highlight transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

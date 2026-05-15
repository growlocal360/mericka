import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Wrench,
  Factory,
  FolderGit2,
  Newspaper,
  Briefcase,
  Users,
  MapPin,
  Inbox,
  LogOut,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { signOutAction } from "./actions";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/sectors", label: "Sectors", icon: Factory },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/news", label: "News & Blog", icon: Newspaper },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/locations", label: "Locations", icon: MapPin },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-brand-50">
      <aside className="w-64 bg-brand-950 text-brand-200 flex flex-col flex-shrink-0 sticky top-0 h-screen">
        <div className="p-5 border-b border-brand-800">
          <Image src={brand.logo} alt={brand.short} width={180} height={40} className="h-9 w-auto" />
          <p className="mt-2 text-xs uppercase tracking-wider text-brand-500">Admin</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-brand-900 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction} className="p-4 border-t border-brand-800">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

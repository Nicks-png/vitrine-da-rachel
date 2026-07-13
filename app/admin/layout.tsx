import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import AdminLogout from "@/components/admin/AdminLogout";
import Logo from "@/components/layout/Logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-56 bg-primary text-white flex flex-col shrink-0">
          <div className="p-5 border-b border-white/10">
            <Logo variant="dark" className="text-[0.65rem] px-2.5 py-1" />
            <p className="text-xs text-white/50 mt-2">Admin</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin/produtos"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Package size={17} />
              Produtos
            </Link>
            <Link
              href="/admin/pedidos"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ShoppingCart size={17} />
              Pedidos
            </Link>
          </nav>

          <div className="p-4 border-t border-white/10">
            <AdminLogout />
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white transition-colors mt-1"
            >
              <LayoutDashboard size={17} />
              Ver loja
            </Link>
          </div>
        </aside>

        <main className="flex-1 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}

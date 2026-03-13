import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  LogOut, 
  Home, 
  FileText, 
  BookOpen, 
  Scale,
  Menu,
  X,
  Info,
  Droplets,
  Factory,
  MessageSquareQuote,
  Settings,
  LayoutDashboard,
  Users,
  ImageIcon,
  Globe,
  Wrench,
  ShieldCheck,
  LayoutGrid,
  Images
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

// Navigation organized by section
const navSections = [
  {
    title: "概览 / Overview",
    items: [
      { href: "/console/dashboard", label: "仪表盘 / Dashboard", icon: LayoutDashboard },
      { href: "/console/leads", label: "询盘管理 / Leads", icon: Users },
    ],
  },
  {
    title: "页面内容 / Page Content",
    items: [
      { href: "/console/home", label: "首页 / Home", icon: Home },
      { href: "/console/home-banners", label: "首页轮播 / Banners", icon: Images },
      { href: "/console/why-cards", label: "为何选择 / Why Cards", icon: LayoutGrid },
      { href: "/console/about", label: "关于我们 / About", icon: Info },
      { href: "/console/paint-cells", label: "喷涂单元 / Paint Cells", icon: Droplets },
      { href: "/console/applications", label: "应用场景 / Applications", icon: Factory },
      { href: "/console/quote", label: "询价表单 / Quote", icon: MessageSquareQuote },
    ],
  },
  {
    title: "内容管理 / Content",
    items: [
      { href: "/console/case-studies", label: "案例研究 / Case Studies", icon: FileText },
      { href: "/console/resources", label: "资源库 / Resources", icon: BookOpen },
      { href: "/console/industry-pages", label: "行业页面 / Industries", icon: Globe },
      { href: "/console/solution-pages", label: "方案页面 / Solutions", icon: Wrench },
      { href: "/console/media", label: "媒体库 / Media", icon: ImageIcon },
    ],
  },
  {
    title: "系统设置 / System",
    items: [
      { href: "/console/settings", label: "全站设置 / Site Settings", icon: Settings },
      { href: "/console/users", label: "用户管理 / Users", icon: ShieldCheck },
      { href: "/console/policies", label: "法律条款 / Legal Pages", icon: Scale },
    ],
  },
];

export default function ConsoleLayout() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 检查 Supabase 会话
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/console");
        return;
      }
      setLoading(false);
    };
    checkSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/console");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/console");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const NavContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="p-4 space-y-6">
      {navSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname.startsWith(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-card">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link to="/console/home" className="font-semibold text-lg">
                PaintCell 管理后台
              </Link>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              退出 / Logout
            </Button>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 border-r bg-muted/30 min-h-[calc(100vh-3.5rem)] overflow-y-auto">
            <NavContent />
          </aside>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div 
                className="fixed inset-0 bg-black/50" 
                onClick={() => setMobileMenuOpen(false)} 
              />
              <aside className="fixed left-0 top-14 bottom-0 w-72 bg-background border-r overflow-y-auto">
                <NavContent onItemClick={() => setMobileMenuOpen(false)} />
              </aside>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

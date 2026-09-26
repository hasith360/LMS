'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, LayoutDashboard, Settings, LogOut, User, ShieldCheck, Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserRole(data.user.user_metadata?.role || 'student');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <span className="font-bold text-2xl tracking-wider">
          <span className="text-white">APEX</span>
          <span className="text-gold ml-1">LMS</span>
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="px-4 text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Main Menu</p>
        
        {userRole === 'student' && (
          <Link href="/dashboard/student" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <LayoutDashboard className="mr-3 h-4 w-4" />
            My Dashboard
          </Link>
        )}

        {userRole === 'teacher' && (
          <Link href="/dashboard/teacher" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <BookOpen className="mr-3 h-4 w-4" />
            Teacher Dashboard
          </Link>
        )}

        {userRole === 'admin' && (
          <Link href="/dashboard/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <ShieldCheck className="mr-3 h-4 w-4" />
            Admin Dashboard
          </Link>
        )}
        
        <div className="h-4"></div>
        
        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
          <User className="mr-3 h-5 w-5" />
          Profile
        </Link>
        <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-blue text-white hidden md:flex md:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="relative w-64 bg-blue text-white flex flex-col z-50 h-full shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-blue h-16 flex items-center px-4 justify-between shadow-sm z-30 relative">
          <span className="font-bold text-xl tracking-wider text-white">
            APEX<span className="text-gold ml-1">LMS</span>
          </span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 hover:bg-white/10 rounded-md transition-colors">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Top bar (Desktop) */}
        <header className="hidden md:flex h-16 bg-white border-b border-gray items-center justify-end px-8">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-blue text-right">
              <div>Alex Student</div>
              <div className="text-blue/60 text-xs">Student Account</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center text-blue font-bold">
              AS
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

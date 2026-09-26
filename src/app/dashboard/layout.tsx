import Link from 'next/link';
import { BookOpen, LayoutDashboard, Settings, LogOut, User } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue text-white hidden md:flex md:flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="font-bold text-2xl tracking-wider">
            <span className="text-white">APEX</span>
            <span className="text-gold ml-1">LMS</span>
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard/student" className="flex items-center px-4 py-3 text-sm font-medium rounded-md bg-white/10 text-gold transition-colors">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/courses" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <BookOpen className="mr-3 h-5 w-5" />
            My Courses
          </Link>
          <Link href="/profile" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <User className="mr-3 h-5 w-5" />
            Profile
          </Link>
          <Link href="/settings" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-blue h-16 flex items-center px-4 justify-between">
          <span className="font-bold text-xl tracking-wider text-white">
            APEX<span className="text-gold ml-1">LMS</span>
          </span>
          <button className="text-white p-2">
            <LayoutDashboard className="h-6 w-6" />
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

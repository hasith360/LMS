import { Users, BookOpen, ShieldCheck, UserCheck, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  // Mock Data
  const stats = [
    { label: 'Total Students', value: '1,245', icon: Users },
    { label: 'Pending Teachers', value: '4', icon: UserCheck },
    { label: 'Total Courses', value: '12', icon: BookOpen },
  ];

  const recentUsers = [
    { id: 1, name: 'Alex Student', email: 'alex@example.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Maria Rossi', email: 'maria@example.com', role: 'Teacher', status: 'Pending' },
    { id: 3, name: 'Hans Mueller', email: 'hans@example.com', role: 'Teacher', status: 'Active' },
    { id: 4, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Suspended' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue">Admin Dashboard</h1>
        <p className="text-blue/70 mt-2">Platform-wide overview and user management.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue text-white flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-gold" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue">{stat.value}</p>
              <p className="text-sm font-medium text-blue/70">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden mb-10">
        <div className="px-6 py-5 border-b border-gray flex justify-between items-center bg-gray/10">
          <h2 className="text-lg font-bold text-blue">Recent Users</h2>
          <button className="text-sm text-blue/70 hover:text-blue font-medium">View All Users</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray/5 border-b border-gray text-blue/70 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray/5 transition-colors">
                  <td className="p-4 font-bold text-blue">{user.name}</td>
                  <td className="p-4 text-blue/70 text-sm">{user.email}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      user.role === 'Teacher' ? 'bg-blue/10 text-blue' : 'bg-gold/20 text-gold'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    {user.status === 'Pending' && (
                      <button className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors" title="Approve">
                        <ShieldCheck className="h-4 w-4" />
                      </button>
                    )}
                    <button className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors" title="Suspend/Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

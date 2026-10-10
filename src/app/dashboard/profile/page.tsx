'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Shield, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        window.location.href = '/login';
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-8 text-blue font-bold">Loading profile...</div>;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold text-blue flex items-center">
          <User className="mr-3 h-8 w-8 text-gold" />
          My Profile
        </h1>
        <p className="text-blue/70 mt-2">View and manage your account details.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden">
        <div className="px-6 py-5 border-b border-gray bg-gray/10">
          <h2 className="text-lg font-bold text-blue">Personal Information</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-blue/10 flex items-center justify-center text-blue text-2xl font-bold border-2 border-gold">
                {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue">{user.user_metadata?.full_name || 'User'}</h3>
                <p className="text-sm text-blue/60 capitalize flex items-center gap-1 mt-1">
                  <Shield className="h-4 w-4 text-gold" />
                  {user.user_metadata?.role || 'Student'} Account
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray">
              <div>
                <label className="block text-sm font-medium text-blue/60 mb-1">Full Name</label>
                <div className="flex items-center bg-gray-50 px-4 py-3 rounded-md border border-gray">
                  <User className="h-5 w-5 text-blue/40 mr-3" />
                  <span className="text-blue font-medium">{user.user_metadata?.full_name || 'N/A'}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue/60 mb-1">Email Address</label>
                <div className="flex items-center bg-gray-50 px-4 py-3 rounded-md border border-gray">
                  <Mail className="h-5 w-5 text-blue/40 mr-3" />
                  <span className="text-blue font-medium">{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-full shrink-0">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Account Active</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your account is in good standing. You have access to all features associated with your {user.user_metadata?.role || 'student'} role.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

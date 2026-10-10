'use client';

import { useState } from 'react';
import { Settings, Bell, Lock, Globe } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold text-blue flex items-center">
          <Settings className="mr-3 h-8 w-8 text-gold" />
          Settings
        </h1>
        <p className="text-blue/70 mt-2">Manage your app preferences and settings.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden">
        <div className="px-6 py-5 border-b border-gray bg-gray/10">
          <h2 className="text-lg font-bold text-blue flex items-center">
            <Bell className="mr-2 h-5 w-5 text-gold" />
            Notifications
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-800">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates about courses and assignments.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium text-gray-800">Platform Updates</h3>
                <p className="text-sm text-gray-500">Receive news about new features and updates.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
              </label>
            </div>
            
            <div className="pt-4">
              <button type="submit" className="bg-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue/90 transition-colors">
                Save Preferences
              </button>
              {saved && <span className="ml-4 text-sm font-medium text-green-600">Preferences saved!</span>}
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden">
        <div className="px-6 py-5 border-b border-gray bg-gray/10">
          <h2 className="text-lg font-bold text-blue flex items-center">
            <Lock className="mr-2 h-5 w-5 text-gold" />
            Security & Privacy
          </h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            If you need to change your password or update security settings, please contact the administrator or use the password reset feature on the login page.
          </p>
          <button className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors text-sm">
            Request Password Reset
          </button>
        </div>
      </div>

    </div>
  );
}

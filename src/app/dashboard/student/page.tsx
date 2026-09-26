'use client';

import { useState, useEffect } from 'react';
import { BookOpen, PlayCircle, Clock, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchMyCourses(user.id);
      } else {
        window.location.href = '/login';
      }
    };
    init();
  }, []);

  const fetchMyCourses = async (userId: string) => {
    // Fetch enrollments, join with courses, and join courses with recordings
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id,
        enrolled_at,
        courses (
          id,
          title,
          language,
          level,
          recordings (
            id,
            title,
            video_url,
            session_date
          )
        )
      `)
      .eq('student_id', userId)
      .order('enrolled_at', { ascending: false });

    if (data) {
      setEnrollments(data);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-blue font-bold">Loading your courses...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
      
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-blue flex items-center">
          Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Student'}! 👋
        </h1>
        <p className="text-blue/70 mt-2">Ready to continue your language journey?</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray flex items-center gap-4">
          <div className="p-3 bg-blue rounded-full text-white">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue">{enrollments.length}</p>
            <p className="text-sm font-medium text-blue/60">Enrolled Courses</p>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div>
        <h2 className="text-xl font-bold text-blue mb-6">My Enrolled Courses</h2>
        
        {enrollments.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray text-center">
            <p className="text-blue/70 text-lg">You are not enrolled in any courses yet!</p>
            <p className="text-sm text-blue/50 mt-2">Please ask your Admin to assign you to a course.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.courses;
              const recordings = course.recordings || [];
              
              // Sort recordings by date (newest first)
              recordings.sort((a: any, b: any) => new Date(b.session_date).getTime() - new Date(a.session_date).getTime());

              return (
                <div key={enrollment.id} className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden flex flex-col">
                  {/* Course Header */}
                  <div className="p-6 border-b border-gray">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 rounded-lg bg-gray flex items-center justify-center text-xl font-bold text-blue">
                        {course.language?.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="px-3 py-1 bg-gold/20 text-gold-dark text-xs font-bold rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-blue">{course.title}</h3>
                    <p className="text-sm text-blue/60 mt-1">{recordings.length} total lessons available</p>
                  </div>

                  {/* Recordings List */}
                  <div className="bg-gray/5 flex-1 p-6">
                    <h4 className="text-sm font-bold text-blue uppercase tracking-wider mb-4">Recent Daily Recordings</h4>
                    
                    {recordings.length === 0 ? (
                      <p className="text-sm text-blue/60 italic">No recordings posted yet.</p>
                    ) : (
                      <ul className="space-y-3">
                        {recordings.slice(0, 5).map((rec: any) => (
                          <li key={rec.id} className="bg-white border border-gray rounded-lg p-3 hover:border-gold transition-colors group">
                            <a href={rec.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <PlayCircle className="h-8 w-8 text-gold mr-3 group-hover:scale-110 transition-transform" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-blue truncate">{rec.title}</p>
                                <p className="text-xs text-blue/60 mt-0.5">{new Date(rec.session_date).toLocaleDateString()}</p>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

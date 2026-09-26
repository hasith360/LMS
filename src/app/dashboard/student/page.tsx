'use client';

import { useState, useEffect } from 'react';
import { BookOpen, PlayCircle, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState<{title: string, url: string} | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (user.user_metadata?.role !== 'student') {
          window.location.href = `/dashboard/${user.user_metadata?.role || 'student'}`;
          return;
        }
        setUser(user);
        fetchMyCourses(user.id);
      } else {
        window.location.href = '/login';
      }
    };
    init();
  }, []);

  const fetchMyCourses = async (userId: string) => {
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

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
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
                          <li key={rec.id} className="bg-white border border-gray rounded-lg hover:border-gold transition-colors group">
                            <button 
                              onClick={() => setPlayingVideo({ title: rec.title, url: getYouTubeEmbedUrl(rec.video_url) })}
                              className="w-full text-left flex items-center p-3"
                            >
                              <PlayCircle className="h-8 w-8 text-gold mr-3 group-hover:scale-110 transition-transform shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-blue truncate">{rec.title}</p>
                                <p className="text-xs text-blue/60 mt-0.5">{new Date(rec.session_date).toLocaleDateString()}</p>
                              </div>
                            </button>
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

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-blue/90" onClick={() => setPlayingVideo(null)}></div>
          <div className="relative bg-[#14213D] w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#14213D]">
              <h3 className="text-white font-bold truncate pr-4">{playingVideo.title}</h3>
              <button 
                onClick={() => setPlayingVideo(null)} 
                className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black relative">
              <iframe 
                src={playingVideo.url} 
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { BookOpen, Users, PlayCircle, Plus, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Course State
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', language: '', level: 'Beginner' });

  // New Recording State
  const [recording, setRecording] = useState({ course_id: '', title: '', video_url: '', session_date: '' });
  const [recStatus, setRecStatus] = useState('');

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (user.user_metadata?.role !== 'teacher') {
          window.location.href = `/dashboard/${user.user_metadata?.role || 'student'}`;
          return;
        }
        setUser(user);
        fetchCourses(user.id);
      } else {
        // Not logged in (or email not verified)! Redirect to login.
        window.location.href = '/login';
      }
    };
    init();
  }, []);

  const fetchCourses = async (userId: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, recordings(count)')
      .eq('teacher_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) {
      setCourses(data);
      // Auto-select first course for the recording form if not set
      if (data.length > 0 && !recording.course_id) {
        setRecording(prev => ({ ...prev, course_id: data[0].id }));
      }
    }
    setLoading(false);
  };

  const [courseError, setCourseError] = useState('');

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setCourseError('');
    if (!user) return;
    
    const { data, error } = await supabase.from('courses').insert([
      {
        teacher_id: user.id,
        title: newCourse.title,
        language: newCourse.language,
        level: newCourse.level,
        status: 'Published'
      }
    ]).select();

    if (error) {
      setCourseError(error.message);
      return;
    }

    if (data) {
      fetchCourses(user.id);
      setShowNewCourse(false);
      setNewCourse({ title: '', language: '', level: 'Beginner' });
    }
  };

  const handleAddRecording = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecStatus('Publishing...');
    
    const { error } = await supabase.from('recordings').insert([
      {
        course_id: recording.course_id,
        title: recording.title,
        video_url: recording.video_url,
        session_date: recording.session_date
      }
    ]);

    if (error) {
      setRecStatus('Error saving recording.');
    } else {
      setRecStatus('Published successfully!');
      setRecording(prev => ({ ...prev, title: '', video_url: '', session_date: '' }));
      fetchCourses(user.id); // Refresh recording counts
      setTimeout(() => setRecStatus(''), 3000);
    }
  };

  if (loading) return <div className="p-8 text-blue font-bold">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue">Teacher Dashboard</h1>
          <p className="text-blue/70 mt-2">Manage your courses and add daily recordings.</p>
        </div>
        <button 
          onClick={() => setShowNewCourse(!showNewCourse)}
          className="bg-gold text-blue font-bold px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors flex items-center shadow-sm"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Course
        </button>
      </div>

      {showNewCourse && (
        <div className="bg-white rounded-xl shadow-sm border border-gray p-6 mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-blue mb-4">Create a New Course</h2>
          <form onSubmit={handleCreateCourse} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-blue mb-1">Course Title</label>
              <input required type="text" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} placeholder="e.g. German A1: Absolute Beginner" className="w-full px-3 py-2 border border-gray rounded-md focus:ring-gold focus:border-gold text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue mb-1">Language</label>
              <input required type="text" value={newCourse.language} onChange={e => setNewCourse({...newCourse, language: e.target.value})} placeholder="e.g. German" className="w-full px-3 py-2 border border-gray rounded-md focus:ring-gold focus:border-gold text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue mb-1">Level</label>
              <select value={newCourse.level} onChange={e => setNewCourse({...newCourse, level: e.target.value})} className="w-full px-3 py-2 border border-gray rounded-md focus:ring-gold focus:border-gold text-sm bg-white">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="md:col-span-4 flex flex-col items-end mt-2">
              {courseError && <p className="text-red-500 text-sm mb-2 font-medium">{courseError}</p>}
              <button type="submit" className="bg-blue text-white font-bold px-6 py-2 rounded-md hover:bg-blue/90 transition-colors">
                Save Course
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Quick Action: Add Recording */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray overflow-hidden h-fit">
          <div className="px-6 py-5 border-b border-gray bg-gray/10">
            <h2 className="text-lg font-bold text-blue flex items-center">
              <PlayCircle className="mr-2 h-5 w-5 text-gold" />
              Add Daily Recording
            </h2>
          </div>
          <div className="p-6">
            {courses.length === 0 ? (
              <p className="text-sm text-blue/70 italic">Please create a course first.</p>
            ) : (
              <form onSubmit={handleAddRecording} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue mb-1">Select Course</label>
                  <select required value={recording.course_id} onChange={e => setRecording({...recording, course_id: e.target.value})} className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm bg-white">
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue mb-1">Session Date</label>
                  <input required type="date" value={recording.session_date} onChange={e => setRecording({...recording, session_date: e.target.value})} className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue mb-1">Session Title</label>
                  <input required type="text" value={recording.title} onChange={e => setRecording({...recording, title: e.target.value})} placeholder="e.g. Grammar Review" className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue mb-1">YouTube Unlisted Link</label>
                  <input required type="url" value={recording.video_url} onChange={e => setRecording({...recording, video_url: e.target.value})} placeholder="https://youtu.be/..." className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm" />
                </div>
                <button type="submit" className="w-full bg-blue text-white font-bold py-2 rounded-md hover:bg-blue/90 transition-colors">
                  Publish Recording
                </button>
                {recStatus && (
                  <p className={`text-sm font-medium text-center ${recStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {recStatus}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* My Courses List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray overflow-hidden h-fit">
          <div className="px-6 py-5 border-b border-gray flex justify-between items-center bg-gray/10">
            <h2 className="text-lg font-bold text-blue flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-gold" />
              My Courses
            </h2>
          </div>
          <div className="divide-y divide-gray">
            {courses.length === 0 ? (
              <div className="p-8 text-center text-blue/70">
                No courses yet. Click "Create Course" to get started!
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray/5 transition-colors">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-md font-bold text-blue">{course.title}</h3>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {course.status}
                      </span>
                    </div>
                    <p className="text-sm text-blue/70">
                      {course.language} &bull; {course.level} &bull; {course.recordings?.[0]?.count || 0} Recordings Added
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

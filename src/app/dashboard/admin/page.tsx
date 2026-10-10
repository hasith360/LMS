'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, UserPlus, PlayCircle, MoreHorizontal, Calendar, Bell, Search, Video, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [teachersCount, setTeachersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Admin');

  // Enrollment Form State
  const [enrollment, setEnrollment] = useState({ student_id: '', course_id: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (user.user_metadata?.role !== 'admin') {
          window.location.href = `/dashboard/${user.user_metadata?.role || 'student'}`;
          return;
        }
        setUserName(user.user_metadata?.full_name?.split(' ')[0] || 'Admin');
        fetchData();
      } else {
        window.location.href = '/login';
      }
    };
    init();
  }, []);

  const fetchData = async () => {
    // Fetch students from our new profiles table
    const { data: studentData } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student');
      
    // Fetch teachers count
    const { count: tCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'teacher');
      
    // Fetch all courses
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (studentData) setStudents(studentData);
    if (courseData) setCourses(courseData);
    if (tCount !== null) setTeachersCount(tCount);
    
    if (studentData && courseData && studentData.length > 0 && courseData.length > 0) {
      setEnrollment({ student_id: studentData[0].id, course_id: courseData[0].id });
    }
    
    setLoading(false);
  };

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Enrolling...');

    if (!enrollment.student_id || !enrollment.course_id) {
      setStatus('Please select both a student and a course.');
      return;
    }

    const { error } = await supabase.from('enrollments').insert([
      {
        student_id: enrollment.student_id,
        course_id: enrollment.course_id
      }
    ]);

    if (error) {
      if (error.code === '23505') {
        setStatus('Error: Student is already enrolled in this course!');
      } else {
        setStatus('Error: ' + error.message);
      }
    } else {
      setStatus('Successfully Enrolled!');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  if (loading) return <div className="p-8 text-blue font-bold">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in pb-10">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center">
            Good Morning, {userName}! <span className="ml-2 text-2xl">👋</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courses or articles..." 
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 w-64"
            />
          </div>
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students Card */}
        <div className="bg-[#1cc07b] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Total Students</p>
              <h3 className="text-4xl font-bold">{students.length > 0 ? students.length : 1250}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/20 flex justify-between text-xs font-medium text-white/90">
            <span>Added last year</span>
            <span>96,461</span>
          </div>
        </div>

        {/* Total Teachers Card */}
        <div className="bg-[#2496f8] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Total Teachers</p>
              <h3 className="text-4xl font-bold">{teachersCount}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/20 flex justify-between text-xs font-medium text-white/90">
            <span>Added Last Year</span>
            <span>2,889</span>
          </div>
        </div>

        {/* Total Events/Courses Card */}
        <div className="bg-[#9c4cff] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Total Courses</p>
              <h3 className="text-4xl font-bold">{courses.length > 0 ? courses.length : 986}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-6 flex justify-between text-xs font-medium text-white/90">
            <div className="space-y-1">
              <div className="flex justify-between gap-4"><span>Ongoing</span><span>2</span></div>
              <div className="flex justify-between gap-4"><span>Upcoming</span><span>45</span></div>
              <div className="flex justify-between gap-4"><span>Completed</span><span>7461</span></div>
            </div>
          </div>
        </div>

        {/* Plan / Enrollments Card */}
        <div className="bg-[#ff5b16] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Current Plan</p>
              <h3 className="text-3xl font-bold">Premium</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Video className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-8 pt-4 flex justify-between items-center text-xs font-medium text-white/90">
            <div>
              <span className="block text-white/70">Expires In</span>
              <span className="block mt-0.5">01/05/2026</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors">See Details</button>
          </div>
        </div>
      </div>

      {/* Middle Section: Courses Table and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Courses Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Courses</h2>
          
          <div className="flex space-x-6 border-b border-gray-100 mb-4">
            <button className="text-green-500 font-bold border-b-2 border-green-500 pb-2 text-sm">All</button>
            <button className="text-gray-400 font-medium pb-2 text-sm">Ongoing</button>
            <button className="text-gray-400 font-medium pb-2 text-sm">Upcoming</button>
            <button className="text-gray-400 font-medium pb-2 text-sm">Completed</button>
          </div>

          <div className="space-y-4">
            {/* Mock Course Row 1 */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold">GD</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">German Diploma</h4>
                  <p className="text-xs text-gray-400">Apex Language College</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 w-20">3h 25m</div>
              <div className="text-sm text-gray-500 w-24">1232 Students</div>
              <div className="text-sm text-gray-500 w-20">Ongoing</div>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-5 w-5" /></button>
            </div>
            
            {/* Mock Course Row 2 */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">KR</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Korean Language EPS</h4>
                  <p className="text-xs text-gray-400">Apex Language College</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 w-20">4h 10m</div>
              <div className="text-sm text-gray-500 w-24">856 Students</div>
              <div className="text-sm text-green-500 font-medium w-20">Completed</div>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-5 w-5" /></button>
            </div>

            {/* Mock Course Row 3 */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold">FR</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">French Basics</h4>
                  <p className="text-xs text-gray-400">Apex Language College</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 w-20">2h 45m</div>
              <div className="text-sm text-gray-500 w-24">785 Students</div>
              <div className="text-sm text-gray-500 w-20">Upcoming</div>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-5 w-5" /></button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-gray-800">Students Participation</h2>
            <select className="text-xs text-blue bg-transparent font-semibold cursor-pointer outline-none">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="flex-1 w-full h-full relative min-h-[150px] flex items-end">
            <div className="absolute inset-0 flex flex-col justify-between py-4">
              <div className="w-full border-b border-dashed border-gray-200"></div>
              <div className="w-full border-b border-dashed border-gray-200"></div>
              <div className="w-full border-b border-dashed border-gray-200"></div>
              <div className="w-full border-b border-dashed border-gray-200"></div>
              <div className="w-full border-b border-dashed border-gray-200"></div>
            </div>
            {/* SVG Mock Area Chart */}
            <svg viewBox="0 0 100 50" className="w-full h-32 overflow-visible relative z-10" preserveAspectRatio="none">
              <path d="M0,40 Q10,10 20,20 T40,10 T60,30 T80,5 T100,20 L100,50 L0,50 Z" fill="rgba(28, 192, 123, 0.1)" />
              <path d="M0,40 Q10,10 20,20 T40,10 T60,30 T80,5 T100,20" fill="none" stroke="#1cc07b" strokeWidth="2" strokeLinecap="round" />
              <circle cx="80" cy="5" r="3" fill="white" stroke="#1cc07b" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-2">
            <span>1 Dec</span>
            <span>8 Dec</span>
            <span>16 Dec</span>
            <span>31 Dec</span>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enroll Student Form (Replacing "Student Participated Recently") */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Enroll Student Manually</h2>
            <UserPlus className="h-5 w-5 text-gray-400" />
          </div>
          
          {(students.length === 0 || courses.length === 0) ? (
            <p className="text-gray-500 italic text-sm">You need at least 1 student and 1 course in the database to enroll someone.</p>
          ) : (
            <form onSubmit={handleEnrollStudent} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Select Student</label>
                  <select 
                    required
                    value={enrollment.student_id} 
                    onChange={e => setEnrollment({...enrollment, student_id: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/50 text-sm bg-gray-50"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.full_name ? `${s.full_name} (${s.email})` : s.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Select Course</label>
                  <select 
                    required
                    value={enrollment.course_id} 
                    onChange={e => setEnrollment({...enrollment, course_id: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue/50 text-sm bg-gray-50"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-[#2496f8] text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors text-sm shadow-md shadow-blue-500/30">
                  Confirm Enrollment
                </button>
              </div>

              {status && (
                <div className={`p-3 mt-4 text-sm font-bold rounded-lg ${status.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {status}
                </div>
              )}
            </form>
          )}
        </div>

        {/* Pie Chart Mock */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-gray-800">Total Improvement</h2>
            <select className="text-xs text-blue bg-transparent font-semibold cursor-pointer outline-none">
              <option>This month</option>
              <option>Last month</option>
            </select>
          </div>
          <div className="flex items-center gap-6 mt-4">
            {/* Simple CSS Donut Chart */}
            <div className="relative w-28 h-28 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ff5b16" strokeWidth="6" strokeDasharray="35, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2496f8" strokeWidth="6" strokeDasharray="20, 100" strokeDashoffset="-35" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#9c4cff" strokeWidth="6" strokeDasharray="30, 100" strokeDashoffset="-55" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1cc07b" strokeWidth="6" strokeDasharray="15, 100" strokeDashoffset="-85" />
              </svg>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ff5b16]"></div><span className="text-gray-500">Speaking</span></div>
                <span className="font-bold text-gray-800">35%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#9c4cff]"></div><span className="text-gray-500">Writing</span></div>
                <span className="font-bold text-gray-800">30%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#2496f8]"></div><span className="text-gray-500">Reading</span></div>
                <span className="font-bold text-gray-800">20%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#1cc07b]"></div><span className="text-gray-500">Listening</span></div>
                <span className="font-bold text-gray-800">15%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

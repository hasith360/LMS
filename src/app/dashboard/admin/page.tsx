'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, ShieldCheck, UserPlus, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      
    // Fetch all courses
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (studentData) setStudents(studentData);
    if (courseData) setCourses(courseData);
    
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
      // Postgres error code 23505 is unique violation (already enrolled)
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

  if (loading) return <div className="p-8 text-blue font-bold">Loading Admin Dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue flex items-center">
          <ShieldCheck className="mr-3 h-8 w-8 text-gold" />
          Admin Dashboard
        </h1>
        <p className="text-blue/70 mt-2">Manage the platform, enroll students, and oversee courses.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray flex items-center gap-4">
          <div className="p-4 bg-blue/10 rounded-lg text-blue">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue/60 uppercase">Total Students</p>
            <p className="text-3xl font-bold text-blue">{students.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray flex items-center gap-4">
          <div className="p-4 bg-gold/20 rounded-lg text-gold">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue/60 uppercase">Active Courses</p>
            <p className="text-3xl font-bold text-blue">{courses.length}</p>
          </div>
        </div>
      </div>

      {/* Enroll Student Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden">
        <div className="px-6 py-5 border-b border-gray bg-gray/10">
          <h2 className="text-lg font-bold text-blue flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-gold" />
            Assign Student to a Course
          </h2>
        </div>
        <div className="p-6">
          {(students.length === 0 || courses.length === 0) ? (
            <p className="text-blue/70 italic">You need at least 1 student and 1 course in the database to enroll someone.</p>
          ) : (
            <form onSubmit={handleEnrollStudent} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-blue mb-1">Select Student</label>
                <select 
                  required
                  value={enrollment.student_id} 
                  onChange={e => setEnrollment({...enrollment, student_id: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm bg-white"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.full_name || s.email} (Student)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue mb-1">Select Course</label>
                <select 
                  required
                  value={enrollment.course_id} 
                  onChange={e => setEnrollment({...enrollment, course_id: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue/90 transition-colors">
                  Enroll Student
                </button>
              </div>

              {status && (
                <div className={`p-3 mt-4 text-sm font-bold rounded-md ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {status}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import { PlayCircle, CheckCircle, Clock } from 'lucide-react';

export default function StudentDashboard() {
  // Mock Data for visual layout
  const enrolledCourses = [
    {
      id: 1,
      title: 'German A1: Absolute Beginner',
      progress: 65,
      totalLessons: 20,
      completedLessons: 13,
      nextLesson: 'Lesson 14: Ordering Food',
      thumbnail: '🇩🇪',
    },
    {
      id: 2,
      title: 'French B1: Intermediate Conversation',
      progress: 15,
      totalLessons: 15,
      completedLessons: 2,
      nextLesson: 'Lesson 3: The Subjunctive Mood',
      thumbnail: '🇫🇷',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue">Welcome back, Alex! 👋</h1>
        <p className="text-blue/70 mt-2">Ready to continue your language journey?</p>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray/30 rounded-xl p-6 border border-gray flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue text-white flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-gold" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue">15</p>
            <p className="text-sm font-medium text-blue/70">Lessons Completed</p>
          </div>
        </div>
        <div className="bg-gray/30 rounded-xl p-6 border border-gray flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue text-white flex items-center justify-center">
            <Clock className="h-6 w-6 text-gold" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue">12.5h</p>
            <p className="text-sm font-medium text-blue/70">Hours Learned</p>
          </div>
        </div>
        <div className="bg-gray/30 rounded-xl p-6 border border-gray flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue text-white flex items-center justify-center">
            <span className="text-xl font-bold text-gold">A1</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue">1</p>
            <p className="text-sm font-medium text-blue/70">Certificate Earned</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-blue mb-6">Continue Learning</h2>

      {/* Enrolled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl bg-gray/50 h-16 w-16 flex items-center justify-center rounded-lg">
                  {course.thumbnail}
                </div>
                <span className="bg-gold/20 text-blue text-xs font-bold px-3 py-1 rounded-full">
                  {course.progress}% Complete
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-blue mb-2">{course.title}</h3>
              <p className="text-sm text-blue/70 mb-6">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray h-2 rounded-full mb-6">
                <div 
                  className="bg-gold h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              <div className="bg-gray/30 p-4 rounded-lg flex items-center justify-between border border-gray/50">
                <div>
                  <p className="text-xs text-blue/60 font-semibold uppercase tracking-wider mb-1">Up Next</p>
                  <p className="text-sm font-medium text-blue">{course.nextLesson}</p>
                </div>
                <button className="h-10 w-10 bg-blue text-white rounded-full flex items-center justify-center hover:bg-blue/90 transition-colors">
                  <PlayCircle className="h-5 w-5 text-gold" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

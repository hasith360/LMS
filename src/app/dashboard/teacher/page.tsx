import { Users, BookOpen, BarChart3, Plus, Edit2, PlayCircle } from 'lucide-react';

export default function TeacherDashboard() {
  // Mock Data
  const stats = [
    { label: 'Active Students', value: '142', icon: Users },
    { label: 'Total Courses', value: '3', icon: BookOpen },
    { label: 'Avg Quiz Score', value: '86%', icon: BarChart3 },
  ];

  const myCourses = [
    {
      id: 1,
      title: 'German A1: Absolute Beginner',
      students: 85,
      lessons: 20,
      status: 'Published',
    },
    {
      id: 2,
      title: 'German A2: Elementary',
      students: 42,
      lessons: 15,
      status: 'Published',
    },
    {
      id: 3,
      title: 'German B1: Intermediate',
      students: 15,
      lessons: 8,
      status: 'Draft',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue">Teacher Dashboard</h1>
          <p className="text-blue/70 mt-2">Manage your courses and track student progress.</p>
        </div>
        <button className="bg-gold text-blue font-bold px-4 py-2 rounded-lg flex items-center hover:bg-yellow-500 transition-colors">
          <Plus className="mr-2 h-5 w-5" />
          Create Course
        </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Quick Action: Add Recording */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray overflow-hidden">
          <div className="px-6 py-5 border-b border-gray bg-gray/10">
            <h2 className="text-lg font-bold text-blue flex items-center">
              <PlayCircle className="mr-2 h-5 w-5 text-gold" />
              Add Daily Recording
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue mb-1">Select Course</label>
                <select className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm bg-white">
                  <option>German A1: Absolute Beginner</option>
                  <option>French B1: Intermediate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue mb-1">Session Date & Title</label>
                <input type="text" placeholder="e.g. Sept 26 - Grammar Review" className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue mb-1">YouTube Unlisted Link</label>
                <input type="url" placeholder="https://youtu.be/..." className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-gold focus:border-gold text-sm" />
              </div>
              <button className="w-full bg-blue text-white font-bold py-2 rounded-md hover:bg-blue/90 transition-colors">
                Publish Recording
              </button>
            </div>
          </div>
        </div>

        {/* My Courses List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray overflow-hidden">
          <div className="px-6 py-5 border-b border-gray flex justify-between items-center bg-gray/10">
            <h2 className="text-lg font-bold text-blue">My Courses</h2>
            <button className="text-sm text-blue/70 hover:text-blue font-medium">View All</button>
          </div>
          <div className="divide-y divide-gray">
            {myCourses.map((course) => (
              <div key={course.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray/5 transition-colors">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-md font-bold text-blue">{course.title}</h3>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray text-blue/70'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-sm text-blue/70">
                    {course.students} Students &bull; {course.lessons} Recordings Added
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex items-center justify-center px-3 py-2 bg-gray text-blue rounded-md text-sm font-medium hover:bg-gray/80 transition-colors">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

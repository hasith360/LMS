import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white text-blue shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 sm:h-24 items-center gap-2">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img src="/logo-full.png" alt="Apex Language College" className="h-10 sm:h-16 lg:h-20 object-contain" />
              </Link>
            </div>
            <nav className="hidden lg:flex space-x-8">
              <Link href="/" className="text-blue/80 hover:text-gold font-semibold transition-colors">Home</Link>
              <Link href="/courses" className="text-gold font-bold transition-colors border-b-2 border-gold pb-1">Courses</Link>
              <Link href="/#study-abroad" className="text-blue/80 hover:text-gold font-semibold transition-colors">Study Abroad</Link>
              <Link href="/#about" className="text-blue/80 hover:text-gold font-semibold transition-colors">About Us</Link>
              <Link href="/#contact" className="text-blue/80 hover:text-gold font-semibold transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center">
              <Link href="/signup" className="bg-blue text-gold hover:bg-blue/90 px-3 py-2 sm:px-5 sm:py-2.5 rounded-md text-xs sm:text-sm font-bold transition-colors shadow-sm uppercase tracking-wide whitespace-nowrap">
                Register / Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-blue tracking-tight sm:text-5xl">
              Our Courses
            </h1>
            <p className="mt-4 text-xl text-blue/70 max-w-2xl mx-auto">
              Start your language learning journey with our expertly designed programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Course Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray/20 hover:shadow-xl transition-shadow flex flex-col">
              <div className="relative h-64 sm:h-80 w-full bg-gray-100">
                <img src="/images/german-for-kids.jpg" alt="German for Kids" className="w-full h-full object-cover object-top" />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black tracking-wider px-3 py-1 rounded-full shadow uppercase">
                  Limited Time Offer
                </div>
                <div className="absolute top-4 right-4 bg-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  NOVEMBER INTAKE
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-blue">German for Kids</h2>
                    <p className="text-gold font-bold mt-1">Grade 03 to 09</p>
                  </div>
                  <span className="bg-blue/10 text-blue text-xs font-bold px-2 py-1 rounded">3 Months</span>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  <li className="flex items-start text-sm text-blue/80">
                    <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Fun & Interactive lessons
                  </li>
                  <li className="flex items-start text-sm text-blue/80">
                    <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Build speaking, listening, reading & writing skills
                  </li>
                  <li className="flex items-start text-sm text-blue/80">
                    <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Learn with games, songs & activities
                  </li>
                  <li className="flex items-start text-sm text-blue/80">
                    <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Strong foundation for future opportunities
                  </li>
                  <li className="flex items-start text-sm text-blue/80">
                    <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Conducted by Experienced Apex German Instructor
                  </li>
                  <li className="flex items-start text-sm text-blue/80 font-semibold text-gold">
                    <svg className="h-5 w-5 text-gold mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    Certificate Provided
                  </li>
                </ul>

                <div className="bg-red-50/50 rounded-xl p-4 mb-6 border border-red-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-blue/70">Course Fee</span>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 line-through mr-2">Rs. 10,000</span>
                      <span className="text-2xl font-black text-red-600">Rs. 7,500/=</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-red-600 flex justify-between items-center pt-1 border-t border-red-100">
                    <span>SPECIAL OFFER</span>
                    <span>ALL-INCLUSIVE</span>
                  </div>
                </div>

                <Link href="/signup" className="w-full block text-center bg-gold text-blue hover:bg-yellow-500 font-bold py-3 rounded-lg transition-colors shadow">
                  Enroll Now
                </Link>
              </div>
            </div>

            {/* Placeholder for future courses */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray/40 flex flex-col items-center justify-center p-8 text-center h-[500px]">
              <div className="w-16 h-16 bg-blue/5 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue/50 mb-2">More Courses Coming Soon</h3>
              <p className="text-sm text-blue/40">We are constantly adding new language programs. Stay tuned!</p>
            </div>
            
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-blue text-white py-8 text-center text-sm mt-auto">
        <p>&copy; 2026 Apex Language College. All rights reserved.</p>
        <p className="mt-2 text-white/60">Call or WhatsApp: 075 137 3448</p>
      </footer>
    </div>
  );
}

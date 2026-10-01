import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-blue text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src="/logo-full.png" alt="Apex Language College" className="h-10 object-contain" />
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="bg-gold text-blue hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-bold transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative bg-gray pt-16 pb-32 flex items-center justify-center min-h-[70vh]">
          <div className="absolute inset-0 bg-blue/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-blue sm:text-5xl md:text-6xl">
              <span className="block">Speak Better.</span>
              <span className="block text-gold">Go Further.</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Master German, French, and Italian with our premium online language courses. 
              Join <span className="font-bold text-gold">Apex Language College</span> today and accelerate your learning journey.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/courses" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-blue bg-gold hover:bg-yellow-500 md:py-4 md:text-lg md:px-10 transition-colors">
                  Browse Courses
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gold bg-blue hover:bg-blue/90 md:py-4 md:text-lg md:px-10 transition-colors">
                  Student Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-gold font-semibold tracking-wide uppercase">Why Choose Apex?</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue sm:text-4xl">
                A better way to learn languages
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                
                {/* Feature 1 */}
                <div className="bg-gray/20 rounded-lg p-6 border border-gray">
                  <div className="w-12 h-12 bg-blue rounded-md flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-blue">High-Quality Video Lessons</h3>
                  <p className="mt-2 text-base text-blue/70">
                    Learn at your own pace with professionally recorded video lessons from expert native speakers.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray/20 rounded-lg p-6 border border-gray">
                  <div className="w-12 h-12 bg-blue rounded-md flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-blue">Comprehensive Resources</h3>
                  <p className="mt-2 text-base text-blue/70">
                    Access worksheets, PDF notes, and audio files specifically tailored for each lesson.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray/20 rounded-lg p-6 border border-gray">
                  <div className="w-12 h-12 bg-blue rounded-md flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-blue">Interactive Quizzes</h3>
                  <p className="mt-2 text-base text-blue/70">
                    Test your knowledge after every lesson and track your progress to fluency.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} <span className="font-bold text-gold">Apex Language College</span>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

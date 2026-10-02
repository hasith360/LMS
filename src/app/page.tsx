import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-white text-blue shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img src="/logo-full.png" alt="Apex Language College" className="h-16 object-contain" />
              </Link>
            </div>

            {/* Center Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <Link href="/" className="text-blue/80 hover:text-gold font-semibold transition-colors">Home</Link>
              <Link href="/courses" className="text-blue/80 hover:text-gold font-semibold transition-colors">Courses</Link>
              <Link href="#" className="text-blue/80 hover:text-gold font-semibold transition-colors">Study Abroad</Link>
              <Link href="#" className="text-blue/80 hover:text-gold font-semibold transition-colors">About Us</Link>
              <Link href="#" className="text-blue/80 hover:text-gold font-semibold transition-colors">Contact</Link>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login" className="hidden sm:block text-blue/80 hover:text-gold px-3 py-2 text-sm font-bold transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="bg-blue text-gold hover:bg-blue/90 px-5 py-2.5 rounded-md text-sm font-bold transition-colors shadow-sm uppercase tracking-wide">
                Register / Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative bg-gray pt-16 pb-32 flex items-center min-h-[70vh]">
          <div className="absolute inset-0 bg-blue/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-4xl tracking-tight font-extrabold text-blue sm:text-5xl md:text-6xl">
                <span className="block">Speak Better.</span>
                <span className="block text-gold">Go Further.</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto lg:mx-0 text-base text-blue/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Master European and Asian languages with our premium online courses. 
                Join <span className="font-bold text-gold">Apex Language College</span> today and accelerate your learning journey.
              </p>
              <div className="mt-8 max-w-md mx-auto lg:mx-0 flex justify-center lg:justify-start gap-3">
                <Link href="/courses" className="flex flex-col items-start justify-center px-6 py-4 rounded-md shadow-md text-blue bg-gold hover:bg-yellow-500 transition-colors w-[130px] md:w-[150px] h-[90px]">
                  <span className="font-bold text-sm md:text-base leading-snug">Browse</span>
                  <span className="font-bold text-sm md:text-base leading-snug">Courses</span>
                </Link>
                <Link href="/signup" className="flex flex-col items-start justify-center px-6 py-4 rounded-md shadow-md text-gold bg-blue hover:bg-blue/90 transition-colors w-[130px] md:w-[150px] h-[90px]">
                  <span className="font-medium text-sm md:text-base leading-snug">Student</span>
                  <span className="font-medium text-sm md:text-base leading-snug">Portal</span>
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center w-full px-4 sm:px-0 mt-8 lg:mt-0">
              <div className="w-full max-w-md transform hover:scale-[1.02] transition-transform duration-500">
                <HeroSlider />
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
        
        {/* Destinations Section */}
        <div className="py-16 bg-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base text-gold font-semibold tracking-wide uppercase">Study Abroad</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-blue sm:text-4xl">
                Your pathway to the world
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <a href="/pdfs/germany.pdf" target="_blank" rel="noopener noreferrer" className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/5] block cursor-pointer">
                <img src="/images/germany.jpg" alt="Study in Germany" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wider">GERMANY</h3>
                </div>
              </a>

              <a href="/pdfs/france.pdf" target="_blank" rel="noopener noreferrer" className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/5] block cursor-pointer">
                <img src="/images/france.jpg" alt="Study in France" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wider">FRANCE</h3>
                </div>
              </a>

              <a href="/pdfs/italy.pdf" target="_blank" rel="noopener noreferrer" className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/5] block cursor-pointer">
                <img src="/images/italy.jpg" alt="Study in Italy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wider">ITALY</h3>
                </div>
              </a>

              <a href="/pdfs/korea.pdf" target="_blank" rel="noopener noreferrer" className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/5] block cursor-pointer">
                <img src="/images/korea.jpg" alt="Study in South Korea" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wider">SOUTH KOREA</h3>
                </div>
              </a>

              <a href="#" className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/5] block cursor-pointer">
                <img src="/images/china.jpg" alt="Study in China" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wider">CHINA</h3>
                </div>
              </a>

              <a href="#" className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/5] block cursor-pointer">
                <img src="/images/russia.jpg" alt="Study in Russia" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue/90 via-blue/20 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white tracking-wider">RUSSIA</h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            
            {/* Column 1: Logo & Info */}
            <div className="space-y-4">
              <img src="/logo-full.png" alt="Apex Language College" className="h-10 object-contain" />
              <p className="text-sm text-blue/70">
                Master European and Asian languages with our premium online courses.
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="#" className="text-red-600 hover:opacity-80 transition-opacity">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-blue-600 hover:opacity-80 transition-opacity">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-green-600 hover:opacity-80 transition-opacity">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.83L3 22l4.28-.94A9.95 9.95 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.41 14.16c-.22.62-1.27 1.16-1.74 1.21-.43.05-.98.11-2.81-.65-2.2-1-3.64-3.23-3.75-3.38-.11-.15-.89-1.18-.89-2.25 0-1.07.56-1.6.76-1.82.2-.21.43-.27.58-.27s.29 0 .42.01c.14.01.32-.05.49.36.18.43.62 1.51.67 1.62.05.11.08.24.01.38-.07.14-.11.23-.22.34-.11.12-.23.25-.33.35-.11.1-.23.21-.11.42.12.21.54.89 1.15 1.43.79.7 1.45.92 1.66 1.03.21.11.34.09.47-.05.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.2.07 1.25.59 1.46.7.21.11.35.16.4.25.05.09.05.54-.17 1.16z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-blue-700 hover:opacity-80 transition-opacity">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.056 3.14a.973.973 0 0 0-1.116-.271L3.02 8.358a.97.97 0 0 0-.074 1.78l4.462 2.019 1.139 3.518a.97.97 0 0 0 1.637.378l2.368-2.368 4.29 2.146a.97.97 0 0 0 1.344-.657l3.69-11.07a.97.97 0 0 0-.82-1.264Zm-10.45 7.6 7.42-4.637-5.594 5.344a.97.97 0 0 0-.256.49l-.491 2.456-1.079-3.653Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="text-lg font-bold text-blue mb-4">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/courses" className="text-sm text-blue/70 hover:text-gold transition-colors">Courses</Link></li>
                <li><Link href="/signup" className="text-sm text-blue/70 hover:text-gold transition-colors">Student Portal</Link></li>
              </ul>
            </div>

            {/* Column 3: Institute */}
            <div>
              <h3 className="text-lg font-bold text-blue mb-4">Institute</h3>
              <ul className="space-y-3 text-sm text-blue/70">
                <li className="flex items-start">
                  <span className="font-semibold mr-2 w-12">Phone</span>
                  <a href="tel:+94771234567" className="hover:text-gold transition-colors">+94 77 123 4567</a>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 w-12">Email</span>
                  <a href="mailto:apexlanguagecollege@gmail.com" className="hover:text-gold transition-colors break-all">apexlanguagecollege@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Help */}
            <div>
              <h3 className="text-lg font-bold text-blue mb-4">Help</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-blue/70 hover:text-gold transition-colors">FAQ</Link></li>
                <li><Link href="#" className="text-sm text-blue/70 hover:text-gold transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
          </div>

          <div className="mt-12 pt-8 border-t border-gray/20 text-center sm:text-left text-sm text-blue/50 flex flex-col sm:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} All rights reserved | Powered by Apex LMS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

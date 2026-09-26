import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="font-bold text-3xl tracking-wider">
            <span className="text-blue">APEX</span>
            <span className="text-gold ml-1">LMS</span>
          </span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray rounded-md shadow-sm placeholder-blue/40 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm text-blue"
                  placeholder="Alex Student"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray rounded-md shadow-sm placeholder-blue/40 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm text-blue"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray rounded-md shadow-sm placeholder-blue/40 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm text-blue"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue hover:bg-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue transition-colors"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-blue/60">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/login" className="font-medium text-gold hover:text-yellow-500 transition-colors">
                Log in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

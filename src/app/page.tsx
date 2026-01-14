import { SignupForm } from "~/app/_components/signup-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">OpenClique</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Connect with Strangers.
            <span className="block text-purple-600">Complete Amazing Things.</span>
          </h2>

          <p className="mt-6 text-xl text-gray-600">
            Join OpenClique to meet professionals in your city and collaborate on exclusive
            business-sponsored events. Network, learn, and grow with people who share your ambition.
          </p>

          {/* Features */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 19H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Meet New People</h3>
              <p className="mt-2 text-gray-600">Connect with professionals and entrepreneurs in your area.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Exclusive Events</h3>
              <p className="mt-2 text-gray-600">Participate in sponsored events designed for growth.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Grow Together</h3>
              <p className="mt-2 text-gray-600">Build meaningful connections and accelerate your success.</p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="mt-16 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">Be the First to Join</h3>
            <p className="mt-2 text-gray-600">Enter your email to stay updated on our launch.</p>
            <div className="mt-6">
              <SignupForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">&copy; 2026 OpenClique. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

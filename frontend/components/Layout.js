import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../utils/AuthContext';

const Layout = ({ children, title = 'TaskTreker' }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <>
      <Head>
        <title>{title} | TaskTreker</title>
        <meta name="description" content="TaskTreker - A task management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              TaskTreker
            </Link>
            
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-gray-700">Hello, {user.name}</span>
                  
                  {isAdmin && (
                    <Link href="/admin" className="text-purple-600 hover:text-purple-800">
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="btn btn-secondary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/" className="text-gray-600 hover:text-primary-600">
                    Login
                  </Link>
                  <Link href="/signup" className="btn btn-primary">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-4 text-center text-gray-500">
            &copy; {new Date().getFullYear()} TaskTreker. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout; 
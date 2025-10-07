import { useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  return (
    <AuthContext.Consumer>
      {(dataLogin) => <Home dataLogin={dataLogin} />}
    </AuthContext.Consumer>
  );
}

function Home({ dataLogin }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!dataLogin.userLogin) {
      navigate("/login");
    }
  }, [dataLogin, navigate]);

  const handleLogout = () => {
    dataLogin.setUserLogin(null);
    window.localStorage.removeItem("userLogin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[#7F265B]">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#7F265B] transition-colors"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#7F265B] to-[#a0356f] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                {dataLogin.userLogin?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Welcome back!
              </h2>
              <p className="text-base sm:text-lg text-gray-600 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#7F265B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="break-all">{dataLogin.userLogin?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

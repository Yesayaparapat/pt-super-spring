import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { useAuth } from './services/useAuth';

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f6f9]">
      <h3 className="text-[#475569] text-lg font-medium">Loading...</h3>
    </div>
  );
}

function App() {
  const { token, username, isAuthenticated, isLoading, handleLoginSuccess, handleLogout } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (isAuthenticated && token && username) {
    return <Dashboard token={token} username={username} onLogout={handleLogout} />;
  }

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App;
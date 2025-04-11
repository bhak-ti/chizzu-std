export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user?.userfullname || "User"} 👋</h1>
          <p className="text-gray-700">This is your dashboard. You are logged in as <strong>{user?.username}</strong>.</p>
        </div>
      </div>
    );
  }
  
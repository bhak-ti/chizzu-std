import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheese } from "react-icons/fa";


export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Tambahkan ini!


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
  
      if (res.status === 200 && res.data.token) {
        setMessage("Login success 🎉");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // Optional: Redirect ke dashboard
        window.location.href = "/dashboard";
      } else {
        setMessage("Login failed ❌");
      }
    } catch (err) {
      console.error(err); // bantu debug juga
      setMessage("Login failed ❌");
    }
  };
  

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-yellow-400">
                    <h2 className="text-3xl font-bold mb-6 text-yellow-600 text-center">Welcome to Chizzu 🧀</h2>
            
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-3 border border-gray-300 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
                    
                    <div className="relative">
                            <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                            />
                            <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-yellow-600"
                            >
                                    {showPassword ? (
                                        <span className="flex gap-1 items-center text-yellow-500">
                                            <FaCheese /> <FaEyeSlash />
                                        </span>
                                        ) : (
                                        <span className="flex gap-1 items-center text-yellow-500">
                                            <FaCheese /> <FaEye />
                                        </span>
                                    )}
                            </button>
                    </div>

                    <button type="submit" className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition-all duration-200">Login</button>

                    {message && (
                            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
                    )}
            </form>
    </div>
);
}

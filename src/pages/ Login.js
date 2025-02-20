import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { browserLocalPersistence, GoogleAuthProvider, setPersistence, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

const Login = () => {
  // const { loginWithGoogle } = useAuth();
  // const navigate = useNavigate();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await setPersistence(auth, browserLocalPersistence); 
      const result = await signInWithPopup(auth, provider);
      // setUser(result.user);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error.message);
    }
  };

  const skipAuth = () => {
    sessionStorage.setItem("guest", "true"); // Store guest mode
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold mb-4">Task Management App</h1>
    <button 
      onClick={loginWithGoogle} 
      className="px-4 py-2 bg-blue-500 text-white rounded mb-2">
      Sign in with Google
    </button>
    {/* <button 
      onClick={skipAuth} 
      className="px-4 py-2 bg-gray-500 text-white rounded">
      Skip Authentication
    </button> */}
  </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

const AuthForm = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, { email, password, fullname });
      if (isLogin) {
        const token = res.data.token;
        localStorage.setItem("token", token); // Save token to localStorage
        navigate("/");
      } else {
        alert("Inscription réussie, connectez-vous");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="flex h-screen bg-indigo-700 rounded-md hover:shadow-black hover:shadow-2xl">
      <div className="w-full max-w-sm m-auto bg-indigo-100 rounded p-5">
        <p className="text-indigo-400 text-2xl font-bold flex justify-center">
          {isLogin ? "Connexion" : "Inscription"}
        </p>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <div>
                <label className="block mb-2 text-indigo-500">Email</label>
                <input
                  className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-indigo-500">Password</label>
                <input
                  className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block mb-2 text-indigo-500">Full Name</label>
                <input
                  className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="full Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-indigo-500">Email</label>
                <input
                  className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-indigo-500">Password</label>
                <input
                  className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
                />
              </div>
            </>
          )}
          <button
            className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
        <button
          className="text-indigo-700 hover:text-pink-700 text-sm flex text-center"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Pas de compte ? Inscrivez-vous"
            : "Déjà un compte ? Connectez-vous"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
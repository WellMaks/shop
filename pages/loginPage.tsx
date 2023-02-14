import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../store/action-creators";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCookie, setCookies } from "cookies-next";

const LoginPage = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state: any) => state.isLoggedIn);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const { token } = await res.json();
      // saveToken(token);
      setCookies("token", token);
      dispatch(loginUser(token));
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setData(true);
      router.push("/");
    }
  }, []);

  if (!data) {
    return (
      <div>
        <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
          <h2 className="text-lg font-medium mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              form="email"
            >
              Email
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-lg"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              form="password"
            >
              Password
            </label>
            <input
              className="w-full border border-gray-400 p-2 rounded-lg"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
            Login
          </button>
        </form>
      </div>
    );
  }
};

export default LoginPage;

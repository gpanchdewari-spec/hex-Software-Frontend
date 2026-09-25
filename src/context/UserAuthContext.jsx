import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("authUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [role, setRole] = useState(localStorage.getItem("authRole") || null);

  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", {
      email,
      password,
    });

    if (data.role === "admin") {
      localStorage.removeItem("userToken");
      localStorage.setItem("token", data.token);
    } else {
      localStorage.removeItem("token");
      localStorage.setItem("userToken", data.token);
    }

    localStorage.setItem("authUser", JSON.stringify(data.user));

    localStorage.setItem("authRole", data.role);

    setUser(data.user);
    setRole(data.role);

    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/users/register", {
      name,
      email,
      password,
    });

    localStorage.removeItem("token");

    localStorage.setItem("userToken", data.token);

    localStorage.setItem("authUser", JSON.stringify(data.user));

    localStorage.setItem("authRole", "user");

    setUser(data.user);
    setRole("user");

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authRole");

    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const userToken = localStorage.getItem("userToken");

      const savedRole = localStorage.getItem("authRole");

      // admin ke liye navbar state localStorage se already load ho chuki hai
      if (savedRole === "admin") {
        setLoading(false);
        return;
      }

      if (!userToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setUser(data);
        setRole("user");

        localStorage.setItem("authUser", JSON.stringify(data));
      } catch (error) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("authUser");
        localStorage.removeItem("authRole");

        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}

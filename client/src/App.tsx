import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
const NavBar = lazy(() => import("./components/NavBar"));
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));

import useLocalStorage from "./hooks/useLocalStorage";

import { toastContext } from "./context/toast";
const App = () => {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [userUsername, setUserUsername] = useLocalStorage<string | null>(
    "username",
    null
  );
  const toast = useToast();

  return (
    <toastContext.Provider value={toast}>
      <NavBar
        token={token}
        userUsername={userUsername}
        setToken={setToken}
        setUserUsername={setUserUsername}
      />
      <Suspense>
        <NavBar
          token={token}
          userUsername={userUsername}
          setToken={setToken}
          setUserUsername={setUserUsername}
        />
      </Suspense>
      <Routes>
        <Route index element={<Home />} />
        <Route
          index
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route path=":genre" element={<Home />} />
        <Route
          path="auth/login"
          element={
            <Login setToken={setToken} setUserUsername={setUserUsername} />
            <Suspense>
              <Login setToken={setToken} setUserUsername={setUserUsername} />
            </Suspense>
          }
        />
        <Route
          path="auth/register"
          element={
            <Register setToken={setToken} setUserUsername={setUserUsername} />
            <Suspense>
              <Register setToken={setToken} setUserUsername={setUserUsername} />
            </Suspense>
          }
        />
      </Routes>
    </toastContext.Provider>
  );
};
export default App;
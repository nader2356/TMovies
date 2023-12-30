import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const NavBar = lazy(() => import("./components/NavBar"));
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));

import FullPageSpinner from "./components/FullPageSpinner";

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
      <Suspense>
        <NavBar
          token={token}
          userUsername={userUsername}
          setToken={setToken}
          setUserUsername={setUserUsername}
        />
      </Suspense>
      <Routes>
        <Route
          index
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route path=":genre" element={<Home />} />
        <Route path="search/:q" element={<Home />} />
        <Route
          path="auth/login"
          element={
            <Suspense>
            <Suspense fallback={<FullPageSpinner />}>
              <Login setToken={setToken} setUserUsername={setUserUsername} />
            </Suspense>
          }
        />
        <Route
          path="auth/register"
          element={
            <Suspense>
            <Suspense fallback={<FullPageSpinner />}>
              <Register setToken={setToken} setUserUsername={setUserUsername} />
            </Suspense>
          }
        />
      </Routes>
    </toastContext.Provider>
  );
};
export default App;
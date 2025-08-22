import Cookies from "js-cookie";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { UserSessionDto } from "~/dto/auth/login.dto";
import { authService } from "~/services";

interface AuthContextType {
  userInfo: any;
  login: (account: any) => void;
  logout: () => void;
}

const AuthStoreContext = React.createContext<AuthContextType>({
  userInfo: null,
  login: () => {},
  logout: () => {},
});

const AuthStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [isFirstLoading, setIsFirstLoading] = React.useState(false);
  const [logged, setLogged] = React.useState(false);
  const [userInfo, setUserInfo] = useState<UserSessionDto>(undefined);

  const login = useCallback(
    (account: { user: any; accessToken: string; refreshToken: string }) => {
      setUserInfo(account.user);
      Cookies.set("user", JSON.stringify(account.user), { expires: 7 });
      Cookies.set("accessToken", account.accessToken, { expires: 7 });
      // Cookies.set("refreshToken", account.refreshToken, { expires: 10000 });
    },
    []
  );

  const logout = useCallback(() => {
    setUserInfo(null);
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/signin");
  }, [navigate]);

  const authenticate = useCallback(async () => {
    setIsFirstLoading(true);
    try {
      if (!window.location.pathname.includes("signin")) {
        const isAuthenticated = authService.isAuthenticated();
        const userCookie = Cookies.get("user");
        const parsed = JSON.parse(userCookie);
        setUserInfo(parsed);
        const check = isAuthenticated ? true : false;
        if (check) {
          setLogged(true);
        }
      }
    } catch (error) {
      console.error("Authentication failed", error);
      setLogged(false);
    }
    setIsFirstLoading(false);
  }, []);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    try {
      if (userCookie) {
        const parsed = JSON.parse(userCookie);
        setUserInfo(parsed);
      }
    } catch (e) {
      console.log(e);
      Cookies.remove("user");
    }
  }, []);

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/signin");
  //   }
  // }, [userInfo, navigate]);

  const value = useMemo(
    () => ({
      isFirstLoading,
      logged,
      userInfo,
      authenticate,
      login,
      logout,
    }),
    [login, logout, isFirstLoading, authenticate, logged, userInfo]
  );

  return (
    <AuthStoreContext.Provider value={value}>
      {children}
    </AuthStoreContext.Provider>
  );
};

const useAuthStore = () => {
  const context = useContext(AuthStoreContext);
  if (!context) {
    throw new Error(
      "useAuthStore must be used within an AuthStoreContext component"
    );
  }
  return context;
};

export { AuthStoreProvider, useAuthStore };

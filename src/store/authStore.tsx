import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { ApiException } from "~/@core/dto";
import { LoginDto, UserSessionDto } from "~/dto/auth/login.dto";
import { authService, toastService } from "~/services";

const AuthStoreContext = React.createContext(null);

const AuthStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [authState, setAuthState] = React.useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [isFirstLoading, setIsFirstLoading] = React.useState(false);
  const [logged, setLogged] = React.useState(
    authState.isAuthenticated ? true : false
  );
  const [userInfo, setUserInfo] = useState<UserSessionDto>(undefined);

  const login = useCallback(
    async (body: LoginDto, pathNavigate: string = "/") => {
      setIsLoading(true);
      try {
        const res = await authService.login(body);
        if (res.data.token) {
          setLogged(true);
          localStorage.setItem("accessToken", `${res.data.token}`);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUserInfo(res.data.user);
          navigate(pathNavigate);
        }
      } catch (error) {
        toastService.handleError(error as ApiException);
      }
      setIsLoading(false);
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, user: null, token: null });
    navigate("/signin");
  }, [navigate]);

  const authenticate = useCallback(async () => {
    setIsFirstLoading(true);
    try {
      // const user = await authService.authenticate();
      const check = authState.isAuthenticated ? true : false;
      if (check) {
        setLogged(true);
      }
    } catch (error) {
      console.error("Authentication failed", error);
      setLogged(false);
    }
    setIsFirstLoading(false);
  }, [authState.isAuthenticated]);

  useEffect(() => {
    if (!logged) {
      navigate("/signin");
    }
  }, [logged, navigate]);

  const value = useMemo(
    () => ({
      authState,
      isFirstLoading,
      isLoading,
      logged,
      userInfo,
      authenticate,
      login: (user: any, token: string) => {
        login(user, token);
        navigate("/");
      },
      logout: () => {
        logout();
        navigate("/signin");
      },
    }),
    [
      authState,
      login,
      logout,
      navigate,
      isLoading,
      isFirstLoading,
      authenticate,
      logged,
      userInfo,
    ]
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

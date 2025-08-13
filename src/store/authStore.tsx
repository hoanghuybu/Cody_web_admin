import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router";

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

  const login = useCallback(async (user: any, token: string) => {
    setIsLoading(true);
    // Simulate an API call to authenticate the user
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAuthState({ isAuthenticated: true, user, token });
    setIsLoading(false);
  }, []);

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

  //   useEffect(() => {
  //     if (!logged) {
  //       navigate("/signin");
  //     }
  //   }, [logged, navigate]);

  const value = useMemo(
    () => ({
      authState,
      isFirstLoading,
      isLoading,
      logged,
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

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout, setCredentials } from "./authSlice";
import { authApi } from "./auth.api";
import { RootState } from "@/redux/store";

const SessionManager = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, accessToken } = useAppSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const initializeAuth = async () => {
      // If the user is flagged as authenticated but missing an access token (e.g. after refresh)
      if (isAuthenticated && !accessToken) {
        try {
          // Attempt silent refresh using HttpOnly cookies
          const result = await dispatch(
            authApi.endpoints.refreshToken.initiate(undefined),
          ).unwrap();

          if (result?.data) {
            dispatch(setCredentials(result.data));
          }
        } catch (error) {
          console.error("Session restoration failed:", error);
          dispatch(logout());
        }
      }
    };

    initializeAuth();
  }, [isAuthenticated, accessToken, dispatch]);

  return null;
};

export default SessionManager;

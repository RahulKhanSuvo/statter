import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logOut, setCredentials } from "./authSlice";
import { authApi } from "./auth.api";
import { RootState } from "@/redux/store";

const SessionManager = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      // If the user is flagged as authenticated but missing an access token (e.g. after refresh)
      if (!accessToken) {
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
          dispatch(logOut());
        }
      }
    };

    initializeAuth();
  }, [accessToken, dispatch]);

  return null;
};

export default SessionManager;

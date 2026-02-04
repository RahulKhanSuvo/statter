/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setCredentials } from "../features/auth/authSlice";
import { LoginData } from "../types/auth.types";
const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // console.log("Token expired, attempting to refresh...");
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        // console.log("Token refreshed successfully!");
        api.dispatch(
          setCredentials((refreshResult.data as any).data as LoginData),
        );
        // retry the original query
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        // console.log("Refresh token failed, logging out...");
        api.dispatch(logout());
      }
    } else {
      // console.log("No refresh token available, logging out...");
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],

  endpoints: () => ({}),
});

export default baseApi;

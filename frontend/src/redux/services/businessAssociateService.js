import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => localStorage.getItem("token");
 // if you're using a utility function for token

export const businessAssociateApi = createApi({
  reducerPath: "businessAssociateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBusinessAssociates: builder.query({
      query: ({ page = 1, limit = 20, search = "",entriesPerPageNewData = ""  } = {}) => ({
        url: `auth/listBusinessAssociates?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBusinessAssociatesQuery } = businessAssociateApi;

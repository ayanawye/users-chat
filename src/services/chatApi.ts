import { IChat } from "@/models/IChat";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.lenzaos.com/",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("version", "0.0");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getChats: build.query<{ response: IChat[] }, "">({
      query: () => ({
        url: "chat.get",
        params: {
          offset: 0,
          limit: 20
        }
      }),
    }),
  }),
});

export const { useGetChatsQuery } = chatApi;

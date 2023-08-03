import { IMessagge } from "@/models/IMessagge";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.lenzaos.com/",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("version", "0.0");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMessage: build.query<{ response: IMessagge[] }, string | null>({
      query: (id) => ({
        url: "message.get",
        params: {
          chat_id: id,
          offset: 0,
          limit: 20
        }
      }),
    }),
  }),
});

export const { useGetMessageQuery } = messageApi;
import { splitApi } from "./splitApi";
import { handleNewComments } from "endpoints/rtkQuery/handleNewComments";
const endpoint = "Messaging";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ room_name, page }) => ({
        url: `${endpoint}/messages/${room_name}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response, arg) => {
        response.data = [...response.data].reverse();
        return response;
      },
      merge: (currentCache, newItems, args) => {
        handleNewComments({ currentCache, newItems, args });
        currentCache.end_of_data = newItems.end_of_data;
      },
      keepUnusedDataFor: 0,
    }),
    getChatRoom: builder.query({
      query: (sender) => ({
        url: `${endpoint}/chatroom/${sender}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useGetChatRoomQuery } = splitApi;

import { splitApi } from "./splitApi";
import { handleNewMessages } from "./handleNewMessages";
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
      transformResponse: (response, arg) => {
        response.data = [...response.data].reverse();
        return response;
      },

      serializeQueryArgs: ({ getMessages }) => {
        return getMessages;
      },

      merge: (currentCache, newItems, args) => {
        handleNewMessages({ currentCache, newItems, args });
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
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

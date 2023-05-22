import { splitApi } from "./splitApi";
import { handleNewComments } from "components/rtkQuery/handleNewComments";
const endpoint = "Messaging";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ calc_room, page }) => ({
        url: `${endpoint}/messages/${calc_room}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),

      serializeQueryArgs: ({ getComments }) => {
        return getComments;
      },
      merge: (currentCache, newItems, args) => {
        currentCache.data.unshift(...newItems.data);
        currentCache.end_of_data = newItems.end_of_data;
        // TODO items keep being pushed if page is revisted without refresh could probaly implement same fix that is used in the comments endpoint
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response, arg) => {
        response.data = [...response.data].reverse();
        return response;
      },
    }),
  }),
});

export const { useGetMessagesQuery } = splitApi;

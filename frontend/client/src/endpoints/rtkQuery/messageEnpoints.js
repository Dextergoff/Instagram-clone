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
    }),
  }),
});

export const { useGetMessagesQuery } = splitApi;

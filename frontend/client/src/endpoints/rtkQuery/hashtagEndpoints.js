import { splitApi } from "./splitApi";
import setResponse from "components/rtkQuery/setResponse";
import mergeNewItems from "components/rtkQuery/mergeNewItems";
const callto = "hashtags";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getHashtagPosts: builder.query({
      query: ({ filter, page }) => ({
        url: `/posts/page/${page}/`,
        method: "post",
        body: filter,

        headers: {
          "Content-type": "application/json",
        },
      }),
      serializeQueryArgs: ({ getHashtagPosts }) => {
        return getHashtagPosts;
      },
      transformResponse: (response, arg) => {
        setResponse({ response, arg });
        return response;
      },
      merge: (currentCache, newItems) => {
        mergeNewItems({ currentCache, newItems });
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetHashtagPostsQuery } = splitApi;

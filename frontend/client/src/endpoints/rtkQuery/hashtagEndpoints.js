import { splitApi } from "./splitApi";
import setResponse from "components/rtkQuery/setResponse";
import mergeNewItems from "components/rtkQuery/mergeNewItems";
const callto="hashtags"

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getHashtagPosts: builder.query({
      query: ({ hashtag, page }) => ({
        url: `${callto}/${hashtag}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response, arg) => {
        setResponse({response, arg})
        return response
      },
      serializeQueryArgs: ({ getHashtagPosts }) => {
        return getHashtagPosts;
      },
      merge: (currentCache, newItems) => {
       mergeNewItems({currentCache, newItems})
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetHashtagPostsQuery } = splitApi;

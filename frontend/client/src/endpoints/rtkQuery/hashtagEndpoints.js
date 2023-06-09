import { splitApi } from "./splitApi";
import setResponse from "./setResponse";
import mergeNewItems from "./mergeNewItems";
const callto = "hashtags";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getHashtag: builder.query({
      query: ({ filter, page }) => ({
        url: `/posts/hashtag/${page}/`,
        method: "post",
        body: filter,
        headers: {
          "Content-type": "application/json",
        },
      }),
      serializeQueryArgs: ({ getHashtag }) => {
        return getHashtag;
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

export const { useGetHashtagQuery } = splitApi;

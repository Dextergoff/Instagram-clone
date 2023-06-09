import { splitApi } from "./splitApi";
import mergeNewItems from "./mergeNewItems";
import setResponse from "./setResponse";
const callto = "posts";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (pk) => ({
        url: `${callto}/post/${pk}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),

    getDiscover: builder.query({
      query: (page) => ({
        url: `${callto}/discover/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response, arg) => {
        setResponse({ response, arg });
        return response;
      },
      serializeQueryArgs: ({ getPage }) => {
        return getPage;
      },
      merge: (currentCache, newItems) => {
        mergeNewItems({ currentCache, newItems });
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getFollowingPosts: builder.query({
      query: ({ page, pk }) => ({
        url: `${callto}/following/${page}/${pk}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse: (response, arg) => {
        setResponse({ response, arg });
        return response;
      },
      serializeQueryArgs: ({ getPage }) => {
        return getPage;
      },
      merge: (currentCache, newItems) => {
        mergeNewItems({ currentCache, newItems });
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    createPost: builder.mutation({
      query: (payload) => ({
        url: `${callto}/createpost/`,
        method: "post",
        body: payload,
      }),
    }),

    likePost: builder.mutation({
      query: ({ pk, requser }) => ({
        url: `${callto}/likepost/`,
        method: "post",
        body: { pk, requser },
      }),
    }),
  }),
});

export const {
  useGetPostQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useGetDiscoverQuery,
  useGetFollowingPostsQuery,
} = splitApi;

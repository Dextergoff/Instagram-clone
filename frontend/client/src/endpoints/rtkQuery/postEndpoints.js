import { splitApi } from "./splitApi";
import mergeNewItems from "./mergeNewItems";
import setResponse from "./setResponse";
const endpoint = "posts";

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (pk) => ({
        url: `${endpoint}/post/${pk}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),

    getDiscover: builder.query({
      query: ({ page, pk }) => ({
        url: `${endpoint}/discover/${page}/${pk}`,
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
        url: `${endpoint}/following/${page}/${pk}`,
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
        url: `${endpoint}/createpost/`,
        method: "post",
        body: payload,
      }),
    }),

    likePost: builder.mutation({
      query: ({ pk, requser }) => ({
        url: `${endpoint}/likepost/`,
        method: "post",
        body: { pk, requser },
      }),
    }),

    deletePost: builder.mutation({
      query: (post_pks) => ({
        url: `${endpoint}/delete_post/`,
        method: "post",
        body: { post_pks },
      }),
    }),
  }),
});

export const {
  useGetPostQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useDeletePostMutation,
  useGetDiscoverQuery,
  useGetFollowingPostsQuery,
} = splitApi;

import { splitApi } from "./splitApi";
import UpdateProfile from "./UpdateProfile";

const endpoint = "profiles";
splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfilePage: builder.query({
      query: ({ requested_user_pk, pk, page }) => ({
        url: `profiles/posts/${requested_user_pk}/${pk}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),

      serializeQueryArgs: ({ getProfilePage }) => {
        return getProfilePage;
      },

      merge: (currentCache, newItems, args) => {
        UpdateProfile({ currentCache, newItems, args });
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
    }),

    getFollowing: builder.query({
      query: ({ requested_user_pk, pk, page }) => ({
        url: `profiles/following/${requested_user_pk}/${pk}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
      serializeQueryArgs: ({ getProfilePage }) => {
        return getProfilePage;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getFollowers: builder.query({
      query: ({ requested_user_pk, pk, page }) => ({
        url: `profiles/followers/${requested_user_pk}/${pk}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),
      serializeQueryArgs: ({ getProfilePage }) => {
        return getProfilePage;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
    }),

    editProfile: builder.mutation({
      query: (body) => ({
        url: `${endpoint}/editprofile`,
        method: "post",
        body: body,
      }),
    }),

    manageFollowers: builder.mutation({
      query: ({ pk, requested_user_pk }) => ({
        url: `${endpoint}/manage_followers/${pk}/${requested_user_pk}`,
        method: "post",
      }),
    }),
  }),
});

export const {
  useGetProfilePageQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useManageFollowersMutation,
  useEditProfileMutation,
} = splitApi;

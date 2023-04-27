import { splitApi } from "./splitApi";
import mergeNewItems from "./modules/mergeNewItems";
import setResponse from "./modules/setResponse";

const callto = "profiles"

splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfilePage: builder.query({

      query: ({ pk, page }) => ({
        url: `${callto}/posts/${pk}/${page}`,
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      }),

      serializeQueryArgs: ({ getProfilePage }) => {
        return getProfilePage;
      },

      transformResponse: (response, arg) => {
        setResponse({response, arg})
        return response;
      },

      merge: (currentCache, newItems) => {
        mergeNewItems({currentCache, newItems})
          // pushes new items to currentCacge
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

    }),

    editProfile: builder.mutation({
      query: (body) => ({
        url: `${callto}/editprofile`,
        method: "post",
        body: body,
      }),
    }),
  })
})

export const {
  useGetProfilePageQuery, useEditProfileMutation
} = splitApi;
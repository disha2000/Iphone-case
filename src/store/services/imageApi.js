import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { setUploadProgressBar, resetUploadProgressBar } from "../slices/progressSlice";
const BASE_URL = "https://api.cloudinary.com/v1_1/do2lx5yjd/";


export const imageApi = createApi({
    reducerPath: "imageApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.cloudinary.com/v1_1/do2lx5yjd/",
    }),
    endpoints: (build) => ({
      uploadImage: build.mutation({
        queryFn: async ({ formData, endpoint }, api) => {
        const fullUrl = BASE_URL + endpoint; 
        api.dispatch(resetUploadProgressBar());
          try {
            const response = await axios.post(fullUrl, formData, {
              onUploadProgress: (upload) => {
                let uploadProgress = Math.round((100 * upload.loaded) / upload.total);
                api.dispatch(setUploadProgressBar(uploadProgress));
              },
            });
  
            return { data: response.data };
          } catch (error) {
            return { error: error.message };
          }
        },
      }),
    }),
  });

export const {useUploadImageMutation} = imageApi
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "@/utils/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";


const dbName = "PhoneCases";
export const phoneApi = createApi({
  reducerPath: "phoneApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    addCustomPhoneCover: build.mutation({
      queryFn: async ({ data, id }) => {
        console.log("here");
        try {
          const docRef = doc(db, dbName, id);
          await setDoc(docRef, data);

          return { data: "Success!!! Phone cover added" };
        } catch (error) {
          return { error: { status: "ERROR", message: error.message } };
        }
      },
    }),
    addManualPhoneCover: build.mutation({}),
    getCustomPhoneCover: build.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, dbName, id);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            return {
              error: {
                status: 404,
                message: "Document not found",
              },
            };
          }
          return {
            data: docSnap.data(),
          };
        } catch (error) {
          return {
            error: {
              status: 404,
              message: error.message,
            },
          };
        }
      },
    }),
    getAllPhoneCovers: build.query({
      queryFn: async () => {
        try {
          const querySnapshot = await getDocs(collection(db, dbName));

          const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          return { data: dataArray };
        } catch (error) {
          return {
            error: {
              status: 500,
              message: error.message,
            },
          };
        }
      },
    }),
    
  }),
});
console.log(phoneApi);
export const { useAddCustomPhoneCoverMutation, useGetCustomPhoneCoverQuery, useGetAllPhoneCoversQuery } =
  phoneApi;

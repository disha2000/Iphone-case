import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

const dbName = "PhoneCases";
const PAGE_SIZE = 5;
export const phoneApi = createApi({
  reducerPath: "phoneApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["PhoneCovers", "getSingleCover"],
  endpoints: (build) => ({
    addCustomPhoneCover: build.mutation({
      queryFn: async ({ data, id }) => {
        try {
          const docRef = doc(db, dbName, id);
          await setDoc(docRef, {
            ...data,
            createdAt: Math.floor(new Date().getTime() / 1000),
          });

          return { data: "Success!!! Phone cover added" };
        } catch (error) {
          return { error: { status: "ERROR", message: error.message } };
        }
      },
      invalidatesTags: ["PhoneCovers", "getSingleCover"],
    }),
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
            data: { ...docSnap.data() },
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
      providesTags: ["getSingleCover"],
    }),
    getAllPhoneCovers: build.query({
      queryFn: async ({lastDoc, sortObj, page_size}) => {
        try {
          let q = query(
            collection(db, dbName),
            orderBy(sortObj.field, sortObj.order),
            limit(page_size)
          );
          if (lastDoc) {
            q = query(
              collection(db, dbName),
              orderBy(sortObj.field, sortObj.order),
              startAfter(lastDoc[sortObj.field]),
              limit(page_size)
            );
          }
          const querySnapshot = await getDocs(q);
          const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return {
            data: {
              covers: dataArray,
              lastDoc:
                dataArray.length > 0
                  ? dataArray[dataArray.length - 1]
                  : null,
            },
          };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
      providesTags: ["PhoneCovers"],
    }),
    deletePhoneCover: build.mutation({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, dbName, id);
          await deleteDoc(docRef);
          return { data: "deleted" };
        } catch (error) {
          return {
            error: {
              status: 500,
              message: error.message,
            },
          };
        }
      },
      invalidatesTags: ["PhoneCovers"],
    }),
  }),
});

export const {
  useAddCustomPhoneCoverMutation,
  useGetCustomPhoneCoverQuery,
  useGetAllPhoneCoversQuery,
  useDeletePhoneCoverMutation,
} = phoneApi;

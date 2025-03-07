import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updateProfile  } from "firebase/auth";
import { auth } from "../../utils/firebase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
  
    login: builder.mutation({
        queryFn: async ({ _email, _password }) => {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, _email, _password)
            const {email, uid, displayName} = userCredential.user
            return {data: {email, uid, displayName} }
          } catch (error) {
            return { error: { status: error.code, data: error.message } }; 
          }
        },
      }),
    
    signup: builder.mutation({
        queryFn: async({_email, _password, _name}) =>{
            try {
                let userCredential = await  createUserWithEmailAndPassword(auth, _email, _password);
                await updateProfile(userCredential.user, {
                    displayName: _name
                })
                const {email, uid, displayName} = userCredential.user;
                return {data: {email, uid, displayName} }

            } catch(error) {
                return { error: { status: error.code, data: error.message } }; 
            }
        }
    }),
    signout: builder.mutation({
        queryFn: async() => {
            try {
                await signOut(auth)
                return {data: {}}
            } catch (error) {
                return { error: { status: error.code, data: error.message } }; 
            }
        }
    }),
    googleSignIn: builder.mutation({
        queryFn: async () => {
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider)
                return {data: {}}
            } catch (error) {
                return { error: { status: error.code, data: error.message } }; 
            }
        }
      })
  }),
});

export const { useLoginMutation, useSignupMutation, useSignoutMutation, useGoogleSignInMutation } = authApi;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRef, useState } from "react";
import { checkValidate } from "../utils/validate";
import {createUserWithEmailAndPassword} from  'firebase/auth'
import {auth} from '../../firebase'

const Login = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleFormSubmit = async () => {
    console.log(emailRef);
    console.log(nameRef);

    const message = checkValidate(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    console.log(message);
    setErrorMessage(message.formField);
    if (!message.isValid) return;
 
  };

  return (
    <div className="flex flex-col lg:flex-row md:justify-around  lg:px-[10%] md:px-[5%] px-[2%] items-center text-center lg:items-start lg:text-left mt-[57px]">
      <div className="md:w-6/12 lg:w-4/12 text-center w-8/12 m-auto pt-16">
        <h1 className="font-bold pb-5 text-2xl">Create your account</h1>
        <p className="pb-7 text-slate-600">
          Welcome back! Please sign in to continue.
        </p>
        <div className="mb-3.5">
          <Label htmlFor="name" className="pb-1.5 text-label-foreground">
            Name
          </Label>
          <Input
            type="text"
            ref={nameRef}
            placeholder="Name"
            className="focus-visible:ring-1 focus-visible:ring-input-outline p-4 border-1 border-input-border"
          />
          {errorMessage.name && (
            <p className="text-red-700 font-medium text-xs text-right pt-1">Invalid Name!</p>
          )}
        </div>
        <div className="mb-3.5">
          <Label htmlFor="email" className="pb-1.5 text-label-foreground">
            Email address
          </Label>
          <Input
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
          />
          {errorMessage.email && (
            <p className="text-red-700 font-medium text-xs text-right pt-1">Invalid Email!</p>
          )}
        </div>
        <div className="mb-3.5">
          <Label htmlFor="password" className="pb-1.5 text-label-foreground ">
            Password
          </Label>
          <Input
            type="password"
            ref={passwordRef}
            placeholder="password"
            className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
          />
          {errorMessage.password && (
            <p className="text-red-700 font-medium text-xs text-right pt-1">
              Password must be 8+ chars, include 1 uppercase, 1 lowercase, 1
              digit & 1 special character.
            </p>
          )}
        </div>
        <Button
          className="bg-button-background hover:bg-button-background-hover w-full mb-3.5"
          onClick={() => handleFormSubmit()}
        >
          Continue
        </Button>
        <Button className="w-full bg-sign-in-background text-black border-1 border-input-border hover:bg-sign-in-background-hover">
          <img
            src="https://iphonecase.vercel.app/google-logo.svg"
            className="w-[18px] h-[18px]"
          />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};
export default Login;

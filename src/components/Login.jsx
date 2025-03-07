import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState, useRef } from "react";
import { checkValidate } from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState({});
  const handleFormSubmit = async () => {
    const [_email, _password] = [emailRef.current, passwordRef.current];
    const { errorField, isFormValid } = checkValidate([_email, _password]);
    setErrorMessage(errorField);
    if (!isFormValid) return;

    await signInWithEmailAndPassword(auth, _email, _password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage((prevState) => ({
          ...prevState,
          signIn: errorCode + errorMessage,
        }));
      });
  };

  return (
    <div className="flex flex-col lg:flex-row md:justify-around  lg:px-[10%] md:px-[5%] px-[2%] items-center text-center lg:items-start lg:text-left mt-[57px]">
      <div className="md:w-6/12 lg:w-4/12 text-center w-8/12 m-auto pt-16">
        <h1 className="font-bold pb-5 text-2xl">Sign In</h1>
        <div className="mb-3.5">
          <Label htmlFor="email" className="pb-1.5 text-label-foreground">
            Email address
          </Label>
          <Input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="Email"
            className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
          />
          {errorMessage.email && (
            <p className="text-red-700 font-medium text-xs text-right pt-1">
              {errorMessage.email}
            </p>
          )}
        </div>
        <div className="mb-3.5">
          <Label htmlFor="password" className="pb-1.5 text-label-foreground ">
            Password
          </Label>
          <Input
            type="password"
            ref={passwordRef}
            name="password"
            placeholder="password"
            className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
          />
          {errorMessage.password && (
            <p className="text-red-700 font-medium text-xs text-right pt-1">
              Invalid Password!
            </p>
          )}
        </div>
        {errorMessage.signIn && (
          <p className="text-red-700 font-medium text-xs text-right pt-1">
            {errorMessage.signIn}
          </p>
        )}
        <Button
          className="bg-button-background hover:bg-button-background-hover w-full mb-3.5"
          onClick={() => handleFormSubmit()}
        >
          Continue
        </Button>
        <GoogleLogin />
      </div>
    </div>
  );
};
export default Login;

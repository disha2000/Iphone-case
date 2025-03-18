import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState, useRef } from "react";
import { checkValidate } from "../utils/validate";
import GoogleLogin from "./GoogleLogin";
import { useSignupMutation } from "../store/services/auth";
import WrappedContainer from "./common/WrappedContainer";
import Divider from "./common/Divider";

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState({});
  const [signup, { error }] = useSignupMutation();
  const handleFormSubmit = async () => {
    const [_email, _name, _password] = [
      emailRef.current,
      nameRef.current,
      passwordRef.current,
    ];
    const { errorField, isFormValid } = checkValidate([
      _name,
      _email,
      _password,
    ]);
    setErrorMessage(errorField);
    if (!isFormValid) return;

    await signup({
      _name: _name.value,
      _email: _email.value,
      _password: _password.value,
    });
  };

  return (
    <WrappedContainer className="mt-[57px]">
      <div className="md:w-6/12 lg:w-4/12 text-center w-8/12 m-auto">
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
            name="name"
            className="focus-visible:ring-1 focus-visible:ring-input-outline p-4 border-1 border-input-border"
          />
          {errorMessage.name && (
            <p className="text-red-700 font-medium text-xs text-right pt-1">
              {errorMessage.name}
            </p>
          )}
        </div>
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
              {errorMessage.password}
            </p>
          )}
        </div>
        {error && (
          <p className="text-red-700 font-medium text-xs text-right py-1">
            {error.data}
          </p>
        )}
        <Button
          className="bg-button-background hover:bg-button-background-hover w-full"
          onClick={() => handleFormSubmit()}
        >
          Continue
        </Button>
        <div className="my-3.5">
          <Divider />
        </div>
        <GoogleLogin />
      </div>
    </WrappedContainer>
  );
};
export default Signup;

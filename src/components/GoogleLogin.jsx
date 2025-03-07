import { Button } from "@/components/ui/button";
import { useGoogleSignInMutation } from "../store/services/auth";

const GoogleLogin = () => {
  const [googleSignIn] = useGoogleSignInMutation();
  const handleGoogleSignIn = async () => {
    await googleSignIn();
  };
  return (
    <Button
      className="w-full bg-sign-in-background text-black border-1 border-input-border hover:bg-sign-in-background-hover"
      onClick={() => handleGoogleSignIn()}
    >
      <img
        src="https://iphonecase.vercel.app/google-logo.svg"
        className="w-[18px] h-[18px]"
      />
      Continue with Google
    </Button>
  );
};
export default GoogleLogin;

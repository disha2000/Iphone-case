import { Button } from "@/components/ui/button";

const GoogleLogin = () =>{
    return (
        <Button className="w-full bg-sign-in-background text-black border-1 border-input-border hover:bg-sign-in-background-hover">
        <img
          src="https://iphonecase.vercel.app/google-logo.svg"
          className="w-[18px] h-[18px]"
        />
        Continue with Google
      </Button>
    )
}
export default GoogleLogin;
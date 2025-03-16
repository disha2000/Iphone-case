import { useRouteError } from "react-router-dom";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  const {
    status,
    statusText,
    error,
  } = useRouteError();
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-3.5">
      <h1 className="md:text-9xl text-8xl font-extrabold">{status}</h1>
      <h3 className="md:text-3xl text-2xl font-extrabold">{statusText}</h3>
      <p className="font-bold">{error?.message || 'Something went wrong'}</p>
      <Link to="/"><Button className="bg-button-background hover:bg-button-background-hover cursor-pointer">Go To Home</Button></Link>
    </div>
  );
};
export default ErrorPage;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F3F3] dark:bg-black">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-normal text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-[#A488F5] underline hover:text-[#9575e8]">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

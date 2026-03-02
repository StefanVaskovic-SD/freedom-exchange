import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-black flex flex-col items-center justify-between px-4 py-10 max-w-[480px] mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        {/* Icon */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#A488F5"/>
          <g clipPath="url(#clip0_2072_2173)">
            <path d="M28.8333 55C27.9167 55 27.1319 54.6736 26.4792 54.0208C25.8264 53.3681 25.5 52.5833 25.5 51.6667V40.6667L30.5 45.6667L37.1667 39L43.8333 45.6667L50.5 39L55.5 44V51.6667C55.5 52.5833 55.1736 53.3681 54.5208 54.0208C53.8681 54.6736 53.0833 55 52.1667 55H28.8333ZM28.8333 25H52.1667C53.0833 25 53.8681 25.3264 54.5208 25.9792C55.1736 26.6319 55.5 27.4167 55.5 28.3333V39.2917L50.5 34.2917L43.8333 40.9583L37.1667 34.2917L30.5 40.9583L25.5 35.9583V28.3333C25.5 27.4167 25.8264 26.6319 26.4792 25.9792C27.1319 25.3264 27.9167 25 28.8333 25Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_2072_2173">
              <rect width="40" height="40" fill="white" transform="translate(20 20)"/>
            </clipPath>
          </defs>
        </svg>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-foreground font-normal" style={{ fontSize: '64px', lineHeight: 1 }}>404</span>
          <span className="text-foreground font-normal" style={{ fontSize: '24px' }}>Page not found</span>
          <span className="text-foreground/70 font-normal text-center" style={{ fontSize: '20px' }}>
            The page you're looking for doesn't exist.
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate('/')}
        className="w-full h-14 rounded-lg text-xl font-normal bg-[#A488F5] text-white dark:text-black"
      >
        Back to home page
      </button>
    </div>
  );
};

export default NotFound;

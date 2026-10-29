import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Search, Compass } from 'lucide-react';
import { ChaseHorseLogo } from '../../components/ui/ChaseHorseLogo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full min-h-[70vh] bg-[#F4F1EA] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 shadow-xl space-y-6">
        
        <ChaseHorseLogo variant="dark" showTagline={false} className="w-48 mx-auto" />

        <div className="space-y-2">
          <span className="text-4xl font-extrabold font-mono text-[#FF4D16]">404</span>
          <h1 className="text-2xl font-extrabold text-[#171717]">Route Not Found</h1>
          <p className="text-xs text-[#625E58] leading-relaxed">
            The page you are looking for has been moved or does not exist in our operational directory.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            to="/"
            className="w-full py-3 bg-[#FF4D16] text-white rounded-xl text-xs font-bold hover:bg-[#E53E0B] transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/solutions"
            className="w-full py-2.5 bg-[#FAF8F5] border border-[#E2DED5] text-[#171717] rounded-xl text-xs font-bold hover:border-[#171717] transition-colors flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4 text-[#FF4D16]" />
            <span>Explore Service Solutions</span>
          </Link>
        </div>

      </div>
    </div>
  );
};


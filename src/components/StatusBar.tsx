import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <header className="flex w-full items-center gap-[40px_154px] justify-center pt-[21px] pb-[19px] px-4">
      <div className="self-stretch flex h-[22px] items-center gap-2.5 text-[17px] text-white font-[590] whitespace-nowrap text-center leading-none justify-center flex-1 shrink basis-[0%] my-auto pt-0.5">
        <time className="text-white self-stretch my-auto">
          9:41
        </time>
      </div>
      <div className="self-stretch flex min-h-[22px] items-center gap-[7px] justify-center flex-1 shrink basis-[0%] my-auto pt-px">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/18e7798cc871d157f21a75601bc9949c4a767d50?placeholderIfAbsent=true"
          className="aspect-[1.54] object-contain w-5 fill-white self-stretch shrink-0 my-auto"
          alt="Signal strength"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/1c4e5fb84c1e9693966922dd09491828626fec35?placeholderIfAbsent=true"
          className="aspect-[1.31] object-contain w-[17px] fill-white self-stretch shrink-0 my-auto"
          alt="Battery level"
        />
      </div>
    </header>
  );
};

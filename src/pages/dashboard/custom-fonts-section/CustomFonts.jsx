import React from "react";
import SplitTextComponent from "../../../components/SplitTextComponent";

const CustomFonts = () => {
  return (
    <div className="py-[3%]">
      <SplitTextComponent
        heading={
          <p className="whitespace-nowrap max-[400px]:whitespace-normal">
            You're just a few clicks away <br className="max-[400px]:hidden" /> from a form that actually <br className="max-[400px]:hidden" /> converts.
          </p>
        }
        description="Join hundreds who’ve already switched to forms that feel modern, smart, and captivating!"
      />

      <div className="group my-[2px] mt-[5%] mr-[2px] mr-auto mb-0 ml-auto flex w-fit items-center justify-center">
        <div className="flex h-[50px] w-0 shrink-0 items-center justify-center transition-[width] duration-300 group-hover:w-[50px]">
          <div className="flex h-[50px] w-[50px] shrink-0 origin-center scale-0 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-100">
            <svg width="27" height="27" className="text-white" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.8718 12.7011C26.1603 12.9895 26.1603 13.4572 25.8718 13.7457L21.1711 18.4466C20.8826 18.735 20.4149 18.735 20.1264 18.4466C19.838 18.1581 19.838 17.6904 20.1264 17.4019L24.3049 13.2234L20.1263 9.04496C19.8379 8.7565 19.8379 8.28881 20.1263 8.00034C20.4148 7.71187 20.8825 7.71187 21.171 8.00033L25.8718 12.7011ZM1.32031 13.2236L1.32031 12.485L25.3495 12.4847L25.3495 13.2234L25.3495 13.9621L1.32032 13.9623L1.32031 13.2236Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="shrink-0 rounded-full bg-[#ff633e] px-(--fs40) py-(--fs16) group-hover:bg-[#000]">
          <p className="whitespace-nowrap text-white">Create forms for free</p>
        </div>

        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-visible transition-[width] duration-300 group-hover:w-0">
          <div className="flex h-[50px] w-[50px] shrink-0 origin-center scale-100 items-center justify-center rounded-full bg-[#ff633e] transition-transform duration-300 group-hover:scale-0 group-hover:bg-[#000]">
            <svg width="27" height="27" className="text-white" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.8718 12.7011C26.1603 12.9895 26.1603 13.4572 25.8718 13.7457L21.1711 18.4466C20.8826 18.735 20.4149 18.735 20.1264 18.4466C19.838 18.1581 19.838 17.6904 20.1264 17.4019L24.3049 13.2234L20.1263 9.04496C19.8379 8.7565 19.8379 8.28881 20.1263 8.00034C20.4148 7.71187 20.8825 7.71187 21.171 8.00033L25.8718 12.7011ZM1.32031 13.2236L1.32031 12.485L25.3495 12.4847L25.3495 13.2234L25.3495 13.9621L1.32032 13.9623L1.32031 13.2236Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-[8%] w-[95%] border-[1px] border-b border-[#f6f6f6]"></div>
    </div>
  );
};

export default CustomFonts;

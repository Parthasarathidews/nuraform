import React from "react";

const Copyrights = () => {
  return (
    <div className="flex justify-between text-[#8d7c7c] w-[95%] mx-auto py-[5%] max-[577px]:flex-col max-[577px]:items-center max-[577px]:gap-[5%] ">
      <p>© 2025 Nuraform. All rights reserved.</p>
      <div className="flex gap-[15%] w-[30%] justify-end max-[577px]:w-[100%] max-[577px]:justify-center">
        <p className="cursor-pointer hover:text-[#FF633E]">Terms & Use</p>
        <p className="cursor-pointer hover:text-[#FF633E]">Privacy Policy</p>
      </div>
    </div>
  );
};

export default Copyrights;

import React from "react";
import EmailInput from "./EmailInput";

const EmailForm = () => {
  return (
    <div className="h-auto w-full flex items-center justify-center bg-[#ff5d7b] px-4 py-10 sm:py-14 relative z-10">
      <div className="max-w-lg w-full rounded-xl flex flex-col z-20 px-6 py-8 sm:px-10 sm:py-12 items-center justify-evenly bg-[#fa889d] text-center shadow-lg">
        <h4 className="font-bold text-lg sm:text-xl">Subscribe to our Newsletter</h4>
        <p className="text-sm sm:text-base font-mono">
          Elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <EmailInput />
      </div>
    </div>
  );
};

export default EmailForm;

import { useState, useEffect } from "react";
import { RegisterDialog } from "./auth/RegisterAuth";
import { LoginDialog } from "./auth/LoginAuth";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Open dialog when mode is chosen
  useEffect(() => {
    if (isRegister || isLog) {
      setIsOpen(true);
    }
  }, [isRegister, isLog]);

  // Reset mode when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setIsRegister(false);
      setIsLog(false);
    }
  }, [isOpen]);

  return (
    <div className="w-full flex gap-3 flex-col text-slate-800">
      <button
        className="py-2 px-6 bg-[#335c4c] rounded text-bold text-white"
        onClick={() => setIsRegister(true)}
      >
        Register
      </button>
      <button
        className="py-2 px-6 bg-[#5C4033] rounded text-bold text-white"
        onClick={() => setIsLog(true)}
      >
        Login
      </button>

      {isRegister && (
        <RegisterDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      {isLog && <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Auth;

"use client";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const wallet = useWallet();
  const router = useRouter();
  const [loginType, setLoginType] = useState<"creator" | "participant" | null>(null);
  const [walletStatus, setWalletStatus] = useState<string | null>(null);
  const pathName = usePathname();

  // Load from localStorage on mount
  useEffect(() => {
    const storedType = localStorage.getItem("loginType") as "creator" | "participant" | null;
    const storedStatus = localStorage.getItem("walletStatus");

    if (storedType) {
      setLoginType(storedType);
    }
    if (storedStatus) {
      setWalletStatus(storedStatus);
    }
  }, []);

  // Sync wallet.status to localStorage
  useEffect(() => {
    if (wallet.status) {
      localStorage.setItem("walletStatus", wallet.status);
      setWalletStatus(wallet.status);
    }
  }, [wallet.status]);

  // Redirect based on wallet and loginType
  useEffect(() => {
    if (wallet.status === "connected" && loginType) {
      if (loginType === "creator") {
        router.push("/form_creator/dashboard");
      } else if (loginType === "participant") {
        router.push("/form_participants/dashboard");
      }
    }
    if (wallet.status !== "connected") {
      router.push("/");
    }
  }, [wallet.status, loginType]);

  const handleLoginType = (type: "creator" | "participant") => {
    setLoginType(type);
    localStorage.setItem("loginType", type);
  };

  return (
    <header className="top-0 left-0 w-full transparent z-50">
      <div className="flex justify-between px-5 py-5">
        <Link href={"/form_participants/dashbboard"}>
         <div>
          <h1 className="font-bold text-3xl">📜 FormCraft</h1>
        </div>
        </Link>
       

        {wallet.status === "connected" && loginType === "participant" && (
           <>
                <div className="flex space-x-[45px] font-bold items-center justify-between text-xl">
                    <Link href={"/form_participants/rewards"}>
                        <p className={`transition-all duration-200 ${pathName === "/form_participants/rewards" ? "underline underline-offset-4 text-blue-600 decoration-blue-600" : "text-gray-700 hover:text-blue-500"}`}> Rewards </p>
                    </Link>

                    <Link href={"/form_participants/trade"}>
                    <p className={`transition-all duration-200 ${pathName === "/form_participants/trade" ? "underline underline-offset-4 text-blue-600 decoration-blue-600" : "text-gray-700 hover:text-blue-500"}`}>Trade</p>
                      
                    </Link>

                    <Link href={"/form_participants/battle"}>
                    <p className={`transition-all duration-200 ${pathName === "/form_participants/battle" ? "underline underline-offset-4 text-blue-600 decoration-blue-600" : "text-gray-700 hover:text-blue-500"}`}>Battle</p>
                
                    </Link>
                </div>
           </>
          )}

        <div className="flex space-x-5">
          {wallet.status !== "connected" && (
            <>
              <div onClick={() => handleLoginType("creator")}>
                <ConnectButton
                  label="Creator Login"
                  className="w-[200px] bg-blue-700 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-800"
                />
              </div>
              <div onClick={() => handleLoginType("participant")}>
                <ConnectButton
                  label="Participant Login"
                  className="w-[200px] bg-blue-600 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500"
                />
              </div>
            </>
          )}

           

          {wallet.status === "connected" && loginType === "creator" && (
            <ConnectButton
              label="Creator Connected"
              className="w-[250px] bg-blue-900 text-white"
            />
          )}

          {wallet.status === "connected" && loginType === "participant" && (
            <ConnectButton
              label="Participant Connected"
              className="w-[250px] bg-blue-600 text-white"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

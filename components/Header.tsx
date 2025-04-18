"use client";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  const wallet = useWallet();
  const router = useRouter();
  const [loginType, setLoginType] = useState<"creator" | "participant" | null>(
    null
  );

  useEffect(() => {
    if (wallet.status === "connected" && loginType) {
      if (loginType === "creator") {
        router.push("/form_creator/dashboard");
      } else if (loginType === "participant") {
        router.push("/form_participants/dashboard");
      }
    }
    if(wallet.status !== "connected"){
        router.push("/")
    }
  }, [wallet.status, loginType]);
  return (
    <header className="sticky top-0 left-0 w-full transparent z-50">
      <div className="flex justify-between px-5 py-5">
        <div>
          <h1 className="font-bold text-3xl">📜 FormCraft</h1>
        </div>
        <div className="flex space-x-5">
          {wallet.status !== "connected" && (
            <>
              <div onClick={() => setLoginType("creator")}>
                <ConnectButton
                  label="Creator Login"
                  className="w-[200px] bg-blue-900 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-800"
                />
              </div>
              <div onClick={() => setLoginType("participant")}>
                <ConnectButton
                  label="Participant Login"
                  className="w-[200px] bg-blue-600 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500"
                />
              </div>
            </>
          )}

          {/* Show only Creator button when connected as creator */}
          {wallet.status === "connected" && loginType === "creator" && (
            <ConnectButton
              label="Creator Connected"
              className="w-[250px] bg-blue-900 text-white "
            />
          )}

        {wallet.status === "connected" && loginType === "participant" && (
            <ConnectButton
              label="Creator Connected"
              className="w-[250px] bg-blue-600 text-white"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

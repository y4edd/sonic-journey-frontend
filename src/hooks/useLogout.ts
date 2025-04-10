"use client";

import { logout } from "@/utils/apiFunc/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type UseLogout = () => {
  logoutUser: () => Promise<void>;
};

export const useLogout: UseLogout = () => {
  const router = useRouter();
  const logoutUser = async () => {
    try {
      await logout();
      toast.success("ログアウトが完了しました！", {
        position: "top-center",
        autoClose: 1000,
        closeButton: true,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch {
      toast.error("サーバーエラーが発生しました。");
    }
  };

  return {
    logoutUser,
  };
};

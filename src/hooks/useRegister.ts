"use client";

import type { FormData } from "@/types/user";
import { SignUp } from "@/utils/apiFunc/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type UserRegister = () => {
  RegisterUser: (data: FormData) => Promise<void>;
  serverError: string;
};

export const userRegister: UserRegister = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>("");

  const RegisterUser = async (data: FormData) => {
    try {
      setServerError("");
      // 外部宣言の非同期関数を呼び出す
      await SignUp(data);
      toast.success("アカウント登録が完了しました！", {
        position: "top-center",
        autoClose: 1000,
        closeButton: true,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/user/login");
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("予期しないエラーが発生しました");
      }
    }
  };
  return {
    RegisterUser,
    serverError,
  };
};

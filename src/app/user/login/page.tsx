"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import FormInput from "@/components/user/Form/FormInput";
import Guide from "@/components/user/Guide/Guide";
import Information from "@/components/user/Information/Information";
import { loginSchema } from "@/lib/validation";
import type { FormData, loginData } from "@/types/user";
import { login } from "@/utils/apiFunc/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./page.module.css";

const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  // React Hook Formでフォーム管理
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  // オートフィル後のDOMから値を読み取り、それをRHFに流し込む
  // （RHFがオートフィルの値を取得しないため）
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const emailInput = document.querySelector<HTMLInputElement>("input[name='email']");
    const passwordInput = document.querySelector<HTMLInputElement>("input[name='password']");

    setTimeout(() => {
      if (emailInput?.value) {
        setValue("email", emailInput.value);
      }
      if (passwordInput?.value) {
        setValue("password", passwordInput.value);
      }
      // オートフィルが反映されるのを少し待つ
    }, 200);
  }, []);

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: loginData) => {
    try {
      setServerError("");
      // 外部宣言の非同期関数を呼び出す
      await login(data);
      toast.success("ログインに成功しました！", {
        position: "top-center",
        autoClose: 1000,
        closeButton: true,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/login", title: "ログイン" },
        ]}
      />
      <div>
        <Information text="ログイン" />
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="メールアドレス"
            id="mailAddress"
            type="email"
            name="email"
            placeholder="tani@example.com"
            register={register}
            error={errors.email}
          />
          <FormInput
            label="パスワード"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            register={register}
            error={errors.password}
          />
          <Button type="submit" className={ButtonStyles.register} text={"ログイン"} />
          <div className={styles.errorMessage}>{serverError}</div>
        </form>
      </div>
      <Guide href="/user/register" guideText="新規登録は" message="こちら" />
    </>
  );
};

export default Login;

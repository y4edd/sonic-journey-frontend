"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import FormInput from "@/components/user/Form/FormInput";
import Information from "@/components/user/Information/Information";
import { registerSchema } from "@/lib/validation";
import type { FormData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./page.module.css";
import "react-toastify/dist/ReactToastify.css";
import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import { fetchUser } from "@/utils/apiFunc";
import { fetchUserInfo, patchUser } from "@/utils/apiFunc/user";

const Edit = () => {
  // useStateでサーバーエラーの管理
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // React hook formでフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  // ユーザーIDを取得
  const loadUser = async () => {
    try {
      const data = await fetchUser();
      if (data?.id) {
        setUserId(data.id);
      } else {
        setUserId(null);
      }
    } catch {
      setServerError("サーバーエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // ユーザー情報を取得
  const loadUserInfo = async () => {
    try {
      const data = await fetchUserInfo();
      if (data) {
        setUserInfo({ name: data.name, email: data.email, password: data.password });
      }
    } catch {
      setServerError("ユーザー情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    loadUser();
    loadUserInfo();
    const passwordInput = document.querySelector<HTMLInputElement>("input[name='password']");
  
    setTimeout(() => {
      if (passwordInput?.value) {
        userInfo.password = passwordInput.value;
      }
      // オートフィルが反映されるのを少し待つ
    }, 200);
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  if (userId === null) {
    return <UnauthorizedAccess />;
  }
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await patchUser(data);

      if(response?.ok) {
        toast.success("アカウント情報の編集が完了しました", {
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
      } else {
        const res = await response?.json();
        setServerError(res.message);
      }
    } catch (err) {
      console.log(err);
      setServerError("予期せぬエラーが発生しました");
    }
  };

  const handleClick = () => {
    router.push(`/user/${userId}/info`);
  };

  // ユーザー名編集のハンドラ
  const handleUserNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  // email編集のハンドラ
  const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: `/user/${userId}/info`, title: "アカウント情報" },
          { link: `/user/${userId}/edit`, title: "アカウント編集" },
        ]}
      />
      <div>
        <Information text="アカウント編集" />
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="ユーザー名"
            id="userName"
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleUserNameValue}
            placeholder="tanitune"
            register={register}
            error={errors.name}
          />
          <FormInput
            label="メールアドレス"
            id="mailAddress"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleEmailValue}
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
          <FormInput
            label="パスワード確認"
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="password"
            register={register}
            error={errors.passwordConfirm}
          />
          <Button type="submit" className={ButtonStyles.register} text={"更新"} />
          <Button
            type="button"
            className={ButtonStyles.return}
            text={"戻る"}
            onClick={handleClick}
          />
          <div className={styles.errorMessage}>{serverError}</div>
        </form>
      </div>
    </>
  );
};

export default Edit;

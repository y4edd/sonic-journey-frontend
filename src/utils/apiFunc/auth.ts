import type { loginData } from "@/types/user";

export const login = async (data: loginData) => {
  const response = await fetch("http://localhost:3005/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    // これないとトークンがcookieに保存されない
    // （デフォルトで下記の設定になっていないっぽい）
    credentials: "include",
  });

  if (!response.ok) {
    // 詳細なエラーメッセージ取得
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const logout = async () => {
  const response = await fetch("http://localhost:3005/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    // 詳細なエラーメッセージ取得
    const error = await response.json();
    throw new Error(error.message);
  }
};

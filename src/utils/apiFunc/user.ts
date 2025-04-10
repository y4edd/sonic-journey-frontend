import { FormData } from "@/types/user";

export const SignUp = async (data: FormData) => {

  const response = await fetch("http://localhost:3005/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    // 詳細なエラーメッセージ取得
    const error = await response.json();
    throw new Error(error.message);
  }
}

// ユーザー情報を取得する非同期処理
export const fetchUserInfo = async () => {
  try {
    const response = await fetch("http://localhost:3005/user/me", {
      credentials: "include",
    });
    const res = await response.json();
    if (!response.ok) {
      console.error(res.message);
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const patchUser = async (data: FormData) => {
  try {
    const response = await fetch("http://localhost:3005/user/me", {
      method: "PATCH",
      // 送るならheaders必要
      headers: {
        "Content-Type": "application/json"
      },     
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}


export const deleteUser = async () => {
  try {
    const response = await fetch("http://localhost:3005/user/me", {
      method: "DELETE",  
      credentials: "include",
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}
// ログイン状態を確認し、idを返す
export const fetchUser = async () => {
  try {
    const response = await fetch("/api/user/checkLogin", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("ログイン状態が確認できませんでした");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// サーバーサイドからログインしているか確認する関数（Cookieのtokenを引数にとる）
export const checkLoggedInServer = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/api/user/checkLogin", {
      cache: "no-cache",
      headers: {
        Cookie: token,
      },
    });

    const responseMessage = await response.json();

    if (!response.ok || responseMessage.message === "ログインが必要です") {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 引数のmusic_idが登録されているユーザのプレイリスト情報を取得する関数
export const getAddPlaylists = async (user: string, id: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/playlistAddCheck?userId=${user}&musicId=${id}`,
      {
        cache: "no-cache",
      },
    );
    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

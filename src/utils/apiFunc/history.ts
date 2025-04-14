// 再生履歴を保存する関数
// songIdには保存したい楽曲のIDを入力
export const savePlayHistory = async (songId: number) => {
  try {
    const res = await fetch("http://localhost:3005/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ songId }),
    });

    if (!res.ok) {
      throw new Error("再生履歴の保存に失敗しました");
    }
  } catch (error) {
    console.error(error);
  }
};

// ログインユーザーの試聴履歴の楽曲idを取得する関数
export const getPlayHistory = async (token: string, limit: number) => {
  try {
    const response = await fetch(`http://localhost:3005/history?limit=${limit}`, {
      cache: "no-cache",
      headers: {
        Authorization: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("再生履歴の取得に失敗しました");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 再生履歴を削除する関数
export const deletePlayHistory = async (userId: string) => {
  try {
    const res = await fetch("http://localhost:3005/history", {
      cache: "no-cache",
      method: "DELETE",
      headers: { Authorization: `${userId}` },
    });
    if (!res.ok) {
      throw new Error("再生履歴の削除に失敗しました");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

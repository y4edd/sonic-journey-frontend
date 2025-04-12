export const postSong = async (id: number) => {
  const response = await fetch(`http://localhost:3005/favorite/song/${id}`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    const err = await response.json();
    alert(err.message);
    return;
  }
  alert("お気に入りに登録されました");
};

// DBからお気に入り楽曲の楽曲idと更新日を取得する関数（Cookieのtokenを引数にとる）
export const getFavoriteSongs = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3005/favorite/song", {
      // サーバーサイドのため、Authorizationヘッダーにtokenを乗っける
      headers: {
        Authorization: `${token}`,
      },
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error("データが見つかりませんでした");
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

// DBからお気に入り楽曲の楽曲idと更新日を取得する関数（userIdを引数にとる）
export const getFavoriteSongsForFav = async (userId: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/getFavoriteSongsForFav", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

// お気に入り楽曲を削除する関数
// 注意: cookieの認証があるためサーバーサイドからは呼び出せない
export const deleteFavoriteSongs = async (songIds: number[]) => {
  try {
    const res = await fetch("http://localhost:3005/favorite/song", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songIds }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("お気に入り楽曲の削除に失敗しました");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// DBからお気に入りアーティストのアーティストIDと更新日を取得する関数（userIdを引数にとる）
export const getFavoriteArtistsForFav = async () => {
  try {
    const res = await fetch("http://localhost:3005/favorite/artist", {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavotriteArtist = async (id: number) => {
  try {
    const response = await fetch("http://localhost:3005/favorite/artist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artistIds: [id],
      }),
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      alert(error.message);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

export const postFavoriteArtist = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3005/favorite/artist/${id}`, {
      method: "POST",
      credentials: "include",
    });
  
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      alert(error.message);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

// 人気新着楽曲を取得する関数

// limitには取得したい件数を入力
export const getNewSongs = async (limit: number) => {
  try {
    const res = await fetch(`http://localhost:3005/song/new?limit=${limit}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    const result = await res.json();

    if (result.length < limit && limit === 4) {
      for (let i = 0; i <= limit - result.length; i++) {
        result.push({
          id: 0,
          title: "title",
          cover_xl: "/images/defaultsong.png",
          release_date: "20xx-xx-xx",
          artist: {
            id: 1,
            name: "artist",
          },
        });
      }
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

// ユーザー毎のプレイリストを取得する関数
export const getUserPlaylist = async (user_id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/user/playlistCheck?user_id=${user_id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// ログイン状態を確認し、idを返す
export const fetchUser = async () => {
  try {
    const response = await fetch("/api/user/checkLogin", {
      credentials: "include",
    }
    );
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

// トークンからuserIDを取得する関数（Cookieのtokenを引数にとる）
export const getUserId = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/user/checkLogin", {
      cache: "no-cache",
      headers: {
        Cookie: token,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return data.message;
    }
    return data.id;
  } catch (error) {
    console.error(error);
    return error;
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

// DBからお気に入りアーティストのアーティストIDと更新日を取得する関数（userIdを引数にとる）
export const getFavoriteArtistsForFav = async (userId: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/getFavoriteArtistsForFav", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

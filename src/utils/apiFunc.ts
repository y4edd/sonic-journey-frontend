// 人気新着楽曲を取得する関数

// limitには取得したい件数を入力
export const getNewSongs = async (limit: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/newSongsSearch?limit=${limit}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    const result = await res.json();

    if (result.resultData.length < limit && limit === 4) {
      for (let i = 0; i <= limit - result.resultData.length; i++) {
        result.resultData.push({
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

// シングルランキング楽曲を取得する関数
// limitには取得したい件数を入力
export const getRankSingleSongs = async (limit: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/rankSingleSongSearch?limit=${limit}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    const result = await res.json();

    if (result.resultData.length < limit && limit === 4) {
      for (let i = 0; i <= limit - result.resultData.length; i++) {
        result.resultData.push({
          id: 0,
          title: "title",
          artist: {
            id: 1,
            name: "artist",
          },
          album: {
            id: 1,
            title: "album",
            cover_xl: "/images/defaultsong.png",
          },
        });
      }
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

// ジャンルごとの情報を取得する関数
export const getGenreInfo = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/getGenreArtistId", {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("データが見つかりませんでした");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

// 楽曲のidから楽曲情報を取得する関数
// songには楽曲のidを入力
export const getSong = async (song: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/songSearch?song=${song}`, {
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

// アーティストの人気曲を取得する関数
// artistIdにはアーティストのidを、limitには取得件数を入力
export const getArtistSongs = async (artistId: number, limit: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/artistFavoriteSongs?artistId=${artistId}&limit=${limit}`,
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

// アーティストidからアーティスト情報を取得する関数
// artistにはアーティストidを入力
export const getArtist = async (artist: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/artistSearch?artist=${artist}`, {
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

// アルバムidからアルバム情報を取得する関数
// albumにはアルバムidを入力
export const getAlbum = async (album: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/albumSearch?album=${album}`, {
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

// アーティストのアルバムをlimit件取得する関数
// albumにはアーティスト名を入力
export const getArtistAlbum = async (artist: string, limit?: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/artistAlbums?artistName=${artist}&limit=${limit}`,
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

// FreeSearchの検索ワードを使用して楽曲を取得する関数
export const getSearchSongs = async (freeWord: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/freeSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ freeWord }),
      cache: "no-cache",
    });

    // 失敗した場合の処理
    if (!res.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return await res.json();
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
    const response = await fetch("/api/user/checkLogin");
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

// ユーザー情報を取得する非同期処理
export const fetchUserInfo = async () => {
  try {
    const response = await fetch("/api/user/getUserInfo");
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`エラー: ${response.status} - ${data.message}`);
    }
    return data;
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

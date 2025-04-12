// アーティストの人気曲を取得する関数
// artistIdにはアーティストのidを、limitには取得件数を入力
export const getArtistSongs = async (artistId: number, limit: number) => {
  try {
    const response = await fetch(
      `http://localhost:3005/song?artist-id=${artistId}&limit=${limit}`,
      {
        cache: "no-cache",
      },
    );
    if (!response.ok) {
      throw new Error("データが見つかりませんでした");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

// FreeSearchの検索ワードを使用して楽曲を取得する関数
export const getSearchSongs = async (freeWord: string) => {
  try {
    const response = await fetch(`http://localhost:3005/song?word=${freeWord}`, {
      method: "GET",
      cache: "no-cache",
    });
    // 失敗した場合の処理
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
export const getSong = async (song: string) => {
  try {
    const response = await fetch(`http://localhost:3005/song/${song}`, {
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

// シングルランキング楽曲を取得する関数
// limitには取得したい件数を入力
export const getRankSingleSongs = async (limit: number) => {
  try {
    const res = await fetch(`http://localhost:3005/song/ranking?limit=${limit}`, {
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
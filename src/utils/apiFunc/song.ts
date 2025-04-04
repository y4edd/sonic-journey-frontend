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

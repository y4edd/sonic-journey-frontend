// アルバムidからアルバム情報を取得する関数
// albumにはアルバムidを入力
export const getAlbum = async (album: number) => {
  try {
    const response = await fetch(`http://localhost:3005/album/${album}`, {
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

// アーティストのアルバムをlimit件取得する関数
// albumにはアーティスト名を入力
export const getArtistAlbum = async (artist: string, limit?: number) => {
  try {
    const response = await fetch(`http://localhost:3005/album?artist=${artist}&limit=${limit}`, {
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

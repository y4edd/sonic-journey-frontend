// アーティストidからアーティスト情報を取得する関数
// artistにはアーティストidを入力
export const getArtist = async (artist: number) => {
  try {
    const response = await fetch(`http://localhost:3005/artist/${artist}`, {
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

// 検索ワードを使用してアーティストを取得する関数
export const getFreeArtist = async (artist: string, limit: string) => {
  try {
    const res = await fetch(`http://localhost:3005/artist?word=${artist}&limit=${limit}`, {
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

// ジャンルごとのアーティスト情報を取得する関数
// genreにはgenreのid
export const getGenreArtist = async (genre: number) => {
  try {
    const res = await fetch(`http://localhost:3005/artist?genre=${genre}`, {
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

// GenreArtist.tsxにて下記呼び出し
//  `http://localhost:3005/artist?genre=${selectGenre}`

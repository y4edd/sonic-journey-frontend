// ジャンルごとの情報を取得する関数
export const getGenreInfo = async () => {
  try {
    const response = await fetch("http://localhost:3005/genre", {
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

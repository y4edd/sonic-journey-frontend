import { SpecialOverView, SpecialSongs } from "@/types/deezer";

export const getSpecialImage = async () => {
  const response = await fetch("http://localhost:3005/pick", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("特集ページの情報の取得に失敗しました");
  }
  const images: SpecialOverView[] = await response.json();
  return images;
};

// Pick_SongテーブルからPick_idを元に楽曲のapi_song_idを取得
export const getSpecialSongs = async (id: number) => {
  const response = await fetch(`http://localhost:3005/pick/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("特集ページのプレイリストの情報の取得に失敗しました");
  }
  const specialSongs: SpecialSongs[] = await response.json();
  return specialSongs;
};

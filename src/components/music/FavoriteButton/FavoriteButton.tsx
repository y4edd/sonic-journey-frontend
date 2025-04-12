"use client";

import type { favoriteSong } from "@/types/favorite";
import { deleteFavoriteSongs, postSong } from "@/utils/apiFunc/favorite";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({
  id,
  favoriteSongIDs,
}: { id: number; favoriteSongIDs: favoriteSong[] }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav = async () => {
    const songIds = favoriteSongIDs.map((song: favoriteSong) => Number(song.api_song_id));
    // NOTE: もしfavoriteSongsのなかのsongIdとidに、一致するものがあればisFavをtrueにする
    if (songIds.includes(id)) {
      setIsFav(true);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    doneFav();
  }, []);

  // お気に入り楽曲追加
  const postFavorite = async (id: number) => {
    try {
      await postSong(id);
      setIsFav(true);
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  // お気に入り楽曲削除
  const deleteFavorite = async (id: number[]) => {
    try {
      await deleteFavoriteSongs(id);
      alert("お気に入り楽曲から削除されました");
      setIsFav(false);
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  return (
    <>
      {isFav ? (
        <>
          <button
            type="button"
            className={styles.songInfoAddedFavorite}
            onClick={() => deleteFavorite([id])}
          >
            <DoneIcon />
            お気に入りに追加済み
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className={styles.songInfoAddFavorite}
            onClick={() => postFavorite(id)}
          >
            <FavoriteBorderIcon />
            お気に入りに追加
          </button>
        </>
      )}
    </>
  );
};

export default FavoriteButton;

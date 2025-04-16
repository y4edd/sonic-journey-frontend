"use client";

import type { favoriteArtist } from "@/types/favorite";
import { deleteFavotriteArtist, postFavoriteArtist } from "@/utils/apiFunc/favorite";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import styles from "./ArtistFavoriteButton.module.css";

const ArtistFavoriteButton = ({
  id,
  favoriteArtists,
}: { id: number; favoriteArtists: favoriteArtist[] }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav = async () => {
    const ArtistIds = favoriteArtists.map((artist: favoriteArtist) => Number(artist.api_artist_id));

    if (ArtistIds.includes(id)) {
      setIsFav(true);
    }
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    // ログインしている時のみ
    if (favoriteArtists) {
      doneFav();
    }
  }, []);

  const postFavorite = async (id: number) => {
    try {
      await postFavoriteArtist(id);
      setIsFav(true);
    } catch (error) {
      console.error(error);
      alert("サーバーエラーです");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFavotriteArtist([id]);
      alert("お気に入りアーティストから削除されました");
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
            className={styles.artistInfoAddedFavorite}
            onClick={() => handleDelete(id)}
          >
            <DoneIcon />
            お気に入りに追加済み
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className={styles.artistInfoAddFavorite}
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

export default ArtistFavoriteButton;

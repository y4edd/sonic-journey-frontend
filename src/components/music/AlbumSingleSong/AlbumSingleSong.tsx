"use client";

import { useAlbumAudio } from "@/context/AlbumAudioContext";
import type { favoriteSong } from "@/types/favorite";
import { deleteFavoriteSongs, postSong } from "@/utils/apiFunc/favorite";
import { savePlayHistory } from "@/utils/apiFunc/history";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AddPlaylist } from "../AddPlaylist/AddPlaylist";
import AlbumSingleSongAudio from "../AlbumSingleSongAudio/AlbumSingleSongAudio";
import styles from "./AlbumSingleSong.module.css";
import { PlaylistProps } from "@/types/playlist";

type AlbumSingleSongProps = {
  id: number;
  num: number;
  title: string;
  preview: string;
  favSongIDs: favoriteSong[];
  playlists: PlaylistProps[];
};

const AlbumSingleSong = ({ id, num, title, preview, favSongIDs, playlists }: AlbumSingleSongProps) => {
  const [isFav, setIsFav] = useState<boolean>(false);
  // コンテキストからstateを呼び出す
  const { currentlyPlayingId, setCurrentlyPlayingId } = useAlbumAudio();

  // この楽曲が再生中がどうか返す
  const isPlaying = currentlyPlayingId === id;

  // 再生中の楽曲のidをstateに格納
  const handlePlay = async () => {
    setCurrentlyPlayingId(id);
    await savePlayHistory(id);
  };

  // 止めたらstateから削除
  const handlePause = () => {
    setCurrentlyPlayingId(null);
  };

  // 楽曲をナンバリングするための記述
  const displayNum = num.toString().padStart(2, "0");

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav = async () => {
    const songIds = favSongIDs.map((song) => Number(song.api_song_id));

    if (songIds.includes(id)) {
      setIsFav(true);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    doneFav();
  }, []);

  // 楽曲をお気に入り登録
  const postFavorite = async () => {
    try {
      await postSong(id);
      setIsFav(true);
    } catch (error) {
      console.error(error);
    }
  };

  // お気に入り楽曲削除
  const deleteFavorite = async () => {
    try {
      const response = await deleteFavoriteSongs([id]);
      if (!response) {
        console.error(response);
        return;
      }

      alert("お気に入り楽曲から削除されました");
      setIsFav(false);
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  return (
    <div className={styles.albumSingleContent}>
      <AlbumSingleSongAudio
        preview={preview}
        handlePlay={handlePlay}
        handlePause={handlePause}
        isPlaying={isPlaying}
      />
      <div className={styles.albumSingleInfo}>
        <p>
          <Link href={`/music/${id}`}>
            {displayNum}: {title}
          </Link>
        </p>

        <div className={styles.play}>
          <AddPlaylist id={id} text="" playlists={playlists} />
        </div>

        {isFav ? (
          <>
            <button type="button" onClick={deleteFavorite} className={styles.deleteButton}>
              <DoneIcon
                sx={{
                  fontSize: 16,
                  color: "#a9a9a9",
                  cursor: "pointer",
                }}
                role="img"
                aria-hidden="false"
              />
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={postFavorite} className={styles.postButton}>
              <FavoriteIcon
                sx={{
                  fontSize: 16,
                  color: "#fc9aff",
                  cursor: "pointer",
                }}
                role="img"
                aria-hidden="false"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumSingleSong;

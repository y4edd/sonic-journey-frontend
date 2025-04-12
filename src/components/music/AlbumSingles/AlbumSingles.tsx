"use client";

import { AlbumAudioProvider } from "@/context/AlbumAudioContext";
import type { AlbumSingle } from "@/types/deezer";
import AlbumSingleSong from "../AlbumSingleSong/AlbumSingleSong";
import styles from "./AlbumSingles.module.css";
import { favoriteSong } from "@/types/favorite";

type AlbumSong = {
  id: number;
  title: string;
  preview: string;
};

const AlbumSingles = ({ singles, favSongIDs }: { singles: AlbumSingle[], favSongIDs:favoriteSong[] }) => {
  return (
    // Providerでラップすると、子孫コンポーネントがコンテキストにアクセスできるようになる
    <AlbumAudioProvider>
      <div className={styles.albumSinglesContent}>
        {singles.map((song: AlbumSong, index: number) => {
          return (
            <div key={song.id} className={styles.albumSingleSong}>
              <AlbumSingleSong
                id={song.id}
                title={song.title}
                preview={song.preview}
                num={index + 1}
                favSongIDs={favSongIDs}
              />
            </div>
          );
        })}
      </div>
    </AlbumAudioProvider>
  );
};

export default AlbumSingles;

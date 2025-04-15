"use client";

import { AlbumAudioProvider } from "@/context/AlbumAudioContext";
import type { AlbumSingle } from "@/types/deezer";
import type { favoriteSong } from "@/types/favorite";
import AlbumSingleSong from "../AlbumSingleSong/AlbumSingleSong";
import styles from "./AlbumSingles.module.css";
import { PlaylistProps } from "@/types/playlist";

type AlbumSong = {
  id: number;
  title: string;
  preview: string;
};

const AlbumSingles = ({
  singles,
  favSongIDs,
  playlists,
}: { singles: AlbumSingle[]; favSongIDs: favoriteSong[]; playlists: PlaylistProps[] }) => {
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
                playlists={playlists}
              />
            </div>
          );
        })}
      </div>
    </AlbumAudioProvider>
  );
};

export default AlbumSingles;

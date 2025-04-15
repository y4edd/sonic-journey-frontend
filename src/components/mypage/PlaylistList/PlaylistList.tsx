import type { Playlist } from "@/types/deezer";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import styles from "./PlaylistList.module.css";
import { PlaylistProps } from "@/types/playlist";

const PlaylistList = ({ playlists }: { playlists: PlaylistProps[] }) => {
  return (
    <div className={styles.playlistListContainer}>
      {playlists.length === 0 ? (
        <p className={styles.noPlaylistMessage}>プレイリストは登録されていません</p>
      ) : (
        <ul>
          {playlists.map((playlist: PlaylistProps) => {
            return (
              <li key={playlist.id}>
                <PlaylistItem playlist={playlist} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PlaylistList;

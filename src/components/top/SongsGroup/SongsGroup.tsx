import type { DeezerSong } from "@/types/deezer";
import SongContent from "../SongContent/SongContent";
import styles from "./SongsGroup.module.css";

const SongsGroup = ({
  songs,
  url,
}: {
  songs: DeezerSong[];
  url: string;
}) => {
  return (
    <div className={styles.newSongGroup}>
      {songs.map((song: DeezerSong) => {
        return <SongContent song={song} url={url} key={song.id} />;
      })}
    </div>
  );
};

export default SongsGroup;

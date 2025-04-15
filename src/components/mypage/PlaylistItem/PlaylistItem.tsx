import type { PlaylistProps } from "@/types/playlist";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import styles from "./PlaylistItem.module.css";

const PlaylistItem = ({ playlist }: { playlist: PlaylistProps }) => {
  return (
    <Link href={`/mypage/playlist/${playlist.id}`}>
      <div className={styles.playlistContainer}>
        <div className={styles.playlistInfo}>
          <p>{playlist.name}</p>
        </div>
        <ArrowForwardIosIcon fontSize="small" color="disabled" />
      </div>
    </Link>
  );
};

export default PlaylistItem;

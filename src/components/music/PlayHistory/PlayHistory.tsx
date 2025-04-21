import type { PlayHistorySong } from "@/types/deezer";
import { getPlayHistory } from "@/utils/apiFunc/history";
import { getSong } from "@/utils/apiFunc/song";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import Image from "next/image";
import Link from "next/link";
import styles from "./PlayHistory.module.css";

const PlayHistory = async () => {
  // クッキーからトークン取得
  const token = await getTokenFromCookie();

  if (!token) {
    return (
      <div className={styles.playHistoryGroup}>
        <Link href="/user/login" className={styles.noLoginHistory}>
          ログインユーザーの機能です
        </Link>
      </div>
    );
  }
  // ログインユーザーの試聴履歴楽曲のidを取得
  const playHistory = await getPlayHistory(token, 6);
  if (playHistory.length === 0) {
    return <p className={styles.nothingHistory}>試聴履歴がありません</p>;
  }

  // 取得したidを使って楽曲情報を取得
  const playHistories = await Promise.all(
    playHistory.map(async (id: number) => {
      const idStr = id.toString();
      const songs = await getSong(idStr);
      return songs;
    }),
  );

  const playHistorySongs: PlayHistorySong[] = playHistories;

  return (
    <>
      <div className={styles.playHistoryGroup}>
        {playHistorySongs.length > 0 ? (
          playHistorySongs.map((song: PlayHistorySong) => {
            return (
              <Link href={`/music/${song.id}`} key={song.id} className={styles.playHistorySong}>
                <Image src={song.cover_xl} alt={`${song.title}の画像`} width={150} height={150} />
                <p>{song.title}</p>
                <p>{song.artist.name}</p>
              </Link>
            );
          })
        ) : (
          <p className={styles.nothingHistory}>試聴履歴がありません</p>
        )}
      </div>
    </>
  );
};

export default PlayHistory;

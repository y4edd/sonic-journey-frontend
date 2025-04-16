export const dynamic = "force-dynamic"; // 動的レンダリングを強制する

import DeleteButton from "@/components/mypage/DeleteButton/DeleteButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getPlayHistory } from "@/utils/apiFunc/history";
import { getSong } from "@/utils/apiFunc/song";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import styles from "./page.module.css";

const PlayList = async () => {
  // クッキーからトークン取得
  const token = await getTokenFromCookie();

  // ログインユーザーの試聴履歴楽曲のidを取得
  const playHistory = await getPlayHistory(token, 10);

  // 取得したidを使って楽曲情報を取得
  const playHistories = await Promise.all(playHistory.map((id: number) => getSong(id.toString())));

  const historySongsInfo = playHistories.map((playHistorySong) => {
    return playHistorySong;
  });

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/history", title: "再生履歴" },
        ]}
      />
      <MenuHeader title="再生履歴" />

      {historySongsInfo.length > 0 ? (
        <div>
          <DeleteButton userId={token} />
          <SongList songs={historySongsInfo} errorMessage="履歴がありません" url="music" />
        </div>
      ) : (
        <div className={styles.nothingHistory}>
          <p>試聴履歴がありません</p>
        </div>
      )}
    </>
  );
};

export default PlayList;

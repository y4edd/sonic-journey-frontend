import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import FavoriteSongsEditContainer from "@/components/mypage/FavoriteSongsEditContainer/FavoriteSongsEditContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerSong } from "@/types/deezer";
import { checkLoggedInServer } from "@/utils/apiFunc";
import { getSong } from "@/utils/apiFunc/song";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import styles from "./page.module.css";
import { getFavoriteSongs } from "@/utils/apiFunc/favorite";
import { favoriteSong } from "@/types/favorite";


const EditFavoriteSongs = async () => {
  // cookieからtokenを取得し、ログインしているか確認する
  const token = await getTokenFromCookie();
  const isLoggedin = await checkLoggedInServer(token);

  if (!isLoggedin) {
    return <UnauthorizedAccess />;
  }

  // DBからお気に入り楽曲を取得する
  const favoriteSongs = await getFavoriteSongs(token);

  // お気に入り楽曲の楽曲idをもとに、楽曲情報を取得してデータに加える
  const favoriteSongsData = await Promise.all(
    favoriteSongs.map(async (song: favoriteSong) => {
      const songData: DeezerSong = await getSong(song.api_song_id);
      return { ...song, songData: songData };
    }),
  );

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/favoritesong", title: "お気に入り楽曲" },
          { link: "/mypage/favoritesong/edit", title: "編集" },
        ]}
      />
      <MenuHeader title="お気に入り楽曲" />
      <div className={styles.editMessage}>
        <p>解除するアイテムを選択してください</p>
      </div>
      <FavoriteSongsEditContainer songsInfo={favoriteSongsData} />
    </div>
  );
};

export default EditFavoriteSongs;

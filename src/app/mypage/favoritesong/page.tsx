export const dynamic = "force-dynamic"; // 動的レンダリングを強制する

import FavoriteSongsContainer from "@/components/mypage/FavoriteSongsContainer/FavoriteSongsContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerSong } from "@/types/deezer";
import type { favoriteSong } from "@/types/favorite";
import { getFavoriteSongs } from "@/utils/apiFunc/favorite";
import { getSong } from "@/utils/apiFunc/song";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

const FavoriteSongs = async () => {
  // NOTE: cookieからtokenを取得し、ログインしているか確認
  const token = await getTokenFromCookie();

  // NOTE: DBからお気に入り楽曲を取得
  const favoriteSongs = await getFavoriteSongs(token);

  // NOTE: お気に入り楽曲の楽曲idをもとに、楽曲情報を取得してデータに加える
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
        ]}
      />
      <MenuHeader title="お気に入り楽曲" />
      <FavoriteSongsContainer songsInfo={favoriteSongsData} />
    </div>
  );
};

export default FavoriteSongs;

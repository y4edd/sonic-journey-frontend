import FavoriteArtistsEditContainer from "@/components/mypage/FavoriteArtistsEditContainer/FavoriteArtistsEditContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerArtist } from "@/types/deezer";
import type { favoriteArtist } from "@/types/favorite";
import { getArtist } from "@/utils/apiFunc/artist";
import { getFavoriteArtistsForFav } from "@/utils/apiFunc/favorite";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import styles from "./page.module.css";

const EditFavoriteArtists = async () => {
  // ログイン確認をする
  const token = await getTokenFromCookie();

  // DBからお気に入りアーティストを取得する
  const favoriteArtists = await getFavoriteArtistsForFav(token);

  // アーティストidをもとにアーティスト情報を取得してデータに追加する
  const favoriteArtistsData = await Promise.all(
    favoriteArtists.map(async (artist: favoriteArtist) => {
      const artistData: DeezerArtist = await getArtist(Number(artist.api_artist_id));
      return { ...artist, artistData: artistData };
    }),
  );

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/favoriteartist", title: "お気に入りアーティスト" },
          { link: "/mypage/favoriteartist/edit", title: "編集" },
        ]}
      />
      <MenuHeader title="お気に入りアーティスト" />
      <div className={styles.editMessage}>
        <p>解除するアイテムを選択してください</p>
      </div>
      <FavoriteArtistsEditContainer artistsInfo={favoriteArtistsData} />
    </div>
  );
};

export default EditFavoriteArtists;

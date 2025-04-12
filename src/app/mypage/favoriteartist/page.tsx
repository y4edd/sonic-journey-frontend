export const dynamic = "force-dynamic"; // 動的レンダリングを強制する

import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import FavoriteArtistsContainer from "@/components/mypage/FavoriteArtistsContainer/FavoriteArtistsContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { favoriteArtist } from "@/types/favorite";
import { checkLoggedInServer } from "@/utils/apiFunc";
import { getArtist } from "@/utils/apiFunc/artist";
import { getFavoriteArtistsForFav } from "@/utils/apiFunc/favorite";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

const FavoriteArtist = async () => {
  // NOTE: cookieからtokenを取得し、ログインしているか確認
  const token = await getTokenFromCookie();
  const isLoggedin = await checkLoggedInServer(token);

  if (!isLoggedin) {
    return <UnauthorizedAccess />;
  }

  // NOTE: DBからお気に入りアーティストを取得
  const favoriteArtists = await getFavoriteArtistsForFav(token);

  // NOTE: アーティストidをもとにアーティスト情報を取得してデータに追加
  const favoriteArtistsData = await Promise.all(
    favoriteArtists.map(async (artist: favoriteArtist) => {
      const artistData = await getArtist(Number(artist.api_artist_id));
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
        ]}
      />
      <MenuHeader title="お気に入りアーティスト" />
      <FavoriteArtistsContainer artistsInfo={favoriteArtistsData} />
    </div>
  );
};

export default FavoriteArtist;

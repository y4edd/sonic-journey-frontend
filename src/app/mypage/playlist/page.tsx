import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import { PlaylistBody } from "@/components/mypage/playlist/PlaylistBody/PlaylistBody";
import BreadList from "@/components/top/BreadList/BreadList";
import { getUserPlaylist } from "@/utils/apiFunc/playlist";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

const PlayListPage = async () => {
  const token = await getTokenFromCookie();
  const playlist = await getUserPlaylist(token);

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/playlist", title: "プレイリスト" },
        ]}
      />
      <MenuHeader title="プレイリスト" />
      <PlaylistBody userId={token} playlist={playlist} />
    </>
  );
};

export default PlayListPage;

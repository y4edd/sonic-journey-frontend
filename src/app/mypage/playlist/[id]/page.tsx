import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import { PlaylistHeader } from "@/components/mypage/PlaylistDetail/PlaylistHeader/PlaylistHeader";
import { PlaylistSongList } from "@/components/mypage/PlaylistDetail/PlaylistSongList/PlaylistSongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import styles from "./page.module.css";
import { getSongPlaylist } from "@/utils/apiFunc/playlist";
import { getSong } from "@/utils/apiFunc/song";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
  album_id: number;
};

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const token = await getTokenFromCookie();
  try {
    const res = await getSongPlaylist(id, token);
    if (!res.ok) {
      throw new Error("プレイリストの情報が得られませんでした");
    }

    const playlistInfo = await res.json();

    // number型のapi_song_idを元に外部APIを叩き、検索結果を取得
    const songs = await Promise.all(
      playlistInfo.map(async(song: number) => {
        const songStr = song.toString();
        const response = await getSong(songStr);
        return response;
      })
    );

    const playlistSongIds: { api_song_id: number; title: string }[] =
      songs.length > 0
        ? songs.map((playlistSong) => {
            return { api_song_id: playlistSong.id, title: playlistSong.title };
          })
        : [];

    const playlistSongsAudio: PlaylistSongsAudio[] =
      songs.length > 0
        ? songs.map((playlistSong) => {
            return {
              preview: playlistSong.preview,
              id: playlistSong.id,
              title: playlistSong.title,
              img: playlistSong.cover_xl,
              album_id: playlistSong.album.id,
            };
          })
        : [];

    return (
      <>
        <BreadList
          bread={[
            { link: "/", title: "TOP" },
            { link: "/mypage", title: "マイページ" },
            { link: "/mypage/playlist", title: "プレイリスト" },
            {
              link: `/mypage/playlist/${id}`,
              title: `${playlistInfo.playlistTitle}`,
            },
          ]}
        />
        <div className={styles.wrapper}>
          <PlaylistHeader
            playlistTitle={playlistInfo.playlistTitle}
            playlistId={id}
            playlistSongInfo={playlistSongIds}
          />
          <PlaylistSongList playlistSongsAudio={playlistSongsAudio} />
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
  }
};
export default Page;

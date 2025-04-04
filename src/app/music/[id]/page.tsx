import ImageTitleLink from "@/components/music/ImageTitleLink/ImageTitleLink";
import MusicContentTitle from "@/components/music/MusicContentTitle/MusicContentTitle";
import PlayHistory from "@/components/music/PlayHistory/PlayHistory";
import SongInfoContent from "@/components/music/SongInfoContent/SongInfoContent";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getSong } from "@/utils/apiFunc/song";
import type { ReadonlyURLSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { getArtistSongs } from "@/utils/apiFunc/song";

type SongPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<ReadonlyURLSearchParams>;
};

const SongPage = async ({ params }: SongPageProps) => {
  // クエリパラメーターから楽曲id取得
  const { id } = await params;

  // 取得したidの楽曲情報を取得
  const song = await getSong(id);

  // 上記で取得したアーティストIDからアーティストの人気楽曲を最大4件取得
  const songs = await getArtistSongs(song.artist.id, 4);

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: `/music/${song.id}`, title: "楽曲詳細" },
        ]}
      />
      <div className={styles.songPageContent}>
        <div className={styles.songDetailContent}>
          <SongInfoContent
            id={song.id}
            title={song.title}
            artist={song.artist.name}
            image={song.cover_xl}
            preview={song.preview}
            albumId={song.album.id}
          />
        </div>
        <div className={styles.artistInfoLinkContent}>
          <MusicContentTitle title="アーティスト情報" />
          <ImageTitleLink
            url={`/artist/${song.artist.id}`}
            name={song.artist.name}
            image={song.artist.picture_xl}
          />
        </div>

        <div className={styles.artistFavoriteSongsContent}>
          <MusicContentTitle title="人気楽曲" />
          <SongList
            songs={songs}
            url="music"
            errorMessage="人気楽曲を取得できませんでした"
          />
        </div>

        <div className={styles.historySongsContent}>
          <MusicContentTitle title="試聴履歴" />
          <PlayHistory />
        </div>
      </div>
    </>
  );
};

export default SongPage;

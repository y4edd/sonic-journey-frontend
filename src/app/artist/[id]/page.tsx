import ArtistInfo from "@/components/music/ArtistInfo/ArtistInfo";
import MusicContentTitle from "@/components/music/MusicContentTitle/MusicContentTitle";
import PlayHistory from "@/components/music/PlayHistory/PlayHistory";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getArtist } from "@/utils/apiFunc/artist";
import styles from "./page.module.css";
import { getArtistAlbum } from "@/utils/apiFunc/album";
import { getArtistSongs } from "@/utils/apiFunc/song";

type ArtistPageProps = {
  params: Promise<{ id: string }>;
};

const ArtistPage = async ({ params }: ArtistPageProps) => {
  // クエリパラメーターからアーティストid取得
  const { id } = await params;
  const artistData = await getArtist(Number(id));

  // 取得したアーティストidから楽曲情報を取得
  const artistSingleSongs = await getArtistSongs(Number(id), 4);

  // 取得したアーティスト名からアルバム情報を取得
  const artistAlbums = await getArtistAlbum(artistData.name, 4);

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: `/artist/${id}`, title: "アーティスト詳細" },
        ]}
      />
      <div className={styles.artistDetailPage}>
        <div className={styles.artistInfoContent}>
          <ArtistInfo
            image={artistData.picture_xl}
            name={artistData.name}
            id={artistData.id}
          />
        </div>

        <div className={styles.singleContent}>
          <MusicContentTitle title="シングル" />
          <SongList
            songs={artistSingleSongs}
            url="music"
            errorMessage="シングル楽曲を取得できませんでした"
          />
        </div>

        <div className={styles.albumContent}>
          <MusicContentTitle title="アルバム" />
          <SongList
            songs={artistAlbums}
            url="album"
            errorMessage="アルバムを取得できませんでした"
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

export default ArtistPage;

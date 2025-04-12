import Image from "next/image";
import ArtistFavoriteButton from "../ArtistFavoriteButton/ArtistFavoriteButton";
import styles from "./ArtistInfo.module.css";
import { getFavoriteArtistsForFav } from "@/utils/apiFunc/favorite";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

const ArtistInfo = async({ image, name, id }: { image: string; name: string; id: number }) => {
  const userId = await getTokenFromCookie();
  // NOTE: DBからお気に入りアーティストを取得。
  const favoriteArtists = await getFavoriteArtistsForFav(userId);
  return (
    <div className={styles.artistInfoContent}>
      <Image src={image} alt={`${name}の画像`} width={250} height={250} />
      <p>{name}</p>
      <ArtistFavoriteButton id={id} favoriteArtists={favoriteArtists} />
    </div>
  );
};

export default ArtistInfo;

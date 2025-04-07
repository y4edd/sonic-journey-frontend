import type { SpecialSongs } from "@/types/deezer";
import { getSong } from "@/utils/apiFunc/song";
import { getSpecialImage, getSpecialSongs } from "@/utils/apiFunc/special";
import { SpecialHeader } from "../SpecialHeader/SpecialHeader";
import { SpecialPlaylist } from "../SpecialPlaylist/SpecialPlaylist";
import { SpecialTitles } from "../SpecialTitles/SpecialTitles";
import styles from "./Special.module.css";

export const Special = async ({ id }: { id: number }) => {
  const specialOverViews = await getSpecialImage();
  const specialOverView = specialOverViews[id - 1];
  const specialSongs = await getSpecialSongs(id);
  const specialPlaylistInfo = await Promise.all(
    specialSongs.map(async (song: SpecialSongs) => await getSong(song.api_song_id.toString())),
  );
  return (
    <>
      <SpecialHeader specialOverView={specialOverView} />
      <div className={styles.specialBody}>
        <SpecialTitles specialOverView={specialOverView} />
        <SpecialPlaylist specialPlaylistInfo={specialPlaylistInfo} />
      </div>
    </>
  );
};

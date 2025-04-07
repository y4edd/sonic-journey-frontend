"use client";

import type { GenreInfo } from "@/types/deezer";
import type { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import GenreButton from "../GenreButton/GenreButton";
import styles from "./GenreButtons.module.css";

const fetcher = (key: string) => {
  return fetch(key).then((res) => res.json());
};
const GenreButtons = ({
  selectGenre,
  setSelectGenre,
}: {
  selectGenre: number;
  setSelectGenre: Dispatch<SetStateAction<number>>;
}) => {
  const { data, error, isLoading } = useSWR<GenreInfo[]>(
    "http://localhost:3005/genre",
    fetcher,
  );

  if (error) return <div>エラー</div>;
  if (isLoading) return <div>ジャンルの情報を取得中...</div>;
  if (data) {
    const selectGenreInfoArr: GenreInfo[] = data.filter((data) => data.id === selectGenre);
    const selectGenreInfo = selectGenreInfoArr[0];
    return (
      <div className={styles.genreWrapper}>
        <div className={styles.genreGroup}>
          {data.map((genre: GenreInfo) => {
            return (
              <GenreButton
                genre={genre}
                selectGenre={selectGenre}
                setSelectGenre={setSelectGenre}
                key={genre.id}
              />
            );
          })}
        </div>
        <div
          className={selectGenreInfo.id !== 0 ? styles.genreTitle : styles.allGenreTitle}
          style={{
            backgroundImage: `url(${selectGenreInfo.picture})`,
          }}
        >
          <p className={styles.firstTitleLine}>
            「{selectGenreInfo.name}」ジャンル
            <br />
            のアーティスト
          </p>
        </div>
      </div>
    );
  }
};

export default GenreButtons;

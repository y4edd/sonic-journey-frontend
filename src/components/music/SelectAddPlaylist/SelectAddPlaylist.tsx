"use client";

import type { DiffPlaylists, PlaylistProps } from "@/types/playlist";
import { deleteSongPlaylist, postSongPlayList } from "@/utils/apiFunc/playlist";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Link from "next/link";
import { type ChangeEvent, useEffect } from "react";
import type { FormEvent } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import styles from "./SelectAddPlaylist.module.css";

export const SelectAddPlaylist = ({
  musicId,
  playlists,
  defaultPlaylists,
  setModalOpen,
}: {
  musicId: number;
  playlists: PlaylistProps[];
  defaultPlaylists: { playlistId: number; musicFlag: boolean }[];
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // チェックされているプレイリスト
  const [addPlaylists, setAddPlaylists] =
    useState<{ playlistId: number; musicFlag: boolean }[]>(defaultPlaylists);

  // defaultと最新の差分のあるプレイリストを獲得
  const [diffPlaylists, setDiffPlaylists] = useState<DiffPlaylists[]>([]);

  useEffect(() => {
    setAddPlaylists(defaultPlaylists);
  }, [defaultPlaylists]);

  // クリックされたプレイリストのmusicFlagを逆転する
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // クリックされたプレイリストデータを取得
    const changePlaylist = addPlaylists.filter(
      (addPlaylist) => addPlaylist.playlistId === Number(e.target.value),
    );

    if (!changePlaylist) return;

    // musicFlagを逆転させたプレイリストデータを作成
    const changedPlaylist = {
      playlistId: changePlaylist[0].playlistId,
      musicFlag: !changePlaylist[0].musicFlag,
    };

    setAddPlaylists((prevStateArr) =>
      prevStateArr.map((prevState) =>
        prevState.playlistId === Number(e.target.value) ? changedPlaylist : prevState,
      ),
    );
  };
  console.log(defaultPlaylists);

  const isChecked = (playlistId: number) => {
    const checkedPlaylist = defaultPlaylists.filter(
      (defaultPlaylist) => defaultPlaylist.playlistId === playlistId,
    );
    if (checkedPlaylist.length === 1) {
      return checkedPlaylist[0].musicFlag;
    }
    return false;
  };

  useEffect(() => {
    if (defaultPlaylists.length === addPlaylists.length) {
      setDiffPlaylists(
        addPlaylists.filter((addPlaylist) => {
          const defaultPlaylist = defaultPlaylists.find(
            (p) => p.playlistId === addPlaylist.playlistId,
          );
          return defaultPlaylist && addPlaylist.musicFlag !== defaultPlaylist.musicFlag;
        }),
      );
    }
  }, [defaultPlaylists, addPlaylists]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // 追加対象
    const added = diffPlaylists.filter((p) => p.musicFlag);
    // 削除対象
    const removed = diffPlaylists.filter((p) => !p.musicFlag);
    if (diffPlaylists.length > 0) {
      e.preventDefault();
    }

    try {
      if (added.length > 0) {
        await postSongPlayList(added, musicId);
      }

      if (removed.length > 0) {
        await deleteSongPlaylist(removed, musicId);
      }

      alert("プレイリストが編集されました");
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("プレイリストの編集に失敗しました");
    }
  };

  return (
    <>
      {!defaultPlaylists.length && (
        <>
          <p className={styles.noPlaylist}>プレイリストがありません</p>
          <Link href="/mypage/playlist" className={styles.playlistLink}>
            <AddBoxIcon className={styles.addLinkIcon} />
            プレイリストを新規作成
          </Link>
        </>
      )}
      {defaultPlaylists.length === addPlaylists.length && defaultPlaylists.length !== 0 && (
        <>
          <p className={styles.modalTitle}>楽曲の追加先</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            {playlists.map((playlist: PlaylistProps) => (
              <div className={styles.playlist} key={playlist.id}>
                <input
                  type="checkbox"
                  id={playlist.name}
                  name="addPlaylist"
                  value={playlist.id}
                  defaultChecked={isChecked(playlist.id)}
                  onChange={handleChange}
                  className={styles.playlistCheck}
                />
                <label htmlFor={playlist.name}>{playlist.name}</label>
              </div>
            ))}
            <div className={styles.buttonContainer}>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className={styles.cancelButton}
              >
                キャンセル
              </button>
              <button type="submit" className={styles.createButton}>
                追加
              </button>
            </div>
          </form>
          <Link href="/mypage/playlist" className={styles.playlistLink}>
            <AddBoxIcon className={styles.addLinkIcon} />
            プレイリストを新規作成
          </Link>
        </>
      )}
    </>
  );
};

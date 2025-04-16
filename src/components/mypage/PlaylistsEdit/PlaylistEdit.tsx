"use client";

import type { PlaylistProps } from "@/types/playlist";
import { deletePlaylist } from "@/utils/apiFunc/playlist";
import { fetchUserInfo } from "@/utils/apiFunc/user";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import styles from "./PlaylistEdit.module.css";
import { TitleChange } from "./TitleChange/TitleChange";

export const PlaylistEdit = ({
  setEditModalOpen,
  playlist,
}: {
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  playlist: PlaylistProps[];
}) => {
  const [_user, setUser] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<PlaylistProps[]>([]);
  const [titleChangeFlag, setTitleChangeFlag] = useState<boolean[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: ハンバーガーメニューの開閉により更新
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUserInfo();
      setUser(data.id);
    };
    getUser();
    setPlaylists(playlist);
  }, []);

  // プレイリスト名編集のための状態関数を作成
  // biome-ignore lint/correctness/useExhaustiveDependencies: ハンバーガーメニューの開閉により更新
  useEffect(() => {
    setTitleChangeFlag([]);
    for (let i = 1; i <= playlists.length; i++) {
      setTitleChangeFlag((prevState) => [...prevState, false]);
    }
  }, [playlists]);

  const handlePlaylistDelete = async (playlist: PlaylistProps) => {
    const deleteCheck = confirm(`「${playlist.name}」\nプレイリストを削除しますか？`);
    if (deleteCheck) {
      try {
        const res = (await deletePlaylist(playlist.id)) as Response;

        if (!res.ok) {
          throw new Error("正常に削除できませんでした");
        }
        setPlaylists((prevState) =>
          prevState.filter((deletePlaylist) => deletePlaylist !== playlist),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.editTitle}>プレイリスト編集</p>
      <div className={styles.listWrapper}>
        <ul className={styles.playlists}>
          {playlists.map((playlist, index) =>
            titleChangeFlag[index] ? (
              <TitleChange
                key={playlist.id}
                playlist={playlist}
                setTitleChangeFlag={setTitleChangeFlag}
                playlistIndex={index}
              />
            ) : (
              <li key={playlist.id} className={styles.playlistList}>
                <p className={styles.listTitle}>{playlist.name}</p>
                <div className={styles.editIcons}>
                  <button
                    type="button"
                    onClick={() => setTitleChangeFlag(playlists.map((_playlist, i) => index === i))}
                    aria-label="edit"
                  >
                    <EditIcon className={styles.editIcon} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePlaylistDelete(playlist)}
                    aria-label="delete"
                  >
                    <DeleteIcon className={styles.deleteIcon} />
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => setEditModalOpen(false)}
          className={styles.closeButton}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

"use client";

import Modal from "@/components/mypage/Modal/Modal";
import type { PlaylistProps } from "@/types/playlist";
import { getUserPlaylistCSR } from "@/utils/apiFunc/playlist";
import { fetchUserInfo } from "@/utils/apiFunc/user";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useEffect, useState } from "react";
import { SelectAddPlaylist } from "../SelectAddPlaylist/SelectAddPlaylist";
import styles from "./AddPlaylist.module.css";

export const AddPlaylist = ({
  id,
  text,
  playlists,
}: { id: number; text: string; playlists: PlaylistProps[] }) => {
  const [user, setUser] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultPlaylists, setDefaultPlaylists] = useState<
    { playlistId: number; musicFlag: boolean }[]
  >([]);
  const handleAddPlaylist = () => {
    if (user) {
      setModalOpen(true);
    } else {
      alert("ログインユーザー限定の機能です");
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: プレイリスト作成、編集モーダルの開閉により更新
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUserInfo();
      setUser(data.id);
    };
    getUser();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: プレイリスト作成、編集モーダルの開閉により更新
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // プレイリストIDからそのプレイリスト内の楽曲を取得し、
      // {playlistId, musicFlag: boolean}のオブジェクトを返す
      const results = await Promise.all(
        playlists.map(async (playlist) => {
          const playlistId = playlist.id;
          const songs = await getUserPlaylistCSR(playlistId);
          if (songs.includes(id)) {
            return { playlistId, musicFlag: true };
          } else {
            return { playlistId, musicFlag: false };
          }
        }),
      );
      setDefaultPlaylists(results);
    };

    fetchData();
  }, [user, id, playlists, modalOpen]);

  return (
    <>
      <button type="button" className={styles.songInfoAddList} onClick={handleAddPlaylist}>
        <CreateNewFolderIcon />
        <span>{text}</span>
      </button>
      {modalOpen && user && (
        <Modal setFunc={setModalOpen}>
          <div className={styles.modal}>
            <SelectAddPlaylist
              musicId={id}
              playlists={playlists}
              defaultPlaylists={defaultPlaylists}
              setModalOpen={setModalOpen}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

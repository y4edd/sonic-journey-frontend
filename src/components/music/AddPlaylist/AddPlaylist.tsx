"use client";

import Modal from "@/components/mypage/Modal/Modal";
import type { PlaylistItemObj, PlaylistProps } from "@/types/playlist";
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
      const results: (PlaylistItemObj | null)[] = await Promise.all(
        playlists.map(async (playlist) => {
          const playlistId = playlist.id;
          const songs = await getUserPlaylistCSR(playlistId);
          if (songs.includes(id)) {
            return { playlistId, musicFlag: true };
          }
          return null;
        }),
      );
      // results 配列の中から null じゃないもの（＝有効なプレイリスト情報）だけを
      // 取り出してvalidPlaylists に入れる。
      // その際、取り出した要素が { playlistId: number; musicFlag: true }
      // であることを TypeScript に明示している。
      // （型ガード）
      const validPlaylists: { playlistId: number; musicFlag: true }[] = [];

      for (const item of results) {
        if (item !== null) {
          validPlaylists.push(item);
        }
      }

      setDefaultPlaylists(validPlaylists);
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

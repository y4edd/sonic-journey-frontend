"use client";
import Modal from "@/components/mypage/Modal/Modal";
import PlaylistButton from "@/components/mypage/PlaylistButton/PlaylistButton";
import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";
import PlaylistList from "@/components/mypage/PlaylistList/PlaylistList";
import { PlaylistEdit } from "@/components/mypage/PlaylistsEdit/PlaylistEdit";
import type { Playlist } from "@/types/deezer";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import styles from "./PlaylistBody.module.css";
import { PlaylistProps } from "@/types/playlist";

export const PlaylistBody = ({ userId, playlist }: { userId: string, playlist:PlaylistProps[] }) => {
  const [playlists, setPlaylists] = useState<PlaylistProps[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: プレイリスト作成、編集モーダルの開閉により更新
  useEffect(() => {
    setPlaylists(playlist);
  }, [playlists, createModalOpen, editModalOpen]);

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <PlaylistButton name="追加" icon={<AddBoxIcon />} setFunc={setCreateModalOpen} />
        <PlaylistButton name="編集" icon={<EditIcon />} setFunc={setEditModalOpen} />
      </div>
      <PlaylistList playlists={playlist} />
      {createModalOpen && (
        <Modal setFunc={setCreateModalOpen}>
          <PlaylistForm user_id={userId} setCreateModalOpen={setCreateModalOpen} />
        </Modal>
      )}
      {editModalOpen && (
        <Modal setFunc={setEditModalOpen}>
          <PlaylistEdit setEditModalOpen={setEditModalOpen} playlist={playlist} />
        </Modal>
      )}
    </>
  );
};

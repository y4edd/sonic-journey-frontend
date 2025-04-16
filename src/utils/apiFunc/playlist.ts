import type { PlayListFormData } from "@/components/mypage/PlaylistForm/PlaylistForm";
import type { DiffPlaylists } from "@/types/playlist";

// プレイリストの新規作成
export const postPlaylist = async (formData: PlayListFormData) => {
  try {
    const res = await fetch("http://localhost:3005/playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: formData.playlistTitle,
      }),
      cache: "no-cache",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

// ユーザー毎のプレイリストを取得する関数
export const getUserPlaylist = async (user_id: string) => {
  try {
    const response = await fetch("http://localhost:3005/playlist", {
      cache: "no-cache",
      headers: {
        Authorization: `${user_id}`,
      },
    });
    const res = await response.json();
    if (!response.ok) {
      // 非ログの状態でエラーを返す必要はない
      if (res.statusCode === 403) {
        return;
      }
      throw new Error("データが見つかりませんでした");
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

// プレイリスト内の楽曲をクライアントサイドから取得する
export const getUserPlaylistCSR = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3005/playlist/csr/${id}`, {
      cache: "no-cache",
      credentials: "include",
    });
    const res = await response.json();
    if (!response.ok) {
      throw new Error("データが見つかりませんでした");
    }

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postSongPlayList = async (diffPlaylists: DiffPlaylists[], musicId: number) => {
  const response = await fetch(`http://localhost:3005/playlist/music/${musicId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // 配列はNest側ではマッピングできない。
    // オブジェクトにする
    body: JSON.stringify({ playlists: diffPlaylists }),
    cache: "no-cache",
    credentials: "include",
  });

  if (!response.ok) {
    alert("プレイリストに楽曲の追加ができませんでした");
    throw new Error("プレイリストに楽曲の追加ができませんでした");
  }
  return response;
};

export const deleteSongPlaylist = async (diffPlaylists: DiffPlaylists[], musicId: number) => {
  const response = await fetch(`http://localhost:3005/playlist/music/${musicId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    // 配列はNest側ではマッピングできない。
    // オブジェクトにする
    body: JSON.stringify({ playlists: diffPlaylists }),
    cache: "no-cache",
    credentials: "include",
  });

  if (!response.ok) {
    alert("プレイリスト内の楽曲の削除ができませんでした");
    throw new Error("プレイリスト内の楽曲の削除ができませんでした");
  }
  return response;
};

// プレイリストのIDからプレイリスト内のapi_song_idを取得する
export const getSongPlaylist = async (id: number, token: string) => {
  const res = await fetch(`http://localhost:3005/playlist/${id}`, {
    cache: "no-cache",
    headers: {
      Authorization: `${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("プレイリストの情報が得られませんでした");
  }
  return res;
};

export const deletePlaylist = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3005/playlist/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok || !res) {
      throw new Error("正常に削除できませんでした");
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const reNamePlaylist = async (id: number, title: string) => {
  const res = await fetch(`http://localhost:3005/playlist/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: title,
    }),
    cache: "no-cache",
    credentials: "include",
  });
  return res;
};

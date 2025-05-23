export type PlaylistProps = {
  id: number;
  users_id: string;
  name: string;
};

export type DiffPlaylists = {
  playlistId: number;
  musicFlag: boolean;
};

export type PlaylistItemObj = {
  playlistId: number;
  musicFlag: true;
};

import PlayHistory from "@/components/music/PlayHistory/PlayHistory";
import { getSong } from "@/utils/apiFunc/song";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import { getPlayHistory } from "@/utils/history";
import { render, screen } from "@testing-library/react";

jest.mock("@/utils/getTokenFromCookie", () => ({
  getTokenFromCookie: jest.fn(),
}));

jest.mock("@/utils/history", () => ({
  getPlayHistory: jest.fn(),
}));

jest.mock("@/utils/apiFunc/song", () => ({
  getSong: jest.fn(),
}));

describe("PlayHistoryコンポーネントの単体テスト", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("試聴履歴がなかった場合、その旨が表示されること", async () => {
    (getTokenFromCookie as jest.Mock).mockReturnValue("mockToken");
    (getPlayHistory as jest.Mock).mockResolvedValue({ songIds: [] });

    const jsx = await PlayHistory();
    render(jsx);

    expect(screen.getByText("試聴履歴がありません")).toBeInTheDocument();
  });

  test("ログインしていない場合、ログインユーザーの機能であることが表示されること", async () => {
    (getTokenFromCookie as jest.Mock).mockReturnValue(null);
    (getPlayHistory as jest.Mock).mockResolvedValue(null);

    const jsx = await PlayHistory();
    render(jsx);

    expect(screen.getByRole("link", { name: "ログインユーザーの機能です" })).toBeInTheDocument();
  });
});

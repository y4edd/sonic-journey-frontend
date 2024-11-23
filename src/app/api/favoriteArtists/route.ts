import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest)  => {
  try{
    // ログインしているか確認する
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
      }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
    }

    const body = await req.json();
    const artistId = body.artistId;

    if(!body || typeof artistId === "undefined") {
      NextResponse.json({ message: "アーティストの取得に失敗しました" }, { status:400 });
    }

    // MEMO:api_artist_idがDBの内のカラム名
    await prisma.favorite_Artist.create({
      data: {
        user_id: userId,
        api_artist_id: artistId,
      },
    });

    return NextResponse.json({ message: "「お気に入りアーティスト」に追加しました" }, { status: 200 });
  } catch(error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};

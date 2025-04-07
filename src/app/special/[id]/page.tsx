import { Special } from "@/components/special/DetailPage/Special/Special";
import BreadList from "@/components/top/BreadList/BreadList";
import { getSpecialImage } from "@/utils/apiFunc/special";
import type { ReadonlyURLSearchParams } from "next/navigation";

type SongPageProps = {
  params: Promise<{ id: number }>;
  searchParams: Promise<ReadonlyURLSearchParams>;
};

const Page = async ({ params }: SongPageProps) => {
  const { id } = await params;
  const specialOverViews = await getSpecialImage();
  const specialOverView = specialOverViews[id - 1];
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/special", title: "特集" },

          { link: `/special/${id}`, title: `${specialOverView.title}` },
        ]}
      />
      <Special id={id} />
    </>
  );
};

export default Page;

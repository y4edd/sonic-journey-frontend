import Image from "next/image";
import Link from "next/link";
import styles from "./TopPageLink.module.css";
import { getSpecialImage } from "@/utils/apiFunc/special";

export const TopPageLink = async () => {
  const specialImages = await getSpecialImage();
  return (
    <div className={styles.imageContainer}>
      {specialImages.map((specialImage) => (
        <div className={styles.imageItem} key={specialImage.id}>
          <Link href={`/special/${specialImage.id}`}>
            <Image
              src={`/images/${specialImage.image}`}
              alt={specialImage.title}
              height={180}
              width={360}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

interface SugessionCardProps {
  className: string,
  img: string;
  description: string;
  supporters: string;
}

export default function SugessionCard({
  className,
  img,
  description,
  supporters,
}: SugessionCardProps) {
  return (
    <div
      className={`absolute ${className} w-[192px] h-[172px] flex flex-col
      items-center gap-1 border-2 border-gray-200 border-b-0 p-2 rounded-3xl overflow-hidden
      shadow-md hover:scale-105 duration-300 bg-white`}
    >
      <div className="overflow-hidden max-w-14 h-14 object-cover rounded-full">
        <Image
          src={img}
          alt="user"
          width={200}
          height={200}
        />
      </div>
      <p className="font-semibold text-xs my-auto">
        {description}
      </p>
      <span className="my-auto flex items-center gap-2 text-gray-600 text-sm">
        <FontAwesomeIcon icon={faHeartRegular} />
        {supporters} supporters
      </span>
    </div>
  );
}

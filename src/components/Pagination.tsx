import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4 text-sm">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
          Previous
        </Link>
      ) : (
        <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-300 flex items-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
          Previous
        </span>
      )}
      <span className="text-gray-500 px-2">
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
        >
          Next
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
        </Link>
      ) : (
        <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-300 flex items-center gap-2">
          Next
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
        </span>
      )}
    </div>
  );
}

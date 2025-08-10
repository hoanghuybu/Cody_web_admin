import React from "react";
import { AngleLeftIcon, AngleRightIcon } from "../../../icons";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-[#e4e7ec]">
      {/* Left Info */}
      <div className="font-medium text-sm [font-family:'Outfit',Helvetica]">
        <span className="text-[#667085]">Showing </span>
        <span className="text-[#1d2939]">
          {(currentPage - 1) * pageSize + 1}
        </span>
        <span className="text-[#667085]"> to </span>
        <span className="text-[#1d2939]">
          {Math.min(currentPage * pageSize, totalItems)}
        </span>
        <span className="text-[#667085]"> of </span>
        <span className="text-[#1d2939]">{totalItems}</span>
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-10 w-10 p-0 flex items-center justify-center border rounded-md text-gray-700 disabled:opacity-40"
        >
          <AngleLeftIcon className="h-4 w-4" />
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 p-0 flex items-center justify-center rounded-md ${
                page === currentPage
                  ? "bg-[#465fff] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-10 w-10 p-0 flex items-center justify-center border rounded-md text-gray-700 disabled:opacity-40"
        >
          <AngleRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

'use client';

import Pagination from './Pagination';

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const PaginationWrapper = ({ currentPage, totalPages, onPageChange }: PaginationWrapperProps) => {
  if (totalPages <= 1) return null;
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default PaginationWrapper;

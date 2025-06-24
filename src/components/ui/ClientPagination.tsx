'use client';

import { useAtom } from 'jotai';
import { currentPageAtom } from '@/lib/store';
import Pagination from './Pagination';

interface ClientPaginationProps {
  totalPages: number;
  defaultPage?: number;
}

/**
 * A client-side only pagination component that uses Jotai for state management.
 */
const ClientPagination: React.FC<ClientPaginationProps> = ({
  totalPages,
  defaultPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default ClientPagination;

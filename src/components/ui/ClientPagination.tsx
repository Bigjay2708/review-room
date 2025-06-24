'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Pagination from './Pagination';

interface ClientPaginationProps {
  totalPages: number;
  defaultPage?: number;
}

/**
 * A client-side only pagination component that handles URL updates
 * and renders a pagination UI without trying to render server content.
 */
const ClientPagination: React.FC<ClientPaginationProps> = ({
  totalPages,
  defaultPage = 1,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get current page from URL or default to 1
  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam, 10) : defaultPage
  );

  // Update state if URL changes externally
  useEffect(() => {
    const newPage = pageParam ? parseInt(pageParam, 10) : defaultPage;
    setCurrentPage(newPage);
  }, [pageParam, defaultPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    
    if (page === 1) {
      params.delete('page'); // Remove page param for page 1 (cleaner URLs)
    } else {
      params.set('page', page.toString());
    }
    
    const newPath = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newPath);
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

'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface PaginatedContentProps {
  defaultPage?: number;
  totalPages: number;
  renderContent: (page: number) => React.ReactNode;
}

/**
 * A client component that handles pagination logic and renders content based on the current page.
 * This avoids directly accessing searchParams in server components.
 */
const PaginatedContent: React.FC<PaginatedContentProps> = ({
  defaultPage = 1,
  totalPages,
  renderContent,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get current page from URL or default to 1
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam, 10) : defaultPage;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page'); // Remove page param for page 1 (cleaner URLs)
    } else {
      params.set('page', page.toString());
    }
    
    const newPath = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(newPath);
  };

  // Generate a range of page numbers to display
  const getPageRange = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range: (number | string)[] = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    
    // Add first page if not already in range
    const firstItem = range[0];
    if (range.length > 0 && typeof firstItem === 'number' && firstItem > 2) {
      range.unshift('...');
    }
    if (range.length === 0 || (typeof firstItem === 'number' && firstItem > 1)) {
      range.unshift(1);
    }
    
    // Add last page if not already in range
    const lastItem = range[range.length - 1];
    if (range.length > 0 && typeof lastItem === 'number' && lastItem < totalPages - 1) {
      range.push('...');
    }
    
    const newLastItem = range[range.length - 1];
    if (range.length === 0 || (typeof newLastItem === 'number' && newLastItem < totalPages)) {
      range.push(totalPages);
    }
    
    return range;
  };

  return (
    <>
      {renderContent(currentPage)}
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-8">
          <nav className="flex items-center space-x-1">
            {/* Previous button */}
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600'
              }`}
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Page numbers */}
            {getPageRange().map((page, index) => (
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md ${
                    page === currentPage
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-3 py-2 text-gray-500">
                  {page}
                </span>
              )
            ))}
            
            {/* Next button */}
            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600'
              }`}
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default PaginatedContent;

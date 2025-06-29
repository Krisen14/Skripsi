'use client';

import React from 'react';
import './page.css';

interface PaginationControllerProps {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}

const PaginationController: React.FC<PaginationControllerProps> = ({
  itemsPerPage,
  currentPage,
  totalItems,
  onLimitChange,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div className="pagination-container">
      <label className="label-bawah" htmlFor="limitSelect">Tampilkan:</label>
      <select
        id="limitSelect"
        className="limit-select"
        value={itemsPerPage}
        onChange={handleLimitChange}
      >
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="page-info">
        Halaman {currentPage} dari {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationController;

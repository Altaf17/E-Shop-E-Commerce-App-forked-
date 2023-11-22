import { useState } from "react";
import styles from "./Pagination.module.scss";
const Pagination = (props) => {
  const { totalProducts, productPerPage, setCurrentPage, currentPage } = props;
  const pageNumbers = [];
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const totalPages = totalProducts / productPerPage;
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Go to next Page

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    // show next set of page pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  // Go Prev Pgae
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % maxPageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}
      >
        Prev
      </li>
      {pageNumbers.map((pagNo) => {
        if (pagNo < maxPageNumberLimit + 1 && pagNo > minPageNumberLimit) {
          return (
            <li
              key={pagNo}
              onClick={() => paginate(pagNo)}
              className={currentPage === pagNo ? `${styles.active}` : null}
            >
              {pagNo}
            </li>
          );
        }
      })}
      <li
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : null
        }
        onClick={paginateNext}
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`Page ${currentPage}`}</b>
        <span>{` of`}</span>
        <b>{` ${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;

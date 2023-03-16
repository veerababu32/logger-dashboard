import { Link } from "react-router-dom";

const Pagination = ({
  currentPage,
  recordsPerPage,
  totalData,
  paginate,
  prevPage,
  nextPage,
}) => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link className="page-link" onClick={prevPage}>
            Previous
          </Link>
        </li>
        {pageNumbers.map((pgNum) => (
          <li
            key={pgNum}
            className={`page-item ${currentPage === pgNum ? "active" : ""}`}
          >
            <Link className="page-link" onClick={() => paginate(pgNum)}>
              {pgNum}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link className="page-link" onClick={nextPage}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;

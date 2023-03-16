import { useEffect, useState } from "react";
import Axios from "axios";
import { BiCodeAlt } from "react-icons/bi";
import { Spinner } from "react-bootstrap";
import Pagination from "./Pagination";
import { FaSort } from "react-icons/fa";

const FilteredOutput = (props) => {
  const [loggerData, setLoggerData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);
  // const jsonUrl = "http://localhost:5000/result";
  const url = "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f";

  const [logID, actionType, applicationType, fromDate, toDate, applicationId] =
    props.data;

  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setLoggerData(res.data.result.auditLog);
        setFilterData(res.data.result.auditLog);
        setIsLoading(true);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    goToFun();
    // eslint-disable-next-line
  }, [logID, actionType, applicationId, applicationType, fromDate, toDate]);

  function goToFun() {
    let result = loggerData;
    let date1 = new Date(fromDate).getTime();
    let date2 = new Date(toDate).getTime();

    if (
      !logID &&
      !actionType &&
      !applicationType &&
      !applicationId &&
      !fromDate &&
      !toDate
    ) {
      setFilterData(loggerData);
    } else {
      if (logID) {
        result = result.filter((ele) => {
          return ele.logId === parseInt(logID);
        });
      }

      if (actionType) {
        result = result.filter((ele) => {
          return ele.actionType === actionType;
        });
      }

      if (applicationType) {
        result = result.filter((ele) => {
          return ele.applicationType === applicationType;
        });
      }

      if (applicationId) {
        result = result.filter((ele) => {
          return ele.applicationId === parseInt(applicationId);
        });
      }

      if (fromDate) {
        result = result.filter(
          (ele) => date1 < new Date(ele.creationTimestamp).getTime()
        );
      }

      if (toDate) {
        result = result.filter(
          (ele) => new Date(ele.creationTimestamp).getTime() < date2
        );
      }

      if (fromDate && toDate) {
        result = result.filter(
          (ele) =>
            date1 < new Date(ele.creationTimestamp).getTime() &&
            new Date(ele.creationTimestamp).getTime() < date2
        );
      }

      setFilterData(result);
    }
  }

  function sorting(data) {
    var sortData = filterData.sort((a, b) => (a[data] > b[data] ? 1 : -1));
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    setCurrentRecords(sortData.slice(indexOfFirstRecord, indexOfLastRecord));
  }

  useEffect(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    setCurrentRecords(filterData.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [currentPage, filterData, recordsPerPage]);

  let numOfPages = Math.ceil(filterData.length / recordsPerPage);
  let dataCheck = numOfPages > 0;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextClick = () => {
    if (currentPage !== numOfPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevClick = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="filter-container text-center">
        {isLoading ? (
          <table className="table table-bordered table-striped table-hover text-center m-0 rounded">
            <thead>
              <tr>
                <th>
                  <span>Log ID</span>
                  <FaSort
                    className="mb-1 ms-1"
                    onClick={() => sorting("logId")}
                  />
                </th>
                <th>
                  <span>Application Type</span>
                  <FaSort
                    className="mb-1 ms-1"
                    onClick={() => sorting("applicationType")}
                  />
                </th>
                <th>
                  <span>Application ID</span>
                  <FaSort
                    className="mb-1 ms-1"
                    onClick={() => sorting("applicationId")}
                  />
                </th>
                <th>
                  <span>Action Type</span>
                  <FaSort
                    className="mb-1 ms-1"
                    onClick={() => sorting("actionType")}
                  />
                </th>
                <th>
                  <span>Action Details</span>
                  <FaSort
                    className="mb-1 ms-1"
                    onClick={() => sorting("actionDetails")}
                  />
                </th>
                <th>
                  <span>Date : Time</span>
                  <FaSort
                    className="mb-1 ms-1"
                    onClick={() => sorting("creationTimestamp")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {dataCheck ? (
                currentRecords?.map((data) => (
                  <tr key={data.logId}>
                    <td>{data.logId ? data.logId : <BiCodeAlt />}</td>
                    <td>
                      {data.applicationType ? (
                        data.applicationType
                      ) : (
                        <BiCodeAlt />
                      )}
                    </td>
                    <td>
                      {data.applicationId ? data.applicationId : <BiCodeAlt />}
                    </td>
                    <td>{data.actionType ? data.actionType : <BiCodeAlt />}</td>
                    <td>
                      {data.actionDetails ? data.actionDetails : <BiCodeAlt />}
                    </td>
                    <td>
                      {data.creationTimestamp ? (
                        data.creationTimestamp
                      ) : (
                        <BiCodeAlt />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="fs-6 fw-bold">
                    No Data Found!!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <Spinner className="m-4" />
        )}
      </div>
      <Pagination
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        totalData={filterData.length}
        paginate={paginate}
        prevPage={handlePrevClick}
        nextPage={handleNextClick}
      />
    </>
  );
};
export default FilteredOutput;

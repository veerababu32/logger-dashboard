import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilteredOutput from "./FilteredOutput";
import LoggerFilter from "./LoggerFilter";

const Home = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    enteredDataHandler();
  }, []);

  const enteredDataHandler = (
    logId,
    actionType,
    applicationType,
    fromDate,
    toDate,
    applicationId
  ) => {
    const arrList = [
      logId,
      actionType,
      applicationType,
      fromDate,
      toDate,
      applicationId,
    ];
    setDataList(arrList);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <Container fluid>
          <Link className="navbar-brand fw-bold" to={"/"}>
            Logger Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
      <Container fluid className="mt-4">
        <LoggerFilter enteredData={enteredDataHandler} />
        <FilteredOutput data={dataList} />
      </Container>
    </>
  );
};
export default Home;

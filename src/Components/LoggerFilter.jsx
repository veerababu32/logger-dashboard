import { useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../assets/styles.css";

const LoggerFilter = (props) => {
  const logIdRef = useRef();
  const toDateRef = useRef();
  const fromDateRef = useRef();
  const actionTypeRef = useRef();
  const applicationIdRef = useRef();
  const applicationTypeRef = useRef();
  // const [logID, setLogID] = useState("");

  // function logid(e) {
  //   setLogID(e);
  // }

  function validateAll(event) {
    event.preventDefault();
    // console.log(logID);
    const logId = logIdRef.current.value;
    const toDate = toDateRef.current.value;
    const fromDate = fromDateRef.current.value;
    const actionType = actionTypeRef.current.value;
    const applicationId = applicationIdRef.current.value;
    const applicationType = applicationTypeRef.current.value;

    props.enteredData(
      logId,
      actionType,
      applicationType,
      fromDate,
      toDate,
      applicationId
    );
  }

  const clearEnteredData = () => {
    logIdRef.current.value = "";
    toDateRef.current.value = "";
    fromDateRef.current.value = "";
    actionTypeRef.current.value = "";
    applicationIdRef.current.value = "";
    applicationTypeRef.current.value = "";
  };

  return (
    <div className="logger-container">
      <form onSubmit={validateAll}>
        <Row>
          <Col>
            <label htmlFor="logId" className="form-label fw-bold">
              Log ID
            </label>
            <input
              type="text"
              className="form-control"
              id="logId"
              placeholder="Log ID"
              // value={logID}
              // onChange={(id) => logid(id.target.value)}
              ref={logIdRef}
            />
          </Col>
          <Col>
            <label htmlFor="actionType" className="form-label fw-bold">
              Action Type
            </label>
            <select className="form-select" id="actionType" ref={actionTypeRef}>
              <option value=""></option>
              <option value="ADD_EMPLOYEE">ADD_EMPLOYEE</option>
              <option value="DARI_APP_LOGIN">DARI_APP_LOGIN</option>
              <option value="SUBMIT_APPLICATION">SUBMIT_APPLICATION</option>
              <option value="DARI_REFRESH_TOKEN">DARI_REFRESH_TOKEN</option>
              <option value="INITIATE_APPLICATION">INITIATE_APPLICATION</option>
            </select>
          </Col>
          <Col>
            <label htmlFor="applicationType" className="form-label fw-bold">
              Application Type
            </label>
            <select
              className="form-select"
              id="applicationType"
              ref={applicationTypeRef}
            >
              <option value=""></option>
              <option value="ADD_POA">ADD_POA</option>
              <option value="ADD_COMPANY">ADD_COMPANY</option>
              <option value="LEASE_CLOSURE">LEASE_CLOSURE</option>
              <option value="LEASE_REGISTRATION">LEASE_REGISTRATION</option>
              <option value="CERT_PROP_OWNERSHIP">CERT_PROP_OWNERSHIP</option>
              <option value="CERT_TITLE_DEED_PLOT">CERT_TITLE_DEED_PLOT</option>
              <option value="ADD_COMPANY_EMPLOYEE">ADD_COMPANY_EMPLOYEE</option>
            </select>
          </Col>
          <Col>
            <label htmlFor="fromDate" className="form-label fw-bold">
              From Date
            </label>
            <input
              type="date"
              className="form-control"
              id="fromDate"
              ref={fromDateRef}
            />
          </Col>
          <Col>
            <label htmlFor="toDate" className="form-label fw-bold">
              To Date
            </label>
            <input
              type="date"
              className="form-control"
              id="toDate"
              ref={toDateRef}
            />
          </Col>
          <Col>
            <label htmlFor="applicationId" className="form-label fw-bold">
              Application ID
            </label>
            <input
              type="text"
              className="form-control"
              id="applicationId"
              placeholder="Application ID"
              ref={applicationIdRef}
            />
          </Col>
          <Col>
            <label className="form-label invisible">Log ID</label>
            <div>
              <Button className="form-control" type="submit">
                Search Logger
              </Button>
            </div>
          </Col>
        </Row>
        <div className="text-end">
          <button
            className="mt-2 btn btn-outline-danger"
            onClick={clearEnteredData}
          >
            Clear Filter
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoggerFilter;

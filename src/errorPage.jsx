import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2 className="fw-bold fs-1">Oops!</h2>
      <p className="fs-3">Sorry, an unexpected error has occurred.</p>
      <p className="fs-4">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

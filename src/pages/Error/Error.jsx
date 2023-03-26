import { useRouteError, NavLink } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <NavLink to="/">
        <button className="submit">Go to homepage</button>
      </NavLink>
    </div>
  );
}

export default ErrorPage;

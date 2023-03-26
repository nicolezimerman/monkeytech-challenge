import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <header>
        <h2>The Jungle™ FastRider Service </h2>
      </header>
      <Outlet />
    </div>
  );
}

export default App;

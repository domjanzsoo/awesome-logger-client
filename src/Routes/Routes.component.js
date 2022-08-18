import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default () => {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/job-logs">All Logs</Link>
          </li>
          <li>
            <Link to="/add-job-logs">Add New Log</Link>
          </li>
        </ul>
      </nav>


      <Routes>
        <Route path="/job-logs">
          () => return (<>'Job logs'</>)
        </Route>
        <Route path="/add-job-log">
          () => return (<>'Job logs to be added'</>)
        </Route>
        <Route path="/">
          () => return <>'Awesome Logger'</>
        </Route>
      </Routes>
    </div>
  </Router>
);
}

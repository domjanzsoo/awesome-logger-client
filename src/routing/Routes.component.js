import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from '../pages/Home.component.js';
import JobLogs from '../pages/JobLogs.component.js';
import NewJobLog from '../pages/NewJobLog.component.js';


const MainRouter = () => {
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
        <Route path="/" element={<Home />} />
        <Route path="/job-logs" element={<JobLogs />} />
        <Route path="/add-job-logs" element={<NewJobLog />} />
      </Routes>

    </div>
  </Router>
);
}

export default MainRouter;

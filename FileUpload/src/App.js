import React from "react";
import "./App.css";
import { Typography } from "@material-ui/core";

import UploadFiles from "./components/upload-files.component";

function App() {
  return (
    <div className="container">
      <UploadFiles />
    </div>
  );
}

export default App;

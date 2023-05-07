import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import "./styleOverhaul.css"
import "./game/main.js"
import GUI from "./gui/gui.js";


const container = document.getElementById("gui-container");
const root = ReactDOMClient.createRoot(container)
root.render(
  <BrowserRouter>
    <GUI />
  </BrowserRouter>
);
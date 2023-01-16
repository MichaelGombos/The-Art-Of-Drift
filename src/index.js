import React from "react";
import * as ReactDOMClient from 'react-dom/client';

import "./style.css"
import "./main.js"
import GUI from "./gui/gui.js";

const container = document.getElementById("menu-container");
const root = ReactDOMClient.createRoot(container)
root.render(<GUI />);
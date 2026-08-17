import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import React from 'react'
import ReactDOM from 'react-dom/client'
window.React = React;
window.ReactDOM = ReactDOM;
createRoot(document.getElementById("root")).render(<App />);


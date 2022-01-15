import { render } from "react-dom";
import { StrictMode } from "react";


const App = () => {
  return <div>hHi</div>;
};


render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

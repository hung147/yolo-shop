import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRouter } from "./routes/route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRouter.map((route, index) => (
          <Route path={route.path} element={<route.element />} key={index} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

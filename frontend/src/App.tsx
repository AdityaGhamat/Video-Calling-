import Home from "./pages/Home";
import Room from "./pages/Room";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Room />} path="/room/:id" />
    </Routes>
  );
};

export default App;

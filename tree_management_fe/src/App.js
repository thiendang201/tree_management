import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Tree from "./pages/Tree";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tree" element={<Tree />} />
      </Route>
    </Routes>
  );
}

export default App;

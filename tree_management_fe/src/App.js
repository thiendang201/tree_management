import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Tree from "./pages/Tree";
import Plan from "./pages/Plan";
import TreeProblem from "./pages/TreeProblem";
import Statistic from "./pages/Statistic";
import Map from "./pages/Map";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="tree" element={<Tree />} />
        <Route path="plan" element={<Plan />} />
        <Route path="problem" element={<TreeProblem />} />
        <Route path="statistic" element={<Statistic />} />
        <Route path="map" element={<Map />} />
      </Route>
    </Routes>
  );
}

export default App;

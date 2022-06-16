import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/admin/Dashboard";
import Tree from "./pages/admin/Tree";
import Plan from "./pages/admin/Plan";
import TreeProblem from "./pages/admin/TreeProblem";
import Statistic from "./pages/admin/Statistic";
import Map from "./pages/admin/Map";
import AddTree from "./pages/admin/AddTree";
import AddPlan from "./pages/admin/AddPlan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route index path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/tree" element={<Tree />} />
        <Route path="admin/tree/add" element={<AddTree />} />
        <Route path="admin/plan" element={<Plan />} />
        <Route path="admin/plan/add" element={<AddPlan />} />
        <Route path="admin/problem" element={<TreeProblem />} />
        <Route path="admin/statistic" element={<Statistic />} />
        <Route path="admin/map" element={<Map />} />
      </Route>
    </Routes>
  );
}

export default App;

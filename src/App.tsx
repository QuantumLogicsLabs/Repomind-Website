import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import Architecture from "./pages/Architecture";
import GetStarted from "./pages/GetStarted";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/:slug" element={<TaskDetail />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="get-started" element={<GetStarted />} />
      </Route>
    </Routes>
    </>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AanvraagPage from "./pages/AanvraagPage.tsx";
import VoorwaardenPage from "./pages/VoorwaardenPage.tsx";
import ScrollManager from "./components/ScrollManager.tsx";

const App = () => (
  <BrowserRouter>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/aanvraag" element={<AanvraagPage />} />
      <Route path="/voorwaarden" element={<VoorwaardenPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AanvraagPage from "./pages/AanvraagPage.tsx";
import VoorwaardenPage from "./pages/VoorwaardenPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import DienstenPage from "./pages/DienstenPage.tsx";
import ScrollManager from "./components/ScrollManager.tsx";

const App = () => (
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/aanvraag" element={<AanvraagPage />} />
        <Route path="/voorwaarden" element={<VoorwaardenPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/diensten" element={<DienstenPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </MotionConfig>
);

export default App;

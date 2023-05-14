import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./Containers/LandingPage";
import ProductsPage from "./Containers/ProductsPage";
import AboutUsPage from "./Containers/AboutUsPage";
import IntegrationPage from "./Containers/IntegrationPage";
import ServicePage from "./Containers/ServicePage";
import ResponsePage from "./Containers/ResponsePage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Layout>
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/integration" element={<IntegrationPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/response" element={<ResponsePage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Layout>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

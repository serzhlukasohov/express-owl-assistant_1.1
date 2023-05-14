import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer-content">
        <div className="app-footer-content-column">
          <a href="#" className="app-footer-link">Products</a>
          <a href="#" className="app-footer-link">Integrations</a>
          <a href="#" className="app-footer-link">About us</a>
        </div>
        <div className="app-footer-content-column">
          <a href="#" className="app-footer-link">Terms & Conditions</a>
          <a href="#" className="app-footer-link">Privacy Policy</a>
          <a href="#" className="app-footer-link">Our Mission</a>
        </div>
        <div className="app-footer-content-column">
          <a href="#" className="app-footer-link">FAQ</a>
          <a href="#" className="app-footer-link">Contact US</a>
          <a href="#" className="app-footer-link">Sitemap</a>
        </div>
      </div>
      <p className="copy">© COPYRIGHT 2023 AIVENGERS RIGHTS RESERVED.</p>
    </footer>
  );
};

export default Footer;

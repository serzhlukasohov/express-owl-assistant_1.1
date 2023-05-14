import LogoSRC from "../../assets/logo.png";
import Button from "../Button/Button";
import Image from "../Image/Image";
import { Link } from "react-router-dom";

import "./Header.scss";
import { useState } from "react";
import RequestDemoModal from "../RequestDemo/RequestDemoModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <a href="/">
          <Image src={LogoSRC} alt="logo" className="app-header-logo" />
        </a>
        <nav className="header-nav">
          <li className="nav-li">
            <Link className="nav-link" to="/service">
              Service
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-link" to="/integration">
              Integration
            </Link>
          </li>
          <li className="nav-li">
            <Link className="nav-link" to="/about-us">
              About us
            </Link>
          </li>
        </nav>
        <div className="flex">
          <Button
            className="margin-right-m"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            REQUEST DEMO
          </Button>
          <Link to="/service">
            <Button primary={false}>GET STARTED NOW</Button>
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <RequestDemoModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;

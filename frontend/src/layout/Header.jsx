import React from 'react';
import logo from '../images/aamec_logo.jpg';
import nba from '../images/NBA.png';
import naac from '../images/naac.jpg';

function Header() {
  return (
    <header className="bg-light py-3 shadow-lg">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          
          {/* College Logo - always visible */}
          <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-center">
            <img src={logo} alt="AAMEC Logo" width="100" className="img-fluid" />
          </div>

          {/* Main Text Content */}
          <div className="col-12 col-md-8">
            <h1 className="h5 fw-bold text-primary mb-1">
              ANJALAI AMMAL MAHALINGAM ENGINEERING COLLEGE
            </h1>
            <h2 className="h6 text-dark mb-1">
              KOVILVENNI-614 403, THIRUVARUR DISTRICT
            </h2>
            <h3 className="h6 text-success mb-0 d-none d-md-block">
              NAAC Accredited with “B” Grade & NBA (ECE, IT, MECH)
            </h3>
          </div>

          {/* NAAC Logo - hide on mobile */}
          <div className="col-md-2 mt-3 mt-md-0 d-none d-md-flex justify-content-center">
            <img src={naac} alt="NAAC Logo" width="100" className="img-fluid" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
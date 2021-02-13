import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="container-fluid pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md">
          <span className="bg-warning fs-5 px-2 pb-1 rounded">My website</span>
          <small className="d-block my-3 text-muted">© 2017-2021</small>
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li><Link to="#" className="link-secondary">Cool stuff</Link></li>
            <li><Link to="#" className="link-secondary">Random feature</Link></li>
            <li><Link to="#" className="link-secondary">Team feature</Link></li>
            <li><Link to="#" className="link-secondary">Stuff for developers</Link></li>
            <li><Link to="#" className="link-secondary">Another one</Link></li>
            <li><Link to="#" className="link-secondary">Last time</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
            <li><Link to="#" className="link-secondary">Resource</Link></li>
            <li><Link to="#" className="link-secondary">Resource name</Link></li>
            <li><Link to="#" className="link-secondary">Another resource</Link></li>
            <li><Link to="#" className="link-secondary">Final resource</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li><Link to="#" className="link-secondary">Team</Link></li>
            <li><Link to="#" className="link-secondary">Locations</Link></li>
            <li><Link to="#" className="link-secondary">Privacy</Link></li>
            <li><Link to="#" className="link-secondary">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

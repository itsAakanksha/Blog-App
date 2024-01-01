import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
          {/* Add your logo component here */}
          {/* <Logo width="100px" /> */}
          <p className="mt-4 text-gray-300">
            &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
          </p>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Features
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Pricing
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Affiliate Program
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-300">
                Press Kit
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Account
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Help
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-300">
                Customer Support
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Legals</h3>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Terms &amp; Conditions
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/" className="hover:text-gray-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-300">
                Licensing
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

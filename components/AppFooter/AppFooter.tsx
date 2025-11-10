import Link from 'next/link';

export default function AppFooter() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="content-wrapper">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5>About Us</h5>
            <p>We provide high-quality content and services to help your business grow.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/about">
                  <span className="text-light">About</span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-light">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-light">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-light">Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                Email:{' '}
                <a href="mailto:info@example.com" className="text-light">
                  info@example.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+1234567890" className="text-light">
                  +1 (234) 567-890
                </a>
              </li>
              <li>Address: 123 Main Street, City, Country</li>
            </ul>
          </div>
        </div>

        <hr className="bg-light" />

        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="/privacy-policy" className="text-light me-3">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-light">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

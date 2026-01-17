import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">

        {/* Contact Details */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Details</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <span>156-157, Block 3, BYJCHS, Bahadurabad Karachi, Pakistan</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <span>Safa Mall, Ziarat Line, Malir Cantonment Karachi, Pakistan</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-1" />
              <span>(021) 111-624-333</span>
            </li>
          </ul>
          <p className="text-sm text-gray-400 mt-4">
            Customer Support: 7 Days a Week, 9:00am - 10:00pm
          </p>

          <div className="flex gap-4 mt-5 text-gray-300">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-pink-400"><Instagram /></a>
            <a href="#" className="hover:text-red-500"><Youtube /></a>
            <a href="#" className="hover:text-blue-500"><Linkedin /></a>
          </div>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="font-bold text-lg mb-4">Customer Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Contact Us and Location</a></li>
            <li><a href="#" className="hover:text-white">Delivery Info</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Naheed Loyalty</a></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-bold text-lg mb-4">Information</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Return & Refund</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-4">Subscribe our Newsletter</h3>
          <p className="text-sm text-gray-300 mb-3">
            Get the latest offers and promotions!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-lg px-3 py-2 text-black focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg font-medium">
              Subscribe
            </button>
          </div>

          <div className="flex gap-3 mt-5">
            <img src="/googleplay.png" alt="Google Play" className="h-10" />
            <img src="/appstore.png" alt="App Store" className="h-10" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-sm text-gray-400">
        <p>Copyright © 2025 Naheed.pk. All rights reserved.</p>
        <div className="flex gap-3 mt-3 md:mt-0">
          <img src="/hbl.png" alt="HBL" className="h-6" />
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/mastercard.png" alt="Mastercard" className="h-6" />
          <img src="/easypaisa.png" alt="Easypaisa" className="h-6" />
          <img src="/cod.png" alt="Cash on Delivery" className="h-6" />
        </div>
      </div>
    </footer>
  );
}

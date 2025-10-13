'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  CreditCard,
  Shield,
  Headphones,
  Truck
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Free delivery for orders over $50"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Guarantee",
      description: "30-day money back guarantee"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Contact", href: "/dashboard/contact" },
  ];

  const categories = [
    { name: "Electronics", href: "/dashboard/product" },
    { name: "Fashion", href: "/dashboard/product" },
    { name: "Home & Garden", href: "/dashboard/product" },
    { name: "Sports", href: "/dashboard/product" },
    { name: "Beauty", href: "/dashboard/product" },
    { name: "Toys", href: "/dashboard/product" }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" }
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Features Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-blue-400 bg-blue-400/10 p-3 rounded-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">PurePick</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for quality products. We deliver excellence 
              and innovation right to your doorstep.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">majidalitangri7@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+92 0331-0249986</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Phase 1,Qasimabad Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={category.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
        

            {/* Social Links */}
            <div className="">
              <h5 className="text-white font-semibold mb-4">Follow Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Majid. All rights reserved.
            </p>
            
            <div className="flex gap-6 text-sm">
              <Link href="/dashboard/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/dashboard/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/dashboard/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Accepted Payments:</span>
              <div className="flex gap-2">
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center text-xs">VISA</div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center text-xs">MC</div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center text-xs">PP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
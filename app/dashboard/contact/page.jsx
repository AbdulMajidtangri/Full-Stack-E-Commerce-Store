import React from 'react';

export const dynamic = 'force-dynamic';

const ContactPage = async () => {
  return (
    <main className="min-h-screen bg-white py-20 px-6 flex flex-col items-center">
      <section className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-black">Contact Us</h1>
        <p className="text-gray-600 mb-10 text-lg">
          We'd love to hear from you!  
          Whether you have a question about products, orders, or anything else — our team is ready to help.
        </p>

        <form className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm w-full text-left">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm font-medium">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
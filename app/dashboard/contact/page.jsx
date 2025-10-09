import React from 'react';

export const dynamic = 'force-dynamic'; // Forces SSR

const ContactPage = async () => {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-6 flex flex-col items-center">
      <section className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-300 mb-10 text-lg">
          We’d love to hear from you!  
          Whether you have a question about products, orders, or anything else — our team is ready to help.
        </p>

        <form className="bg-neutral-900 border border-gray-800 rounded-xl p-8 shadow-lg w-full text-left">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2 text-sm">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2 text-sm">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2 text-sm">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;

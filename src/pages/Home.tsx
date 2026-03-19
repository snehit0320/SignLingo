import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Languages, MessageSquare, Video, Brain } from 'lucide-react';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Breaking Communication Barriers
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Real-time sign language translation powered by advanced AI technology
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/sign-to-text"
              className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              Try Sign to Text
            </Link>
            <Link
              to="/text-to-sign"
              className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Try Text to Sign
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {[
          {
            icon: <Languages className="w-8 h-8 text-indigo-600" />,
            title: "Real-time Translation",
            description: "Instant translation between sign language and text/speech"
          },
          {
            icon: <Video className="w-8 h-8 text-purple-600" />,
            title: "Video Recognition",
            description: "Advanced AI-powered sign language recognition system"
          },
          {
            icon: <Brain className="w-8 h-8 text-indigo-600" />,
            title: "Neural Network",
            description: "State-of-the-art machine learning models for accuracy"
          },
          {
            icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
            title: "AI Assistant",
            description: "24/7 AI chatbot support for seamless communication"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Demo Section */}
      <section className="mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">See It in Action</h2>
          <div className="aspect-video bg-gray-100 rounded-xl shadow-lg mb-8">
            <img
              src="https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Sign Language Translation Demo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={4}
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  );
}

export default Home;
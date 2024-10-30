import React from 'react';
import { MapPin, Users, Brain, MessageSquare } from 'lucide-react';

const features = [
  { 
    icon: <Brain className="w-8 h-8" />, 
    title: "AI-Powered Search", 
    desc: "Ask questions naturally and get personalized recommendations powered by advanced AI technology." 
  },
  { 
    icon: <MessageSquare className="w-8 h-8" />, 
    title: "Voice Assistant", 
    desc: "Hands-free navigation with our voice-enabled AI assistant for on-the-go recommendations." 
  },
  { 
    icon: <MapPin className="w-8 h-8" />, 
    title: "Local Transport Network", 
    desc: "Connect directly with verified local drivers for safe and reliable transportation." 
  },
  { 
    icon: <Users className="w-8 h-8" />, 
    title: "Community & Events", 
    desc: "Stay updated with local events, festivals, and exclusive community gatherings." 
  }
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Experience Diani Like Never Before
          <span className="block text-xl md:text-2xl mt-2 text-gray-600">
            Powered by AI, Driven by Community
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div 
              key={i} 
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-4 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
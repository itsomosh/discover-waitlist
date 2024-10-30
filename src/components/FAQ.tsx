import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What makes Discover Diani different?",
    answer: "Discover Diani is the first AI-powered platform specifically designed for Diani Beach. We combine advanced technology with local expertise to offer personalized recommendations, real-time transport options, and exclusive local experiences you won't find anywhere else."
  },
  {
    question: "How does the AI assistant work?",
    answer: "Our AI assistant understands natural language queries and provides personalized recommendations based on your preferences. Whether you're looking for 'the best seafood near me' or 'scenic sunset spots,' it learns from each interaction to offer increasingly tailored suggestions."
  },
  {
    question: "Is it free to join?",
    answer: "Yes! Joining Discover Diani is completely free for users. We're currently offering early access to our platform, and the first 100 businesses can list their services for free."
  },
  {
    question: "What types of businesses can join?",
    answer: "We welcome all legitimate businesses in Diani Beach, including hotels, restaurants, tour operators, transport services, and local artisans. Our platform is designed to showcase the best of what Diani has to offer."
  }
];

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ${
                  openFaq === index ? 'max-h-48' : 'max-h-0'
                } overflow-hidden`}
              >
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
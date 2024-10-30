import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SignUpForm } from './components/SignUpForm';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

function App() {
  const [userType, setUserType] = useState<'user' | 'business'>('user');

  return (
    <div className="min-h-screen bg-white">
      <Hero onUserTypeChange={setUserType} />
      <Features />
      <SignUpForm userType={userType} />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
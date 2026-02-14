
import React, { useState } from 'react';
import { Smartphone, ChevronRight } from 'lucide-react';

const USSDSimulator: React.FC = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');

  const screens = [
    {
      text: "Welcome to Daily Collect\n1. Register\n2. Balance\n3. Pay Levy\n4. Withdraw",
      options: ['1', '2', '3', '4']
    },
    {
      text: "Enter your NIN or BVN to start registration:",
      placeholder: "11 digits..."
    },
    {
      text: "Registration Successful!\nYour Business Wallet is linked to OPay.\n\nPress 0 to return.",
      options: ['0']
    }
  ];

  const handleSend = () => {
    if (step === 0 && input === '1') setStep(1);
    else if (step === 1 && input.length >= 10) setStep(2);
    else if (step === 2 && input === '0') {
      setStep(0);
      setInput('');
    } else {
      alert("Invalid selection for this demo.");
    }
    setInput('');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6 text-emerald-600 font-bold">
        <Smartphone size={24} />
        <span>Try the *555# Simulator</span>
      </div>
      
      <div className="relative bg-gray-900 rounded-[3rem] p-4 border-4 border-gray-800 shadow-2xl">
        <div className="bg-white rounded-[2rem] h-[400px] overflow-hidden flex flex-col p-6 pt-12">
          <div className="ussd-screen flex-grow whitespace-pre-wrap text-sm text-gray-800 border-emerald-500/30 border">
            {screens[step].text}
          </div>
          
          <div className="mt-4 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={screens[step].placeholder || "Enter choice..."}
              className="flex-grow border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-emerald-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-emerald-700 transition"
            >
              Send
            </button>
          </div>
        </div>
        <div className="h-2 w-16 bg-gray-700 mx-auto mt-6 rounded-full"></div>
      </div>
      
      <p className="mt-6 text-center text-xs text-gray-500 italic">
        *Daily Collect works on any phone, no internet required.
      </p>
    </div>
  );
};

export default USSDSimulator;


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
    const trimmedInput = input.trim();
    if (step === 0 && trimmedInput === '1') setStep(1);
    else if (step === 1 && trimmedInput.length >= 10) setStep(2);
    else if (step === 2 && trimmedInput === '0') {
      setStep(0);
      setInput('');
    } else {
      // In a real app we'd show an error on screen
      alert("Invalid selection for this demo.");
    }
    setInput('');
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 w-full max-w-[360px] mx-auto">
      <div className="flex items-center gap-2 mb-6 text-emerald-600 font-black text-sm uppercase tracking-widest justify-center">
        <Smartphone size={20} />
        <span>Live Simulator</span>
      </div>
      
      {/* Phone Shell */}
      <div className="relative bg-gray-900 rounded-[3.5rem] p-3 border-[6px] border-gray-800 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
        
        {/* Screen */}
        <div className="bg-white rounded-[2.8rem] h-[480px] overflow-hidden flex flex-col relative">
          {/* USSD Content Area */}
          <div className="flex-grow p-6 pt-12 overflow-y-auto">
            <div className="ussd-text whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800 font-medium">
              {screens[step].text}
            </div>
          </div>
          
          {/* Input Area - Fixed at bottom of screen */}
          <div className="p-5 bg-gray-50 border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={screens[step].placeholder || "Choice..."}
                className="flex-grow border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:border-emerald-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-emerald-700 transition active:scale-95 shadow-lg shadow-emerald-500/20"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="h-1.5 w-20 bg-gray-700/50 mx-auto mt-4 mb-2 rounded-full"></div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital inclusion in progress</p>
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-emerald-500/30"></div>)}
        </div>
      </div>
      
      <style>{`
        .ussd-text {
          font-family: 'Inter', system-ui, sans-serif;
        }
        /* Custom scrollbar for content area */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default USSDSimulator;

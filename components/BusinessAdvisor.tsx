
import React, { useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { getBusinessAdvice } from '../services/geminiService';

const BusinessAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const advice = await getBusinessAdvice(query);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <section id="advisor" className="py-20 bg-emerald-900 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500 rounded-xl">
                <Bot size={32} />
              </div>
              <h2 className="text-3xl font-bold">Business Growth Advisor</h2>
            </div>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
              Ask our AI advisor how Daily Collect can help your specific business. 
              Whether you sell at Balogun Market or run a workshop in Kano, we're here to help you scale.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Example: How can Daily Collect help my tomato business in Kano grow?"
                  className="w-full bg-emerald-800/50 border border-emerald-700 rounded-2xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-400/60 h-32 resize-none"
                />
                <button 
                  disabled={loading}
                  className="absolute bottom-4 right-4 p-2 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 min-h-[300px] border border-white/10 shadow-2xl">
              {response ? (
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-emerald-50 leading-relaxed">
                    {response}
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <Bot size={48} className="text-emerald-400/50 mb-4" />
                  <p className="text-emerald-300">
                    Your business advice will appear here. Try asking a question!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 blur-3xl rounded-full"></div>
    </section>
  );
};

export default BusinessAdvisor;


import React, { useState } from 'react';
import { User } from '../types';
import { Smartphone, Lock, User as UserIcon, ShieldCheck, Briefcase } from 'lucide-react';

interface AuthProps {
  mode: 'login' | 'register';
  onAuthSuccess: (user: User) => void;
  onToggleMode: () => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onAuthSuccess, onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: '',
    nin: '',
    pin: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const db = JSON.parse(localStorage.getItem('daily_collect_users') || '[]');

      if (mode === 'register') {
        if (db.find((u: User) => u.phone === formData.phone)) {
          throw new Error('This phone number is already registered.');
        }

        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name,
          phone: formData.phone,
          businessType: formData.businessType,
          nin: formData.nin,
          pin: formData.pin,
          balance: 0,
          levyDue: 200
        };

        db.push(newUser);
        localStorage.setItem('daily_collect_users', JSON.stringify(db));
        onAuthSuccess(newUser);
      } else {
        const user = db.find((u: User) => u.phone === formData.phone && u.pin === formData.pin);
        if (!user) throw new Error('Invalid phone number or PIN.');
        onAuthSuccess(user);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto py-24 px-4">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-10 reveal active">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-emerald-500/20">
            {mode === 'login' ? <Lock size={32} /> : <UserIcon size={32} />}
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">
            {mode === 'login' ? 'Merchant Login' : 'Open Business Account'}
          </h2>
          <p className="text-slate-500 font-medium">
            {mode === 'login' ? 'Access your business wallet' : 'Start collecting revenue digitally'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold flex items-center gap-2">
            <ShieldCheck size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  required
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 focus:outline-none transition-colors font-bold text-slate-900"
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <select 
                  required
                  name="businessType"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 focus:outline-none transition-colors font-bold text-slate-900 appearance-none"
                  onChange={handleInputChange}
                >
                  <option value="">Select Business Type</option>
                  <option value="Street Vendor">Street Vendor</option>
                  <option value="Market Trader">Market Trader</option>
                  <option value="Artisan">Artisan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  required
                  name="nin"
                  placeholder="NIN or BVN (11 Digits)"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 focus:outline-none transition-colors font-bold text-slate-900"
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <div className="relative">
            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              required
              name="phone"
              placeholder="Phone Number (Primary ID)"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 focus:outline-none transition-colors font-bold text-slate-900"
              onChange={handleInputChange}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              required
              name="pin"
              type="password"
              placeholder="4-6 Digit Secure PIN"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 focus:outline-none transition-colors font-bold text-slate-900"
              onChange={handleInputChange}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Complete Registration'}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 font-bold">
          {mode === 'login' ? (
            <p>New merchant? <button onClick={onToggleMode} className="text-emerald-600">Register now</button></p>
          ) : (
            <p>Already registered? <button onClick={onToggleMode} className="text-emerald-600">Login here</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

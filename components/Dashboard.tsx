
import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Building2, 
  QrCode, 
  CreditCard,
  LogOut
} from 'lucide-react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const transactions = [
    { id: 1, type: 'in', amount: 4500, from: 'Customer Transfer', date: 'Today, 10:30 AM' },
    { id: 2, type: 'out', amount: 200, from: 'Daily Market Levy', date: 'Today, 08:00 AM' },
    { id: 3, type: 'in', amount: 12000, from: 'QR Payment', date: 'Yesterday' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Welcome back, {user.name}</h1>
          <p className="text-slate-500 font-medium">{user.businessType} | {user.phone}</p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#1a2e2e] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2 text-emerald-400 font-black uppercase tracking-widest text-xs">
                  <Wallet size={16} /> Business Wallet
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <QrCode size={24} />
                </div>
              </div>
              <div className="mb-8">
                <span className="text-emerald-400 text-lg font-bold mb-1 block">Total Balance</span>
                <span className="text-5xl font-black">₦{user.balance.toLocaleString()}</span>
              </div>
              <div className="flex gap-4">
                <button className="bg-emerald-500 text-[#1a2e2e] px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2">
                  <ArrowDownLeft size={16} /> Withdraw
                </button>
                <button className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2">
                  <CreditCard size={16} /> Pay Levy
                </button>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900">Recent Transactions</h3>
              <button className="text-emerald-600 font-bold text-sm">View All</button>
            </div>
            <div className="space-y-6">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {tx.type === 'in' ? <ArrowDownLeft /> : <ArrowUpRight />}
                    </div>
                    <div>
                      <div className="font-black text-slate-900">{tx.from}</div>
                      <div className="text-xs text-slate-400 font-bold">{tx.date}</div>
                    </div>
                  </div>
                  <div className={`font-black ${tx.type === 'in' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tx.type === 'in' ? '+' : '-'} ₦{tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100">
            <div className="flex items-center gap-3 text-amber-600 font-black mb-6">
              <Clock size={24} />
              <span>Compliance Status</span>
            </div>
            <div className="mb-6">
              <div className="text-sm text-amber-900/60 font-bold uppercase tracking-wider mb-2">Next Market Stall Levy Due</div>
              <div className="text-3xl font-black text-amber-900">₦{user.levyDue}</div>
            </div>
            <button className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20">
              Settle Now
            </button>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <div className="flex items-center gap-3 text-emerald-400 font-black mb-6">
              <Building2 size={24} />
              <span>Partner Services</span>
            </div>
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
              Unlock a micro-loan of up to ₦50,000 based on your transaction history.
            </p>
            <button className="w-full bg-emerald-500 text-[#1a2e2e] py-4 rounded-2xl font-black hover:bg-emerald-400 transition-colors">
              Check Eligibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

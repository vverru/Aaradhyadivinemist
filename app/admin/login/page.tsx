'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useAuth } from '@/components/context/AuthContext';
import { useToast } from '@/components/context/ToastContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('admin@aaradhyadivinemist.com');
  const [password, setPassword] = useState('AaradhyaDivine2026!');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        login(data.user.email, data.user.name, 'admin');
        showToast('Welcome, Administrator. Access granted to Sanctuary Suite.', 'success');
        router.push('/admin');
      } else {
        setErrorMsg(data.message || 'Invalid administrator credentials');
      }
    } catch {
      setErrorMsg('Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-forest flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <BrandLogo variant="light" size="lg" showTagline={true} />
        </div>

        <div className="bg-brand-ivory rounded-2xl border border-brand-gold/40 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest text-brand-gold text-[10px] uppercase font-mono font-bold tracking-widest mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Sanctuary Portal</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-forest">
              Administrator Login
            </h2>
            <p className="text-xs text-brand-text-muted font-sans">
              Enter your authorized management credentials to manage orders and catalog.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold bg-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-forest text-brand-ivory text-xs font-sans tracking-[0.2em] font-semibold rounded-lg hover:bg-brand-forest-light transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
              {loading ? 'AUTHENTICATING...' : 'ENTER ADMIN PORTAL'}
            </button>
          </form>

          {/* Preset Credentials Box */}
          <div className="p-3 rounded-lg bg-brand-sage/30 border border-brand-gold/25 text-[11px] text-brand-forest font-sans space-y-1">
            <p className="font-bold">Default Demo Credentials:</p>
            <p>Email: <code className="font-mono text-brand-forest-dark">admin@aaradhyadivinemist.com</code></p>
            <p>Password: <code className="font-mono text-brand-forest-dark">AaradhyaDivine2026!</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

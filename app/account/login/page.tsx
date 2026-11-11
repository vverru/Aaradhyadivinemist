'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useToast } from '@/components/context/ToastContext';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    login(email, fullName || 'Valued Devotee', 'customer');
    showToast(isRegister ? 'Welcome to the Aaradhya Circle!' : 'Signed in successfully!', 'success');
    router.push('/account');
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="text-center mb-8">
          <BrandLogo variant="dark" size="md" showTagline={true} />
        </div>

        <div className="bg-white rounded-2xl border border-brand-gold/30 p-8 shadow-luxury space-y-6">
          <div className="text-center space-y-1">
            <h1 className="font-serif text-2xl font-bold text-brand-forest">
              {isRegister ? 'Join the Aaradhya Circle' : 'Devotee Sign In'}
            </h1>
            <p className="text-xs text-brand-text-muted font-sans">
              {isRegister
                ? 'Create an account to track sacred orders and save addresses'
                : 'Access your order history, tracking and saved sacred fragrances'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            {isRegister && (
              <>
                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Meera Raman"
                      className="w-full pl-9 pr-3 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-brand-forest mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-9 pr-3 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold font-mono"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block font-semibold text-brand-forest mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="devotee@example.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block font-semibold text-brand-forest">
                  Password *
                </label>
                {!isRegister && (
                  <button type="button" className="text-[11px] text-brand-gold-dark hover:underline">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 border border-brand-gold/30 rounded-lg text-brand-forest focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-forest text-brand-ivory text-xs font-sans tracking-[0.2em] font-semibold rounded-lg hover:bg-brand-forest-light transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
              {isRegister ? 'CREATE ACCOUNT' : 'SIGN IN SECURELY'}
            </button>
          </form>

          <div className="pt-2 border-t border-brand-gold/15 text-center text-xs font-sans">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-brand-forest font-semibold hover:text-brand-gold"
            >
              {isRegister
                ? 'Already have an account? Sign In'
                : "Don't have an account? Register with Aaradhya"}
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-stone-500 font-sans">
          <span>Are you a store manager? </span>
          <Link href="/admin/login" className="text-brand-forest font-semibold underline">
            Go to Admin Dashboard Portal →
          </Link>
        </div>
      </div>
    </div>
  );
}

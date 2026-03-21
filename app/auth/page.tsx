'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (mode === 'signin') {
      const { error } = await signIn(email, password);
      if (error) {
        setError('Неверный email или пароль');
      } else {
        router.push('/account');
      }
    } else {
      if (!fullName.trim()) { setError('Введите имя'); setLoading(false); return; }
      if (password.length < 6) { setError('Пароль минимум 6 символов'); setLoading(false); return; }
      const { error } = await signUp(email, password, fullName, phone);
      if (error) {
        setError('Ошибка регистрации: ' + error);
      } else {
        setSuccess('Проверьте email — отправлена ссылка для подтверждения');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Link>
        <Link href="/">
          <span className="text-xl font-bold">
            <span className="text-[#FFD700]">DU</span>
            <span className="text-white">CANI</span>
          </span>
        </Link>
        <div className="w-16" />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#FFD700]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">
              {mode === 'signin' ? 'Войти в аккаунт' : 'Создать аккаунт'}
            </h1>
            <p className="text-white/40 text-sm">
              {mode === 'signin'
                ? 'Войди чтобы отслеживать заказы'
                : 'Зарегистрируйся для покупок на DUCANI'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1">
            <button
              onClick={() => { setMode('signin'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === 'signin' ? 'bg-[#FFD700] text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Войти
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === 'signup' ? 'bg-[#FFD700] text-black' : 'text-white/50 hover:text-white'
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-white/60 text-xs mb-1.5 font-medium">Имя и фамилия</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Жахонбек Шерматов"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1.5 font-medium">Номер телефона</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-white/60 text-xs mb-1.5 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-white/60 text-xs mb-1.5 font-medium">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Минимум 6 символов' : '••••••••'}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/50 text-sm pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#FFD700] hover:bg-[#FFC700] disabled:opacity-50 text-black font-bold rounded-xl transition-colors text-sm"
            >
              {loading
                ? 'Подождите...'
                : mode === 'signin'
                ? 'Войти'
                : 'Создать аккаунт'}
            </button>
          </form>

          <div className="flex items-center gap-3 px-4 py-3 bg-white/3 border border-white/5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-[#FFD700] shrink-0" />
            <p className="text-white/30 text-xs">
              Твои данные защищены. Мы не передаём их третьим лицам.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

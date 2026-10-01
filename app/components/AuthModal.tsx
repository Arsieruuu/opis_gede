'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Award,
  Layers,
  Building,
  Key,
  Mail,
  User,
  ArrowRight,
  Database
} from 'lucide-react';
import { UserRole } from '../lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'demo' | 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const { allUsers, loginAsUser, registerUser, currentUser } = useApp();
  const [mode, setMode] = useState<'demo' | 'login' | 'register'>(defaultMode);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setLoginError('');
    }
  }, [defaultMode, isOpen]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regStep, setRegStep] = useState<1 | 2>(1);
  const [regRole, setRegRole] = useState<UserRole>('mahasiswa');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Specific Profile form state
  // Mahasiswa
  const [npm, setNpm] = useState('');
  const [prodi, setProdi] = useState('S1 Teknik Informatika');
  const [jurusan, setJurusan] = useState('Teknik Informatika & Komputer');
  const [semester, setSemester] = useState('6');
  const [ipk, setIpk] = useState('3.85');

  // Dosen
  const [nip, setNip] = useState('');
  const [nidn, setNidn] = useState('');
  const [bidang, setBidang] = useState('Artificial Intelligence, Software Engineering');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const found = allUsers.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
    );
    if (found) {
      loginAsUser(found.id);
      onClose();
    } else {
      setLoginError('Email belum terdaftar. Gunakan email demo atau buat akun baru.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) {
      alert('Harap lengkapi semua kolom');
      return;
    }

    const specificProfile: any = {};
    if (regRole === 'mahasiswa') {
      specificProfile.npm = npm || '2110512001';
      specificProfile.prodi = prodi;
      specificProfile.jurusan = jurusan;
      specificProfile.semester = Number(semester) || 1;
      specificProfile.ipk = Number(ipk) || 3.75;
      specificProfile.bio = 'Mahasiswa aktif berprestasi siap berkolaborasi.';
    } else if (regRole === 'dosen') {
      specificProfile.nip = nip || '198801012015041001';
      specificProfile.nidn = nidn || '0001018801';
      specificProfile.prodi = prodi;
      specificProfile.fakultas = 'Fakultas Ilmu Komputer';
      specificProfile.bidangKeahlian = bidang.split(',').map((s) => s.trim());
    } else if (regRole === 'prodi') {
      specificProfile.kodeProdi = 'IF-S1';
      specificProfile.namaProdi = prodi;
      specificProfile.fakultas = 'Fakultas Ilmu Komputer';
    } else if (regRole === 'jurusan') {
      specificProfile.kodeJurusan = 'JTIK';
      specificProfile.namaJurusan = jurusan;
    } else if (regRole === 'wadir3') {
      specificProfile.jabatan = 'Wakil Direktur III';
      specificProfile.skWadir = 'SK/DIR/2026/WADIR3';
    }

    registerUser(
      {
        name: regName,
        email: regEmail,
        role: regRole,
        avatar:
          regRole === 'mahasiswa'
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      specificProfile
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 sacset-card-shadow flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L3 8.5L16 15L29 8.5L16 2Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M3 13.5L16 20L29 13.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 18.5L16 25L29 18.5" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Masuk ke E-ofiice
              </h3>
              <p className="text-xs text-slate-500">
                PBL & Student Competition Hub (Multi-Role)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 mt-4 p-1 rounded-full bg-slate-100 border border-slate-200">
          <button
            onClick={() => setMode('demo')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
              mode === 'demo'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ Quick Demo Switch
          </button>
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
              mode === 'login'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Login Akun
          </button>
          <button
            onClick={() => {
              setMode('register');
              setRegStep(1);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all ${
              mode === 'register'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {/* TAB 1: QUICK DEMO */}
          {mode === 'demo' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                <p className="font-bold mb-0.5">Pilih Perspektif Demo 1-Klik:</p>
                <p className="text-[11px] text-blue-700">
                  Uji coba instan alur data antar tabel relasional (Mahasiswa, Dosen, Prodi, Jurusan, Wadir 3).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allUsers.map((u) => {
                  let badge = 'Mahasiswa';
                  let desc = 'Tabel users + mahasiswa';
                  if (u.id === 'user_mhs_1') badge = 'Ketua Tim (Mahasiswa)';
                  if (u.id === 'user_mhs_2') badge = 'Anggota Tim (Mahasiswa)';
                  if (u.role === 'dosen') {
                    badge = 'Dosen Pembimbing';
                    desc = 'Tabel users + dosen';
                  } else if (u.role === 'prodi') {
                    badge = 'Admin Prodi';
                    desc = 'Tabel users + prodi_users';
                  } else if (u.role === 'jurusan') {
                    badge = 'Admin Jurusan';
                    desc = 'Tabel users + jurusan_users';
                  } else if (u.role === 'wadir3') {
                    badge = 'Wadir III (Exec)';
                    desc = 'Tabel users + wadir3_users';
                  }

                  const isCurrent = currentUser?.id === u.id;

                  return (
                    <button
                      key={u.id}
                      onClick={() => {
                        loginAsUser(u.id);
                        onClose();
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-300'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">{u.name}</p>
                          <span className="text-[10px] font-semibold text-blue-600 block">
                            {badge}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-1.5">
                        {desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 py-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Akun (tabel <code>users</code>)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="misal: aria.pratama@student.univ.ac.id"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                <span className="font-bold text-slate-800">Email Cepat Demo:</span>
                <div className="mt-1 space-y-0.5 font-mono text-[10px] text-blue-600">
                  <div>aria.pratama@student.univ.ac.id (Ketua Mahasiswa)</div>
                  <div>citra.lestari@student.univ.ac.id (Anggota Mahasiswa)</div>
                  <div>hendra.wijaya@univ.ac.id (Dosen Reviewer)</div>
                </div>
              </div>

              {loginError && (
                <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-semibold text-rose-700">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all shadow"
              >
                Masuk ke Dashboard
              </button>
            </form>
          )}

          {/* TAB 3: REGISTER */}
          {mode === 'register' && (
            <div className="py-2 space-y-4">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
                <span className={regStep === 1 ? 'text-blue-600 font-bold' : ''}>1. Akun Utama (users)</span>
                <span>➔</span>
                <span className={regStep === 2 ? 'text-blue-600 font-bold' : ''}>2. Profil Spesifik ({regRole})</span>
              </div>

              {regStep === 1 ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pilih Role
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(
                        [
                          { key: 'mahasiswa', label: 'Mahasiswa', desc: 'tabel mahasiswa' },
                          { key: 'dosen', label: 'Dosen Pembimbing', desc: 'tabel dosen' },
                          { key: 'prodi', label: 'Admin Prodi', desc: 'tabel prodi_users' },
                          { key: 'jurusan', label: 'Admin Jurusan', desc: 'tabel jurusan_users' },
                          { key: 'wadir3', label: 'Wadir III', desc: 'tabel wadir3_users' }
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setRegRole(item.key)}
                          className={`p-2.5 rounded-2xl border text-left transition-all ${
                            regRole === item.key
                              ? 'bg-blue-50 border-blue-500 text-blue-900'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <p className="text-xs font-bold">{item.label}</p>
                          <p className="text-[10px] text-blue-600 font-mono">{item.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Kevin Sanjaya"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="kevin@student.univ.ac.id"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!regName || !regEmail) {
                        alert('Harap masukkan nama dan email');
                        return;
                      }
                      setRegStep(2);
                    }}
                    className="w-full py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Lanjut ke Profil Spesifik</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                    <p className="font-bold">
                      Tabel Tujuan: <code>{regRole === 'mahasiswa' ? 'mahasiswa' : regRole === 'dosen' ? 'dosen' : `${regRole}_users`}</code>
                    </p>
                  </div>

                  {regRole === 'mahasiswa' && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">NPM</label>
                        <input
                          type="text"
                          value={npm}
                          onChange={(e) => setNpm(e.target.value)}
                          placeholder="2110511099"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Prodi</label>
                          <input
                            type="text"
                            value={prodi}
                            onChange={(e) => setProdi(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Jurusan</label>
                          <input
                            type="text"
                            value={jurusan}
                            onChange={(e) => setJurusan(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {regRole === 'dosen' && (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">NIP</label>
                          <input
                            type="text"
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            placeholder="198701012015011001"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">NIDN</label>
                          <input
                            type="text"
                            value={nidn}
                            onChange={(e) => setNidn(e.target.value)}
                            placeholder="0001018701"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setRegStep(1)}
                      className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={handleRegisterSubmit}
                      className="flex-1 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow"
                    >
                      Konfirmasi Pendaftaran
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

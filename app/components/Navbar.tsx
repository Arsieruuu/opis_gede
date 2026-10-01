'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  ChevronDown,
  LogOut,
  Layers,
  GraduationCap,
  Award,
  Building,
  Briefcase,
  SlidersHorizontal,
  Bell,
  Home
} from 'lucide-react';
import { UserRole } from '../lib/types';

interface NavbarProps {
  onOpenAuthModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGoToLanding?: () => void;
}

export default function Navbar({
  onOpenAuthModal,
  activeTab,
  setActiveTab,
  onGoToLanding
}: NavbarProps) {
  const {
    currentUser,
    currentMahasiswa,
    allUsers,
    loginAsUser,
    logout,
    membersList
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Check pending invitations for current student
  const pendingInvitations = currentUser?.role === 'mahasiswa' && currentMahasiswa
    ? membersList.filter(
        (m) =>
          m.statusAcc === 'pending' &&
          (m.mahasiswaId === currentMahasiswa.id || m.npm === currentMahasiswa.npm)
      )
    : [];

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'mahasiswa':
        return { label: 'Mahasiswa', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'dosen':
        return { label: 'Dosen Pembimbing', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'prodi':
        return { label: 'Admin Prodi', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'jurusan':
        return { label: 'Admin Jurusan', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'wadir3':
        return { label: 'Wadir III', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#b8cdbb]/50 bg-[#fbfcf7]/95 backdrop-blur-md transition-all shadow-[0_8px_30px_-22px_rgba(24,35,31,0.45)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              title="Kembali ke Landing Page"
              className="p-2 rounded-xl text-[#557462] hover:text-[#18231f] hover:bg-[#e8eee6] transition-all"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onGoToLanding}>
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#18231f] text-sm font-black text-[#d7e7d6] shadow-[3px_3px_0_#e98263]">E</span>
            </div>
            <div>
              <span className="font-black text-base tracking-tight text-slate-900">
                E-ofiice
              </span>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Campus Work & Competition Hub
              </p>
            </div>
          </div>
        </div>

        {/* Center Nav tabs */}
        <div className="hidden md:flex items-center gap-1 bg-[#e8eee6]/80 p-1.5 rounded-2xl border border-[#b8cdbb]/60">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#18231f] text-[#f4f6ef] shadow-sm font-bold'
                : 'text-[#526158] hover:text-[#18231f]'
            }`}
          >
            Dashboard
          </button>
          {currentUser?.role === 'mahasiswa' && (
            <button
              onClick={() => setActiveTab('cv')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'cv'
                  ? 'bg-[#18231f] text-[#f4f6ef] shadow-sm font-bold'
                  : 'text-[#526158] hover:text-[#18231f]'
              }`}
            >
              CV & Portofolio Mahasiswa
            </button>
          )}
          <button
            onClick={() => setActiveTab('flow-diagram')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'flow-diagram'
                ? 'bg-[#18231f] text-[#f4f6ef] shadow-sm font-bold'
                : 'text-[#526158] hover:text-[#18231f]'
            }`}
          >
            Skema Alur Lomba
          </button>
        </div>

        {/* Right Actions: Role Switcher & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setProfileDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8eee6] hover:bg-[#dce9dc] border border-[#b8cdbb] text-xs text-[#18231f] transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#e98263]" />
              <span className="hidden sm:inline font-medium">Role:</span>
                <span className="font-bold text-[#557462]">
                {currentUser ? getRoleBadge(currentUser.role).label : 'Pilih Role'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 p-2 sacset-card-shadow z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Ganti Perspektif Demo
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Uji coba instan alur data antar tabel relasional
                  </p>
                </div>
                <div className="space-y-1">
                  {allUsers.map((user) => {
                    const badge = getRoleBadge(user.role);
                    const isSelected = currentUser?.id === user.id;
                    return (
                      <button
                        key={user.id}
                        onClick={() => {
                          loginAsUser(user.id);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl flex items-start gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 border border-blue-200'
                            : 'hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover mt-0.5 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded border font-medium ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Pending notification bell if user has pending invitations */}
          {pendingInvitations.length > 0 && (
            <button
              onClick={() => setActiveTab('dashboard')}
              title={`Ada ${pendingInvitations.length} undangan anggota tim menanti persetujuanmu!`}
              className="relative p-2 rounded-full bg-amber-50 border border-amber-300 text-amber-700 hover:bg-amber-100 transition-all"
            >
              <Bell className="w-4 h-4 animate-bounce" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {pendingInvitations.length}
              </span>
            </button>
          )}

          {/* User Profile Avatar / Login modal button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-full bg-[#e8eee6] border border-[#b8cdbb] hover:border-[#e98263] transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="text-xs font-bold text-slate-800 pr-2 pl-1 hidden xl:inline max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-1 hidden xl:inline" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 p-3 sacset-card-shadow z-50">
                  <div className="pb-3 border-b border-slate-100 mb-2">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className="mt-1.5 inline-block text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono border border-blue-200">
                      E-ofiice verified
                    </span>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onOpenAuthModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>Manajemen Akun</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-5 py-1.5 rounded-full border border-blue-500 text-xs font-bold text-slate-900 hover:bg-blue-50 transition-all shadow-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

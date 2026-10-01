'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import LombaFlowModal from './components/mahasiswa/LombaFlowModal';
import MahasiswaDashboard from './components/mahasiswa/MahasiswaDashboard';
import CvPortfolioView from './components/mahasiswa/CvPortfolioView';
import DosenDashboard from './components/dosen/DosenDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import FlowDiagramView from './components/FlowDiagramView';
import {
  Sparkles,
  X,
  SlidersHorizontal,
  Home as HomeIcon
} from 'lucide-react';
import { UserRole } from './lib/types';

function MainApp() {
  const {
    currentUser,
    notificationMessage,
    clearNotification,
    loginAsUser,
    loginAsRole,
    allUsers
  } = useApp();

  // The landing page is the public entry point for E-ofiice.
  const [isViewingLanding, setIsViewingLanding] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cv' | 'flow-diagram'>('dashboard');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalDefaultMode, setAuthModalDefaultMode] = useState<'demo' | 'login' | 'register'>('login');
  const [flowModalOpen, setFlowModalOpen] = useState(false);

  const handleOpenLogin = () => {
    setAuthModalDefaultMode('login');
    setAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthModalDefaultMode('register');
    setAuthModalOpen(true);
  };

  const handleDemoRoleSelect = (roleKey: string) => {
    if (roleKey === 'mahasiswa') {
      loginAsUser('user_mhs_1'); // Aria Pratama (Ketua)
    } else if (roleKey === 'anggota') {
      loginAsUser('user_mhs_2'); // Citra Lestari (Anggota - has pending invitation!)
    } else if (roleKey === 'dosen') {
      loginAsUser('user_dsn_1'); // Dr. Hendra
    } else if (roleKey === 'wadir3') {
      loginAsUser('user_wadir3_1'); // Dr. Budi
    }
    setIsViewingLanding(false);
  };

  // If currently on Landing page view
  if (isViewingLanding) {
    return (
      <>
        <LandingPage
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
          onDemoRoleSelect={handleDemoRoleSelect}
        />
        <AuthModal
          isOpen={authModalOpen}
          defaultMode={authModalDefaultMode}
          onClose={() => {
            setAuthModalOpen(false);
            if (currentUser) {
              setIsViewingLanding(false);
            }
          }}
        />
      </>
    );
  }

  // Logged-in App View
  return (
    <div className="eoffice-workspace min-h-screen bg-[#f4f6ef] text-[#18231f] rintis-grid-bg relative selection:bg-[#e98263] selection:text-white">
      {/* Toast Notification */}
      {notificationMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md p-4 rounded-2xl bg-[#fbfcf7] border border-[#b8cdbb]/60 rintis-card-shadow animate-in slide-in-from-bottom-5 fade-in flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#dce9dc] border border-[#b8cdbb] flex items-center justify-center text-[#557462]">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <p className="text-xs font-semibold text-slate-800">{notificationMessage}</p>
          </div>
          <button
            onClick={clearNotification}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navbar with role switcher */}
      <Navbar
        onOpenAuthModal={handleOpenLogin}
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as any)}
        onGoToLanding={() => setIsViewingLanding(true)}
      />

      {/* Quick Perspective Switch Bar */}
      <div className="border-b border-[#b8cdbb]/50 bg-[#fbfcf7]/85 backdrop-blur-md px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="flex h-2 w-2 rounded-full bg-[#e98263] animate-pulse" />
            <span className="font-bold text-[11px] text-[#526158] uppercase">GANTI PERSPEKTIF DEMO:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5">
            <button
              onClick={() => setIsViewingLanding(true)}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e8eee6] text-[#557462] hover:bg-[#dce9dc] border border-[#b8cdbb] flex items-center gap-1"
            >
              <HomeIcon className="w-3 h-3 text-[#557462]" />
              <span>Lihat Home E-ofiice</span>
            </button>

            {allUsers.map((user) => {
              const isCurrent = currentUser?.id === user.id;
              let roleName = user.role.toUpperCase();
              if (user.id === 'user_mhs_1') roleName = 'Ketua Tim (Mhs)';
              if (user.id === 'user_mhs_2') roleName = 'Anggota Tim (Mhs)';
              if (user.id === 'user_dsn_1') roleName = 'Dosen Reviewer';
              if (user.id === 'user_prodi_1') roleName = 'Admin Prodi';
              if (user.id === 'user_jurusan_1') roleName = 'Admin Jurusan';
              if (user.id === 'user_wadir3_1') roleName = 'Wadir III (Exec)';

              return (
                <button
                  key={user.id}
                  onClick={() => loginAsUser(user.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    isCurrent
                      ? 'bg-[#18231f] text-[#f4f6ef] font-bold shadow-sm'
                      : 'bg-[#fbfcf7] text-[#526158] hover:text-[#18231f] border border-[#b8cdbb]/60 hover:border-[#557462]'
                  }`}
                >
                  {roleName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Render Tab 1: Flow Diagram */}
        {activeTab === 'flow-diagram' && (
          <FlowDiagramView
            onOpenFlowModal={() => setFlowModalOpen(true)}
            onOpenAuthModal={handleOpenLogin}
            onOpenCvTab={() => setActiveTab('cv')}
          />
        )}

        {/* Render Tab 2: CV & Portofolio (Mahasiswa only) */}
        {activeTab === 'cv' && currentUser?.role === 'mahasiswa' && (
          <CvPortfolioView />
        )}

        {/* Render Tab 3: Dynamic Role Dashboard */}
        {activeTab === 'dashboard' && (
          <>
            {currentUser?.role === 'mahasiswa' && (
              <MahasiswaDashboard
                onOpenFlowModal={() => setFlowModalOpen(true)}
                onOpenCvTab={() => setActiveTab('cv')}
              />
            )}

            {currentUser?.role === 'dosen' && <DosenDashboard />}

            {['prodi', 'jurusan', 'wadir3'].includes(currentUser?.role || '') && (
              <AdminDashboard />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#b8cdbb]/50 bg-[#18231f] py-8 text-center text-xs text-[#d7e7d6] mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#f4f6ef] tracking-[0.15em]">E-ofiice</span>
            <span>•</span>
            <span>Campus Work & Student Competition Hub</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Terhubung tabel: <code>users</code>, <code>mahasiswa</code>, <code>dosen</code>, <code>prodi_users</code>, <code>jurusan_users</code>, <code>wadir3_users</code>, <code>student_skills</code>, <code>student_experiences</code>, <code>lomba_pengajuan</code>, <code>lomba_members</code>, <code>lomba_proposals</code>.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        defaultMode={authModalDefaultMode}
        onClose={() => setAuthModalOpen(false)}
      />
      <LombaFlowModal
        isOpen={flowModalOpen}
        onClose={() => setFlowModalOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

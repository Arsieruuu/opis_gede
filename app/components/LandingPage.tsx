'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  GraduationCap,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onDemoRoleSelect: (role: string) => void;
}

const stages = [
  { number: '01', title: 'Rancang', detail: 'Ide dan proposal tersusun', color: 'bg-[#dce9dc]' },
  { number: '02', title: 'Rakit tim', detail: 'Anggota dan dosen terhubung', color: 'bg-[#f9e8e1]' },
  { number: '03', title: 'Buktikan', detail: 'Karya menjadi jejak portofolio', color: 'bg-[#f8eee0]' }
];

export default function LandingPage({ onOpenLogin, onOpenRegister, onDemoRoleSelect }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'specialization' | 'projects' | 'faq'>('home');

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f6ef] text-[#18231f] selection:bg-[#e98263] selection:text-white">
      <div className="pointer-events-none absolute inset-0 rintis-grid-bg" />
      <div className="pointer-events-none absolute -right-20 top-36 h-72 w-72 rounded-full border border-[#557462]/15" />
      <div className="pointer-events-none absolute -right-8 top-48 h-44 w-44 rounded-full border border-[#e98263]/25" />

      <header className="relative z-20 px-5 pt-5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#557462]/20 pb-4">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#18231f] text-base font-black text-[#d7e7d6] shadow-[5px_5px_0_#e98263]">E</span>
            <span>
              <span className="block text-sm font-black tracking-[0.2em]">E-ofiice</span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[#557462] sm:block">Campus work, made visible</span>
            </span>
          </button>

          <div className="hidden items-center gap-7 text-xs font-bold text-[#526158] md:flex">
            {(['home', 'specialization', 'projects', 'faq'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`capitalize transition-colors hover:text-[#e98263] ${activeTab === tab ? 'text-[#18231f]' : ''}`}>
                {tab === 'specialization' ? 'Roles' : tab}
              </button>
            ))}
          </div>

          <button onClick={onOpenLogin} className="flex items-center gap-2 rounded-xl bg-[#18231f] px-4 py-2.5 text-xs font-bold text-[#f4f6ef] transition hover:bg-[#557462]">
            Masuk <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:px-12 lg:pt-20">
        <section className="grid items-center gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#557462]"><span className="h-px w-10 bg-[#e98263]" />E-ofiice / student operating space</div>
            <h1 className="max-w-xl text-5xl font-black leading-[0.94] tracking-[-0.05em] sm:text-7xl">Kerja kampus,<span className="mt-2 block text-[#557462]">punya arah.</span></h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#526158]">Satu ruang untuk mengubah ide menjadi proyek, proyek menjadi prestasi, dan prestasi menjadi portofolio yang bisa dibawa ke mana-mana.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={onOpenLogin} className="group flex items-center gap-3 rounded-xl bg-[#e98263] px-5 py-3.5 text-xs font-black text-[#18231f] transition hover:-translate-y-0.5 hover:bg-[#f09b7f]">Mulai workspace <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
              <button onClick={onOpenRegister} className="flex items-center gap-2 rounded-xl border border-[#557462]/35 bg-[#fbfcf7] px-5 py-3.5 text-xs font-black text-[#18231f] transition hover:border-[#557462]">Buat akun <ChevronRight className="h-4 w-4 text-[#557462]" /></button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-bold text-[#557462]"><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e98263]" /> Role-based access</span><span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e98263]" /> Portfolio verified</span></div>
          </div>

          <div className="relative lg:pl-5">
            <div className="absolute -left-5 top-8 hidden h-28 w-28 border-l border-t border-[#e98263]/60 lg:block" />
            <div className="rintis-card-shadow relative overflow-hidden rounded-[28px] border border-[#557462]/20 bg-[#18231f] p-5 text-[#f4f6ef] sm:p-7">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#557462]/30 blur-3xl" />
              <div className="relative flex items-center justify-between border-b border-[#d7e7d6]/15 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8cdbb]">Workspace pulse</p><h2 className="mt-1 text-lg font-black">Project Atlas / 2026</h2></div><span className="flex items-center gap-1.5 rounded-full bg-[#d7e7d6]/10 px-3 py-1.5 text-[10px] font-bold text-[#d7e7d6]"><CircleDot className="h-3 w-3 text-[#e98263]" /> Live</span></div>
              <div className="relative mt-7 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-[#d7e7d6] p-4 text-[#18231f]"><Layers3 className="h-5 w-5 text-[#557462]" /><p className="mt-8 text-3xl font-black">12</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#557462]">Active projects</p></div><div className="rounded-2xl border border-[#d7e7d6]/20 p-4"><Users className="h-5 w-5 text-[#e98263]" /><p className="mt-8 text-3xl font-black">48</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#b8cdbb]">People connected</p></div></div>
              <div className="relative mt-3 rounded-2xl border border-[#d7e7d6]/15 p-4"><div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#b8cdbb]"><span>Approval pathway</span><span className="text-[#e98263]">72%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d7e7d6]/15"><div className="h-full w-[72%] rounded-full bg-[#e98263]" /></div><div className="mt-4 flex items-center justify-between text-[10px] text-[#d7e7d6]/70"><span>Proposal</span><span>Team</span><span>Mentor</span><span>Funding</span></div></div>
              <div className="relative mt-5 flex items-center gap-3 border-t border-[#d7e7d6]/15 pt-5"><div className="flex -space-x-2"><span className="h-7 w-7 rounded-full border-2 border-[#18231f] bg-[#e98263]" /><span className="h-7 w-7 rounded-full border-2 border-[#18231f] bg-[#b8cdbb]" /><span className="h-7 w-7 rounded-full border-2 border-[#18231f] bg-[#f8eee0]" /></div><p className="text-[11px] leading-4 text-[#d7e7d6]/75">A workspace that keeps every contribution in view.</p></div>
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-8 border-t border-[#557462]/20 pt-8 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[10px] font-black uppercase tracking-[0.23em] text-[#e98263]">The E-ofiice loop</p><h2 className="mt-3 max-w-sm text-3xl font-black leading-tight tracking-[-0.04em]">Dari niat baik menjadi bukti yang rapi.</h2></div><div className="grid gap-3 sm:grid-cols-3">{stages.map((stage) => <div key={stage.number} className={`rounded-2xl border border-[#557462]/15 p-5 ${stage.color}`}><span className="text-[10px] font-black tracking-[0.18em] text-[#557462]">{stage.number}</span><h3 className="mt-10 text-lg font-black">{stage.title}</h3><p className="mt-1 text-xs leading-5 text-[#526158]">{stage.detail}</p></div>)}</div></section>

        <section className="mt-16 rounded-[26px] border border-[#557462]/20 bg-[#fbfcf7] p-5 sm:p-7"><div className="flex flex-col justify-between gap-4 border-b border-[#557462]/15 pb-5 sm:flex-row sm:items-center"><div><p className="text-[10px] font-black uppercase tracking-[0.23em] text-[#557462]">Try a perspective</p><h2 className="mt-1 text-xl font-black">Masuk sesuai peranmu</h2></div><p className="max-w-xs text-xs leading-5 text-[#526158]">Jelajahi alur E-ofiice dari sisi mahasiswa, mentor, atau pengelola kampus.</p></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button onClick={() => onDemoRoleSelect('mahasiswa')} className="group flex items-center gap-3 rounded-2xl bg-[#dce9dc] p-4 text-left transition hover:-translate-y-1"><GraduationCap className="h-5 w-5 text-[#557462]" /><span><strong className="block text-xs">Mahasiswa</strong><small className="text-[10px] text-[#526158]">Bangun portofolio</small></span><ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:opacity-100" /></button>
          <button onClick={() => onDemoRoleSelect('anggota')} className="group flex items-center gap-3 rounded-2xl bg-[#f9e8e1] p-4 text-left transition hover:-translate-y-1"><Users className="h-5 w-5 text-[#a14f3a]" /><span><strong className="block text-xs">Anggota tim</strong><small className="text-[10px] text-[#526158]">Terima undangan</small></span><ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:opacity-100" /></button>
          <button onClick={() => onDemoRoleSelect('dosen')} className="group flex items-center gap-3 rounded-2xl bg-[#e8eee6] p-4 text-left transition hover:-translate-y-1"><Sparkles className="h-5 w-5 text-[#557462]" /><span><strong className="block text-xs">Dosen mentor</strong><small className="text-[10px] text-[#526158]">Review dan arahkan</small></span><ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:opacity-100" /></button>
          <button onClick={() => onDemoRoleSelect('wadir3')} className="group flex items-center gap-3 rounded-2xl bg-[#f8eee0] p-4 text-left transition hover:-translate-y-1"><ShieldCheck className="h-5 w-5 text-[#9b6238]" /><span><strong className="block text-xs">Eksekutif</strong><small className="text-[10px] text-[#526158]">Lihat dampak</small></span><ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:opacity-100" /></button>
        </div></section>
      </main>

      <footer className="relative z-10 border-t border-[#b8cdbb]/50 bg-[#18231f] px-5 py-8 text-[#d7e7d6] sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs sm:flex-row sm:items-center"><span className="font-black tracking-[0.2em]">E-ofiice</span><span className="text-[#b8cdbb]">Campus work, made visible. © 2026</span></div></footer>
    </div>
  );
}

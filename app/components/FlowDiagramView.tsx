'use client';

import React from 'react';
import {
  Database,
  UserCheck,
  Trophy,
  Users,
  FileText,
  FileCode,
  ArrowRight,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Layers
} from 'lucide-react';

interface FlowDiagramViewProps {
  onOpenFlowModal: () => void;
  onOpenAuthModal: () => void;
  onOpenCvTab: () => void;
}

export default function FlowDiagramView({
  onOpenFlowModal,
  onOpenAuthModal,
  onOpenCvTab
}: FlowDiagramViewProps) {
  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Title banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 sacset-card-shadow">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
          SKEMA ALUR SISTEM E-OFIICE
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
          Visualisasi Alur & Pemetaan Relasi Antar Tabel
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Berikut alur interaktif sesuai instruksi Anda: Alur Pengajuan Lomba, Alur CV/Portofolio Mahasiswa (Kreatif & ATS), serta Alur Registrasi Multi-Role (Tabel <code>users</code> dan profil relasional).
        </p>
      </div>

      {/* SECTION 1: ALUR PENGAJUAN LOMBA (SESUAI DIAGRAM USER) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 sacset-card-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                1. Alur Pengajuan Lomba (Diagram Flow)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Ketua Tim ➔ Anggota ACC/Reject ➔ Unggah Proposal ➔ Dosen Pembimbing Review
              </p>
            </div>
          </div>
          <button
            onClick={onOpenFlowModal}
            className="px-4 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
          >
            Uji Coba Alur Ini
          </button>
        </div>

        {/* Diagram in clean aesthetic */}
        <div className="p-6 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto shadow-inner">
          <div className="min-w-[620px] space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <span className="p-1 rounded bg-cyan-950 border border-cyan-500/50">[Ketua Tim]</span>
              <span>Membuat Pengajuan Lomba (lomba_pengajuan)</span>
            </div>

            <div className="pl-6 border-l-2 border-slate-700 space-y-3 py-1 ml-4">
              <div className="flex items-center gap-2 text-amber-300">
                <span className="text-slate-500">├──</span>
                <span>(Jika Tim) Tambah Anggota (lomba_members)</span>
                <span className="text-slate-400">➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500/50 text-amber-200 font-bold">
                  Anggota ACC/Reject
                </span>
              </div>

              <div className="flex items-center gap-2 text-purple-300">
                <span className="text-slate-500">└──</span>
                <span>(Opsional) Unggah Proposal (lomba_proposals)</span>
              </div>
            </div>

            <div className="pl-4 ml-4 flex flex-col items-start gap-1 pt-1">
              <ArrowDown className="w-5 h-5 text-emerald-400 ml-1 animate-bounce" />
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold">
                ✓ Dosen Pembimbing Review (Approve / Revisi / Tolak)
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Tabel: lomba_pengajuan</span>
            <p className="text-slate-500 text-[11px]">
              Menyimpan data ketua, judul, tingkat lomba, kategori, deadline pendaftaran, biaya, dan target juara.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-amber-700 block mb-1">Tabel: lomba_members</span>
            <p className="text-slate-500 text-[11px]">
              Menyimpan daftar anggota tim dengan status konfirmasi <code>pending</code>, <code>accepted</code>, atau <code>rejected</code>.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-blue-700 block mb-1">Tabel: lomba_proposals</span>
            <p className="text-slate-500 text-[11px]">
              Menyimpan dokumen PDF proposal kompetisi, ringkasan inovasi, dan versi revisi dari Dospem.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: ALUR CV & PORTOFOLIO MAHASISWA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 sacset-card-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                2. Alur CV / Portofolio Mahasiswa (Kreatif & ATS)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                student_skills + student_experiences + tabel mahasiswa
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCvTab}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
          >
            Buka CV Generator
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-blue-700 block">student_skills</span>
            <p className="text-xs text-slate-600">
              Input keahlian beserta persentase penguasaan (0 - 100%) dan kategori untuk visualisasi meter penguasaan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-indigo-700 block">student_experiences</span>
            <p className="text-xs text-slate-600">
              Mencatat rekam jejak prestasi lomba, keaktifan organisasi, cipta karya, dan magang industri terverifikasi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-emerald-700 block">Dual Output</span>
            <p className="text-xs text-slate-600">
              Digabung dengan profil akademik di tabel <code>mahasiswa</code> untuk format Kreatif (Web) maupun ATS (Resume Cetak).
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: ALUR REGISTRASI & AUTENTIKASI */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 sacset-card-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                3. Alur Registrasi & Autentikasi Pengguna
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Pemisahan tabel <code>users</code> dan profil relasional spesifik
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAuthModal}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            Manajemen Akun
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">1. Akun Utama: Tabel `users`</span>
            <p className="text-slate-600 text-[11px] font-sans">
              Setiap user memiliki akun di tabel <code>users</code> (email, password, role: mahasiswa, dosen, prodi, jurusan, wadir3).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-blue-700 block">tabel mahasiswa</span>
              <p className="text-slate-500 font-sans mt-0.5">NPM, Prodi, Jurusan, IPK, Semester, tracking sacset.</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-emerald-700 block">tabel dosen</span>
              <p className="text-slate-500 font-sans mt-0.5">NIP, NIDN, ketersediaan verifikasi bimbingan lomba.</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-purple-700 block">prodi / jurusan / wadir3_users</span>
              <p className="text-slate-500 font-sans mt-0.5">Otoritas legalitas delegasi kampus & persetujuan anggaran.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

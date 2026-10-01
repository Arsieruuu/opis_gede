'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Plus,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  UserCheck,
  Check,
  X
} from 'lucide-react';
import { LombaPengajuan, LombaStatus } from '../../lib/types';

interface MahasiswaDashboardProps {
  onOpenFlowModal: () => void;
  onOpenCvTab: () => void;
}

export default function MahasiswaDashboard({
  onOpenFlowModal,
  onOpenCvTab
}: MahasiswaDashboardProps) {
  const {
    currentUser,
    currentMahasiswa,
    pengajuanList,
    membersList,
    proposalsList,
    respondMemberInvitation
  } = useApp();

  const currentNpm = currentMahasiswa?.npm || '2110511042';

  const myMemberRecords = membersList.filter(
    (m) => m.npm === currentNpm || m.mahasiswaId === currentMahasiswa?.id
  );
  const myPengajuanIds = new Set(myMemberRecords.map((m) => m.pengajuanId));
  const relevantPengajuans = pengajuanList.filter((p) => myPengajuanIds.has(p.id));

  // Invitations where status is 'pending' for this student (Anggota ACC/Reject)
  const pendingInvitations = myMemberRecords.filter(
    (m) => m.roleTim === 'Anggota' && m.statusAcc === 'pending'
  );

  const getStatusBadge = (status: LombaStatus) => {
    switch (status) {
      case 'draft':
        return { label: 'Draft', color: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'menunggu_anggota':
        return { label: 'Menunggu ACC Anggota Tim', color: 'bg-amber-50 text-amber-700 border-amber-300' };
      case 'menunggu_review_dosen':
        return { label: 'Menunggu Review Dospem', color: 'bg-blue-50 text-blue-700 border-blue-300' };
      case 'revisi_dosen':
        return { label: 'Perlu Revisi Dosen', color: 'bg-rose-50 text-rose-700 border-rose-300' };
      case 'disetujui_dosen':
        return { label: 'Disetujui Dospem (Lanjut Prodi)', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' };
      case 'verifikasi_prodi':
        return { label: 'Diverifikasi Prodi (Review Wadir 3)', color: 'bg-purple-50 text-purple-700 border-purple-300' };
      case 'disetujui_wadir3':
        return { label: 'Didanai & SK Wadir III Terbit!', color: 'bg-teal-50 text-teal-700 border-teal-300' };
      case 'ditolak':
        return { label: 'Pengajuan Ditolak', color: 'bg-red-50 text-red-700 border-red-300' };
    }
  };

  return (
    <div className="space-y-8">
      {/* PENDING INVITATIONS BANNER (Anggota ACC/Reject) */}
      {pendingInvitations.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 sacset-card-shadow animate-in fade-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                <Users className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  ⚡ Alur Diagram: Anggota ACC/Reject
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Undangan Bergabung ke Tim Lomba
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Sebagai anggota tim, Anda perlu menyetujui (ACC) atau menolak (Reject) undangan agar berkas dapat diteruskan ke Dosen Pembimbing.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {pendingInvitations.map((inv) => {
              const pengajuan = pengajuanList.find((p) => p.id === inv.pengajuanId);
              return (
                <div
                  key={inv.id}
                  className="p-3.5 rounded-xl bg-white border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {pengajuan?.judulLomba || 'Pengajuan Lomba Inovasi'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Ketua Tim: <span className="font-bold text-blue-600">{pengajuan?.ketuaNama}</span> ({pengajuan?.ketuaNpm}) • Dospem: {pengajuan?.dosenPembimbingNama}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => respondMemberInvitation(inv.id, 'accepted')}
                      className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Setujui (ACC)</span>
                    </button>
                    <button
                      onClick={() => respondMemberInvitation(inv.id, 'rejected')}
                      className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold border border-slate-200 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Tolak (Reject)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hero Header Card */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-[28px] bg-[#18231f] border border-[#557462]/30 rintis-card-shadow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-[#f4f6ef]">
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-[#b8cdbb]/15" />
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7e7d6] bg-[#557462]/35 px-2.5 py-0.5 rounded-full border border-[#b8cdbb]/30 font-mono">
              E-OFIICE / MAHASISWA & KETUA TIM
            </span>
            <span className="text-xs text-[#b8cdbb]">• NPM: {currentMahasiswa?.npm || '2110511042'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#f4f6ef] tracking-tight">
            Halo, {currentUser?.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#b8cdbb] mt-1 max-w-xl">
            Kelola pengajuan kompetisi kampus, undang anggota tim dengan verifikasi ACC, dan kelola portofolio CV fleksibel (Kreatif & ATS).
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={onOpenFlowModal}
              className="px-5 py-2.5 rounded-xl bg-[#e98263] text-[#18231f] text-xs font-bold hover:bg-[#f09b7f] transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Pengajuan Lomba Baru</span>
            </button>
            <button
              onClick={onOpenCvTab}
              className="px-5 py-2.5 rounded-xl bg-[#d7e7d6] hover:bg-[#edf5e9] text-[#18231f] text-xs font-bold border border-[#b8cdbb] transition-all flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4 text-[#557462]" />
              <span>Buka Portfolio Builder</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          <div className="p-4 rounded-2xl bg-[#f4f6ef]/10 border border-[#b8cdbb]/20">
            <span className="text-[10px] uppercase font-bold text-[#b8cdbb] block">Lomba Terdaftar</span>
            <span className="text-2xl font-black text-[#f4f6ef] mt-0.5 block">{relevantPengajuans.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#f4f6ef]/10 border border-[#b8cdbb]/20">
            <span className="text-[10px] uppercase font-bold text-[#b8cdbb] block">Status Akun</span>
            <span className="text-xs font-bold text-[#b8cdbb] flex items-center gap-1 mt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Terverifikasi</span>
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#e98263] border border-[#f09b7f]">
            <span className="text-[10px] uppercase font-bold text-[#18231f] block">IPK Kumulatif</span>
            <span className="text-xl font-black text-[#18231f] mt-0.5 block">{currentMahasiswa?.ipk || 3.88} / 4.00</span>
          </div>
        </div>
      </div>

      {/* Competitions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#e98263]" />
            <h2 className="text-base font-extrabold text-[#18231f]">
              Daftar Pengajuan Lomba Tim
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {relevantPengajuans.length} Kompetisi Aktif
          </span>
        </div>

        {relevantPengajuans.length === 0 ? (
          <div className="p-10 rounded-3xl bg-white border border-dashed border-slate-300 text-center sacset-card-shadow">
            <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">Belum Ada Pengajuan Lomba</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Mulai buat pengajuan lomba baru untuk mengundang anggota tim dan mendapatkan persetujuan Dosen Pembimbing.
            </p>
            <button
              onClick={onOpenFlowModal}
              className="mt-4 px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all shadow-sm"
            >
              Mulai Alur Pengajuan Lomba
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {relevantPengajuans.map((pengajuan) => {
              const badge = getStatusBadge(pengajuan.status);
              const members = membersList.filter((m) => m.pengajuanId === pengajuan.id);
              const proposal = proposalsList.find((p) => p.pengajuanId === pengajuan.id);

              return (
                <div
                  key={pengajuan.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 sacset-card-shadow hover:border-blue-400 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                          {pengajuan.tingkat}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {pengajuan.kategori}
                        </span>
                        <span className="text-[11px] text-slate-400">• Diajukan: {pengajuan.createdAt}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {pengajuan.judulLomba}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Penyelenggara: <strong className="text-slate-700">{pengajuan.penyelenggara}</strong> • Target: <span className="font-semibold text-blue-600">{pengajuan.targetJuara}</span>
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Status Berkas:</span>
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mt-0.5 ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* Flow breakdown */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* 1. Anggota */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span>Anggota Tim ({members.length})</span>
                        </span>
                      </div>
                      <div className="space-y-1">
                        {members.map((m) => (
                          <div key={m.id} className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-700 font-medium truncate max-w-[140px]">
                              {m.nama} ({m.roleTim})
                            </span>
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                                m.statusAcc === 'accepted'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : m.statusAcc === 'pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-300 animate-pulse'
                                  : 'bg-rose-50 text-rose-700 border-rose-300'
                              }`}
                            >
                              {m.statusAcc === 'accepted' ? 'ACC' : m.statusAcc === 'pending' ? 'Pending' : 'Reject'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Proposal */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Berkas Proposal (lomba_proposals)</span>
                      </span>
                      {proposal ? (
                        <div>
                          <p className="text-[11px] font-bold text-slate-900 truncate">{proposal.fileName}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">Ukuran: {proposal.fileSize}</p>
                          <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 italic">
                            "{proposal.summary}"
                          </p>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">Tidak ada berkas proposal</p>
                      )}
                    </div>

                    {/* 3. Dospem */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Dosen Reviewer</span>
                      </span>
                      <div>
                        <p className="text-[11px] font-bold text-slate-900 truncate">{pengajuan.dosenPembimbingNama}</p>
                        {pengajuan.catatanDosen ? (
                          <div className="mt-1 p-2 rounded-xl bg-blue-50 border border-blue-200 text-[10px] text-blue-800">
                            <strong>Catatan Dospem:</strong> {pengajuan.catatanDosen}
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-400 mt-1">Menunggu telaah Dospem.</p>
                        )}
                        {pengajuan.catatanWadir3 && (
                          <div className="mt-1 p-2 rounded-xl bg-teal-50 border border-teal-200 text-[10px] text-teal-800">
                            <strong>SK Wadir III:</strong> {pengajuan.catatanWadir3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Users,
  Trophy,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  MessageSquare
} from 'lucide-react';
import { LombaPengajuan } from '../../lib/types';

export default function DosenDashboard() {
  const {
    currentUser,
    currentDosen,
    pengajuanList,
    membersList,
    proposalsList,
    reviewByDosen,
    toggleDosenVerifikasi
  } = useApp();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedPengajuan, setSelectedPengajuan] = useState<LombaPengajuan | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'revisi' | 'reject'>('approve');
  const [feedbackNote, setFeedbackNote] = useState('');

  const assignedPengajuans = pengajuanList.filter(
    (p) =>
      p.dosenPembimbingId === 'dsn_1' ||
      p.dosenPembimbingNama.includes('Hendra') ||
      p.dosenPembimbingId === currentDosen?.id
  );

  const pendingReviewCount = assignedPengajuans.filter(
    (p) => p.status === 'menunggu_review_dosen' || p.status === 'menunggu_anggota'
  ).length;

  const openReviewAction = (p: LombaPengajuan, type: 'approve' | 'revisi' | 'reject') => {
    setSelectedPengajuan(p);
    setActionType(type);
    if (type === 'approve') {
      setFeedbackNote('Ide riset dan inovasi sangat baik. Berkas proposal memenuhi kualifikasi standar Puspresnas. Direkomendasikan untuk lanjut verifikasi Program Studi.');
    } else if (type === 'revisi') {
      setFeedbackNote('Harap lengkapi analisis perbandingan teknologi dan perbaiki diagram arsitektur pada bab 3 proposal sebelum dilanjutkan.');
    } else {
      setFeedbackNote('Tema belum sesuai dengan fokus kompetisi atau kuota bimbingan telah melampaui batas.');
    }
    setReviewModalOpen(true);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPengajuan) return;
    reviewByDosen(selectedPengajuan.id, actionType, feedbackNote);
    setReviewModalOpen(false);
    setSelectedPengajuan(null);
  };

  return (
    <div className="space-y-6">
      {/* Hero Dosen Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 sacset-card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser?.name || 'Dosen'}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono">
                DOSEN PEMBIMBING REVIEWER
              </span>
              <span className="text-xs text-slate-400 font-mono">
                NIP: {currentDosen?.nip || '198504122010121001'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {currentUser?.name || 'Dr. Ir. Hendra Wijaya, M.Kom'}
            </h1>
            <p className="text-xs text-blue-600 font-medium mt-0.5">
              {currentDosen?.prodi || 'S1 Teknik Informatika'} • NIDN: {currentDosen?.nidn || '0012048501'}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(currentDosen?.bidangKeahlian || ['AI', 'Software Dev']).map((bidang, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-full border border-slate-200"
                >
                  #{bidang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Status Ketersediaan Verifikasi */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right w-full md:w-auto">
          <p className="text-[11px] text-slate-500 font-medium">Status Ketersediaan Verifikasi:</p>
          <div className="flex items-center justify-end gap-2 mt-1.5">
            <span
              className={`text-xs font-bold ${
                currentDosen?.ketersediaanVerifikasi ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {currentDosen?.ketersediaanVerifikasi
                ? 'TERSEDIA (Menerima Bimbingan)'
                : 'SEDANG PENUH'}
            </span>
            <button
              onClick={toggleDosenVerifikasi}
              className="text-emerald-600 hover:text-emerald-700 transition-all p-1"
            >
              {currentDosen?.ketersediaanVerifikasi ? (
                <ToggleRight className="w-8 h-8 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Antrean menunggu telaah: <strong className="text-slate-800">{pendingReviewCount} berkas</strong>
          </p>
        </div>
      </div>

      {/* Review Queue Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-extrabold text-slate-900">
            Antrean Telaah & Review Pengajuan Lomba
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {assignedPengajuans.length} Berkas Mahasiswa
        </span>
      </div>

      {/* List of submissions */}
      <div className="space-y-4">
        {assignedPengajuans.map((pengajuan) => {
          const members = membersList.filter((m) => m.pengajuanId === pengajuan.id);
          const proposal = proposalsList.find((p) => p.pengajuanId === pengajuan.id);
          const isPendingDosen = pengajuan.status === 'menunggu_review_dosen';
          const isPendingMembers = pengajuan.status === 'menunggu_anggota';
          const isApproved =
            pengajuan.status === 'disetujui_dosen' ||
            pengajuan.status === 'disetujui_wadir3' ||
            pengajuan.status === 'verifikasi_prodi';

          return (
            <div
              key={pengajuan.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 sacset-card-shadow hover:border-emerald-400 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                      {pengajuan.tingkat}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Ketua: <strong className="text-slate-800">{pengajuan.ketuaNama}</strong> ({pengajuan.ketuaNpm})
                    </span>
                    <span className="text-[11px] text-slate-400">• Deadline: {pengajuan.tanggalDeadline}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                    {pengajuan.judulLomba}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Penyelenggara: {pengajuan.penyelenggara} • Target: <span className="font-semibold text-blue-600">{pengajuan.targetJuara}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isPendingDosen && (
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-300 text-xs font-bold animate-pulse">
                      ⚡ Siap Ditelaah Dospem
                    </span>
                  )}
                  {isPendingMembers && (
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-300 text-xs font-bold">
                      ⏳ Menunggu ACC Anggota
                    </span>
                  )}
                  {isApproved && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold">
                      ✓ Disetujui Dospem
                    </span>
                  )}
                </div>
              </div>

              {/* Members and Proposal section */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Team members */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Susunan Tim ({members.length} Mahasiswa)</span>
                  </span>
                  <div className="space-y-1">
                    {members.map((m) => (
                      <div key={m.id} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-700">
                          {m.nama} — <strong className="text-blue-600">{m.roleTim}</strong>
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            m.statusAcc === 'accepted'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                          }`}
                        >
                          {m.statusAcc === 'accepted' ? 'Telah ACC' : 'Menunggu ACC'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proposal file */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dokumen Proposal (lomba_proposals)</span>
                  </span>
                  {proposal ? (
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-slate-900 truncate">{proposal.fileName}</p>
                        <span className="text-[10px] text-slate-500 font-mono">{proposal.fileSize}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 italic mt-1 line-clamp-2">
                        "{proposal.summary}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">Tidak ada proposal terlampir</p>
                  )}
                </div>
              </div>

              {pengajuan.catatanDosen && (
                <div className="mt-3 p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
                  <span className="font-bold text-blue-900">Catatan Dosen:</span>
                  <p className="text-blue-800 mt-0.5">{pengajuan.catatanDosen}</p>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={() => openReviewAction(pengajuan, 'approve')}
                  className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Setujui (Approve)</span>
                </button>
                <button
                  onClick={() => openReviewAction(pengajuan, 'revisi')}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Minta Revisi</span>
                </button>
                <button
                  onClick={() => openReviewAction(pengajuan, 'reject')}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Tolak Pengajuan</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {reviewModalOpen && selectedPengajuan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sacset-card-shadow">
            <h3 className="text-base font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <span>
                {actionType === 'approve'
                  ? 'Setujui Pengajuan Lomba'
                  : actionType === 'revisi'
                  ? 'Kirim Catatan Revisi'
                  : 'Tolak Pengajuan Lomba'}
              </span>
            </h3>

            <p className="text-xs text-slate-500 mb-4">
              Kompetisi: <strong>{selectedPengajuan.judulLomba}</strong> (Ketua: {selectedPengajuan.ketuaNama})
            </p>

            <form onSubmit={submitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Resmi Dosen Pembimbing:
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2.5 rounded-full text-white text-xs font-bold shadow transition-all ${
                    actionType === 'approve'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : actionType === 'revisi'
                      ? 'bg-amber-600 hover:bg-amber-500'
                      : 'bg-rose-600 hover:bg-rose-500'
                  }`}
                >
                  Konfirmasi Keputusan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

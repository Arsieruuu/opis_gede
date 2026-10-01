'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
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

function CircleStatus({ done }: { done: boolean }) {
  return <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${done ? 'bg-[#557462] text-white' : 'border border-[#e7c891] text-[#9b6238]'}`}>{done ? '✓' : '•'}</span>;
}

function StatusChip({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-[#b8cdbb]/50 bg-[#f4f6ef] px-3 py-2"><p className="text-[9px] font-bold uppercase tracking-wider text-[#8aa991]">{label}</p><p className="mt-0.5 text-[11px] font-bold text-[#18231f]">{value}</p></div>;
}

function ActionButton({ onClick, label, secondary = false }: { onClick: () => void; label: string; secondary?: boolean }) {
  return <button onClick={onClick} className={`rounded-xl px-3.5 py-2 text-[11px] font-bold transition hover:-translate-y-0.5 ${secondary ? 'border border-[#e98263]/50 bg-[#f9e8e1] text-[#a14f3a]' : 'bg-[#e98263] text-[#18231f] hover:bg-[#f09b7f]'}`}>{label}</button>;
}

export default function FlowDiagramView({
  onOpenFlowModal,
  onOpenAuthModal,
  onOpenCvTab
}: FlowDiagramViewProps) {
  const {
    currentUser,
    suratPengajuanList,
    suratAnggaranList,
    suratFilesList,
    suratApprovalHistories,
    lombaReports,
    reviewSuratByProdi,
    generateSuratDraft,
    reviewSuratByJurusan,
    approveSuratByWadir3,
    uploadSuratFinal,
    submitSuratPengajuan,
    submitLombaReport,
    validateLombaReportByProdi
  } = useApp();
  const surat = suratPengajuanList[0];
  const suratFile = surat ? suratFilesList.find((file) => file.suratPengajuanId === surat.id) : undefined;
  const suratHistories = surat ? suratApprovalHistories.filter((history) => history.suratPengajuanId === surat.id) : [];
  const suratBudget = surat ? suratAnggaranList.filter((item) => item.suratPengajuanId === surat.id) : [];
  const report = lombaReports[0];

  const statusLabel = (status: string) => status === 'approved' ? 'Disetujui' : status === 'rejected' ? 'Ditolak' : 'Dalam review';

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

      {/* SECTION 4: SURAT TUGAS / DISPENSASI */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#fbfcf7] border border-[#b8cdbb]/60 rintis-card-shadow space-y-6">
        <div className="flex flex-col gap-4 border-b border-[#b8cdbb]/40 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#dce9dc] text-[#557462]"><FileText className="h-5 w-5" /></div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#557462]">Surat Workflow / E-ofiice</span>
              <h2 className="mt-1 text-base font-extrabold text-[#18231f]">Alur Surat Tugas & Dispensasi</h2>
              <p className="text-xs text-[#526158]">Mahasiswa → Prodi → Admin Jurusan → Jurusan → Wadir 3 → Mahasiswa</p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-[#e98263]/40 bg-[#f9e8e1] px-3 py-1.5 text-[10px] font-bold text-[#a14f3a]">{surat?.status.replaceAll('_', ' ')}</span>
        </div>

        {surat ? (
          <>
            <div className="grid gap-3 md:grid-cols-5">
              {[
                ['Mahasiswa', 'Pengajuan', surat.status !== 'diajukan'],
                ['Prodi', 'Substansi + anggaran', surat.status !== 'diajukan' && surat.status !== 'review_prodi'],
                ['Admin Jurusan', 'Draft bernomor', Boolean(suratFile?.fileDraftGenerated)],
                ['Jurusan', 'Review terintegrasi', surat.status === 'review_wadir3' || surat.isFinalReady],
                ['Wadir 3', 'Approval + scan final', surat.isFinalReady]
              ].map(([actor, detail, done]) => (
                <div key={`${actor}-${detail}`} className={`rounded-2xl border p-3 ${done ? 'border-[#b8cdbb] bg-[#e8eee6]' : 'border-[#e7c891] bg-[#f8eee0]'}`}>
                  <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-wider text-[#557462]">{actor}</span><CircleStatus done={Boolean(done)} /></div>
                  <p className="mt-5 text-xs font-bold text-[#18231f]">{detail}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-[#b8cdbb]/60 bg-white p-4">
                <div className="flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-wider text-[#557462]">{surat.jenis}</p><h3 className="mt-1 text-sm font-black text-[#18231f]">{surat.tujuanKegiatan}</h3></div><span className="text-[10px] font-bold text-[#526158]">{surat.npm}</span></div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2"><StatusChip label="Substansi" value={statusLabel(surat.substansiStatus)} /><StatusChip label="Anggaran" value={statusLabel(surat.anggaranStatus)} /></div>
                <p className="mt-4 text-[11px] text-[#526158]">Total rincian anggaran: <strong className="text-[#18231f]">Rp {suratBudget.reduce((sum, item) => sum + item.nominal, 0).toLocaleString('id-ID')}</strong></p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentUser?.role === 'prodi' && surat.status === 'review_prodi' && <ActionButton onClick={() => reviewSuratByProdi(surat.id, true, 'Substansi dan anggaran tervalidasi Prodi.')} label="Validasi Prodi" />}
                  {currentUser?.role === 'mahasiswa' && <ActionButton onClick={() => submitSuratPengajuan({ jenis: 'Surat Dispensasi', tujuanKegiatan: 'Delegasi Kompetisi E-ofiice 2026', penyelenggara: 'Panitia Kompetisi Nasional', tanggalMulai: '2026-11-12', tanggalSelesai: '2026-11-15' }, [{ item: 'Transportasi', nominal: 750000, keterangan: 'Perjalanan delegasi' }, { item: 'Akomodasi', nominal: 1250000 }])} label="Ajukan Surat Baru" secondary />}
                  {currentUser?.role === 'jurusan' && !suratFile?.fileDraftGenerated && <ActionButton onClick={() => generateSuratDraft(surat.id, `Draft_${surat.jenis.replaceAll(' ', '_')}_2026.pdf`)} label="Generate Draft Bernomor" />}
                  {currentUser?.role === 'jurusan' && surat.status === 'review_jurusan' && <ActionButton onClick={() => reviewSuratByJurusan(surat.id, 'approved', 'approved', 'Substansi dan anggaran disetujui Jurusan.')} label="Approve Review Jurusan" />}
                  {currentUser?.role === 'wadir3' && surat.status === 'review_wadir3' && <ActionButton onClick={() => approveSuratByWadir3(surat.id, true, 'Approval akhir Wadir 3 diberikan.')} label="Approval Akhir Wadir 3" />}
                  {currentUser?.role === 'wadir3' && surat.status === 'review_wadir3' && <ActionButton onClick={() => uploadSuratFinal(surat.id, 'Surat_Final_Scanned_2026.pdf')} label="Upload Scan Final" secondary />}
                  {currentUser?.role === 'mahasiswa' && surat.isFinalReady && <ActionButton onClick={() => window.alert(`Download simulasi: ${suratFile?.fileFinalScanned}`)} label="Download Surat Final" />}
                </div>
                {suratFile?.fileDraftGenerated && <p className="mt-3 text-[10px] font-mono text-[#557462]">Draft: {suratFile.fileDraftGenerated}</p>}
                {suratFile?.fileFinalScanned && <p className="mt-1 text-[10px] font-mono text-[#a14f3a]">Final scanned: {suratFile.fileFinalScanned}</p>}
              </div>
              <div className="rounded-2xl border border-[#b8cdbb]/60 bg-[#f4f6ef] p-4"><p className="text-[10px] font-black uppercase tracking-wider text-[#557462]">Approval history</p><div className="mt-3 space-y-3">{suratHistories.slice(-4).map((history) => <div key={history.id} className="border-l-2 border-[#e98263] pl-3"><p className="text-[11px] font-bold text-[#18231f]">{history.actorName}</p><p className="text-[10px] text-[#526158]">{history.note}</p><p className="mt-0.5 text-[9px] text-[#8aa991]">{history.createdAt}</p></div>)}</div></div>
            </div>
          </>
        ) : <p className="text-sm text-[#526158]">Belum ada pengajuan surat.</p>}
      </div>

      {/* SECTION 5: REPORTING */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#18231f] text-[#f4f6ef] rintis-card-shadow space-y-5">
        <div className="flex items-center justify-between gap-4"><div><span className="text-[10px] font-bold uppercase tracking-wider text-[#b8cdbb]">Post-competition closeout</span><h2 className="mt-1 text-lg font-black">Pelaporan Hasil Lomba</h2></div><Trophy className="h-6 w-6 text-[#e98263]" /></div>
        <p className="max-w-2xl text-xs leading-5 text-[#b8cdbb]">Sertifikat dan laporan kegiatan divalidasi Prodi sebelum periode berikutnya dibuka untuk mahasiswa.</p>
        {report ? <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#b8cdbb]/20 bg-[#f4f6ef]/10 p-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold">{report.fileLaporan}</p><p className="mt-1 text-[10px] text-[#b8cdbb]">Sertifikat: {report.fileSertifikat} · Status: <strong className="text-[#e98263]">{report.statusPelaporan.replaceAll('_', ' ')}</strong></p></div>{currentUser?.role === 'prodi' && report.statusPelaporan === 'menunggu_validasi' && <ActionButton onClick={() => validateLombaReportByProdi(report.id, true, 'Sertifikat dan laporan valid. Periode berikutnya dibuka.')} label="Validasi Laporan" />}</div> : currentUser?.role === 'mahasiswa' ? <ActionButton onClick={() => submitLombaReport({ pengajuanId: 'lomba_001', fileSertifikat: 'Sertifikat_Kegiatan_2026.pdf', fileLaporan: 'Laporan_Hasil_2026.pdf', ringkasan: 'Laporan kegiatan dan capaian tim.' })} label="Upload Sertifikat + Laporan" /> : <p className="text-xs text-[#b8cdbb]">Belum ada laporan masuk.</p>}
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

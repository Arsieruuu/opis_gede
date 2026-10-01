'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trophy,
  Users,
  FileText,
  UserCheck,
  Plus,
  Trash2,
  Upload,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface LombaFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LombaFlowModal({ isOpen, onClose }: LombaFlowModalProps) {
  const { createPengajuan } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // 1. lomba_pengajuan fields
  const [judulLomba, setJudulLomba] = useState('');
  const [penyelenggara, setPenyelenggara] = useState('');
  const [tingkat, setTingkat] = useState<'Internasional' | 'Nasional' | 'Regional' | 'Provinsi'>('Nasional');
  const [kategori, setKategori] = useState<
    'Karya Tulis Ilmiah' | 'Inovasi Teknologi / Hackathon' | 'UI/UX & Desain' | 'Robotika & IoT' | 'Bisnis Plan'
  >('Inovasi Teknologi / Hackathon');
  const [tanggalDeadline, setTanggalDeadline] = useState('2026-11-30');
  const [biayaPendaftaran, setBiayaPendaftaran] = useState(250000);
  const [targetJuara, setTargetJuara] = useState('Juara 1 & Best Prototype Award');

  // 2. lomba_members fields
  const [isTeam, setIsTeam] = useState(true);
  const [members, setMembers] = useState<Array<{ npm: string; nama: string; prodi: string }>>([
    { npm: '2110511088', nama: 'Citra Lestari', prodi: 'S1 Sistem Informasi' }
  ]);
  const [newMemberNpm, setNewMemberNpm] = useState('');
  const [newMemberNama, setNewMemberNama] = useState('');
  const [newMemberProdi, setNewMemberProdi] = useState('S1 Teknik Informatika');

  // 3. lomba_proposals fields
  const [proposalFile, setProposalFile] = useState<{ fileName: string; fileSize: string; summary: string } | null>({
    fileName: 'Proposal_PBL_Kompetisi_sacset.pdf',
    fileSize: '2.8 MB',
    summary: 'Rancangan inovasi sistem digital berbasis E-ofiice yang terintegrasi.'
  });

  // 4. Dosen Pembimbing Reviewer
  const [selectedDosenId, setSelectedDosenId] = useState('dsn_1');
  const [selectedDosenNama, setSelectedDosenNama] = useState('Dr. Ir. Hendra Wijaya, M.Kom');

  if (!isOpen) return null;

  const handleAddMember = () => {
    if (!newMemberNpm || !newMemberNama) {
      alert('Masukkan NPM dan Nama anggota');
      return;
    }
    setMembers([...members, { npm: newMemberNpm, nama: newMemberNama, prodi: newMemberProdi }]);
    setNewMemberNpm('');
    setNewMemberNama('');
  };

  const handleRemoveMember = (idx: number) => {
    setMembers(members.filter((_, i) => i !== idx));
  };

  const handleSubmitAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulLomba || !penyelenggara) {
      alert('Harap lengkapi judul lomba dan penyelenggara!');
      return;
    }

    createPengajuan(
      {
        judulLomba,
        penyelenggara,
        tingkat,
        kategori,
        tanggalDeadline,
        biayaPendaftaran: Number(biayaPendaftaran),
        targetJuara,
        dosenPembimbingId: selectedDosenId,
        dosenPembimbingNama: selectedDosenNama
      },
      isTeam ? members : [],
      proposalFile || undefined
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 sacset-card-shadow flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span>Alur Pengajuan Lomba Kampus</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
                  E-ofiice
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Skema: Ketua Tim ➔ Anggota ACC/Reject ➔ Unggah Proposal ➔ Dosen Review
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

        {/* FLOWCHART DIAGRAM BANNER (Exact diagram from user screenshot) */}
        <div className="my-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[580px] gap-2">
            <div
              className={`p-2.5 rounded-xl border text-center transition-all flex-1 ${
                step === 1
                  ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="text-[10px] opacity-80">[Ketua Tim]</div>
              <div>Pengajuan Lomba</div>
            </div>

            <div className="text-slate-400 font-bold">➔</div>

            <div
              className={`p-2.5 rounded-xl border text-center transition-all flex-1 ${
                step === 2
                  ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="text-[10px] opacity-80">(Jika Tim)</div>
              <div>Tambah Anggota ➔ ACC/Reject</div>
            </div>

            <div className="text-slate-400 font-bold">➔</div>

            <div
              className={`p-2.5 rounded-xl border text-center transition-all flex-1 ${
                step === 3
                  ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="text-[10px] opacity-80">(Opsional)</div>
              <div>Unggah Proposal</div>
            </div>

            <div className="text-slate-400 font-bold">➔</div>

            <div
              className={`p-2.5 rounded-xl border text-center transition-all flex-1 ${
                step === 4
                  ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="text-[10px] opacity-80">Review</div>
              <div>Dosen Pembimbing</div>
            </div>
          </div>
        </div>

        {/* Stepper buttons */}
        <div className="flex items-center gap-1.5 mb-3">
          {[
            { s: 1, label: '1. Detail Lomba' },
            { s: 2, label: '2. Anggota Tim' },
            { s: 3, label: '3. Proposal' },
            { s: 4, label: '4. Dosen Reviewer' }
          ].map((item) => (
            <button
              key={item.s}
              type="button"
              onClick={() => setStep(item.s as any)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full border transition-all ${
                step === item.s
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Step Forms */}
        <div className="flex-1 overflow-y-auto pr-1">
          {/* STEP 1: lomba_pengajuan */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama / Judul Kompetisi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={judulLomba}
                  onChange={(e) => setJudulLomba(e.target.value)}
                  placeholder="Gemastik XIX 2026 - Pengembangan Aplikasi Cerdas"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Institusi Penyelenggara <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={penyelenggara}
                    onChange={(e) => setPenyelenggara(e.target.value)}
                    placeholder="BPTI Puspresnas Kemendikbudristek"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tingkat Kompetisi
                  </label>
                  <select
                    value={tingkat}
                    onChange={(e) => setTingkat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Internasional">Internasional (ASEAN/Global)</option>
                    <option value="Nasional">Nasional (Puspresnas)</option>
                    <option value="Regional">Regional / Antar Kampus</option>
                    <option value="Provinsi">Provinsi / Daerah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Lomba
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Inovasi Teknologi / Hackathon">Inovasi Teknologi / Hackathon</option>
                    <option value="Karya Tulis Ilmiah">Karya Tulis Ilmiah (KTI/PKM)</option>
                    <option value="UI/UX & Desain">UI/UX & Product Design</option>
                    <option value="Robotika & IoT">Robotika & IoT</option>
                    <option value="Bisnis Plan">Business Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Batas Pendaftaran (Deadline)
                  </label>
                  <input
                    type="date"
                    value={tanggalDeadline}
                    onChange={(e) => setTanggalDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Biaya Pendaftaran (Rp)
                  </label>
                  <input
                    type="number"
                    value={biayaPendaftaran}
                    onChange={(e) => setBiayaPendaftaran(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Capaian Juara
                  </label>
                  <input
                    type="text"
                    value={targetJuara}
                    onChange={(e) => setTargetJuara(e.target.value)}
                    placeholder="Juara 1 Medali Emas"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Lanjut: Tambah Anggota Tim (lomba_members)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: lomba_members */}
          {step === 2 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-xs font-bold text-slate-900">Partisipasi Lomba Sebagai Tim?</p>
                  <p className="text-[11px] text-slate-500">
                    Setiap anggota yang didaftarkan akan menerima permintaan <strong>ACC / Reject</strong>.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isTeam}
                  onChange={(e) => setIsTeam(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
              </div>

              {isTeam && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                    <p className="font-bold">Mekanisme Diagram: <code>Tambah Anggota ➔ Anggota ACC/Reject</code></p>
                    <p className="text-[11px] text-blue-700 mt-0.5">
                      Sebelum pengajuan sampai di meja Dosen Pembimbing, seluruh anggota tim harus menyetujui (ACC) keikutsertaan.
                    </p>
                  </div>

                  {/* Member cards */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Anda (Ketua Pengusul)</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">Status: Otomatis Disetujui (ACC)</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                      Ketua Tim
                    </span>
                  </div>

                  {members.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{m.nama}</p>
                          <span className="text-[10px] text-slate-500 font-mono">NPM: {m.npm}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">{m.prodi}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-300 px-2 py-0.5 rounded-full font-bold">
                          Menunggu ACC
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add member inputs */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <p className="text-xs font-bold text-slate-700">Tambah Anggota Tim:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="NPM Mahasiswa"
                        value={newMemberNpm}
                        onChange={(e) => setNewMemberNpm(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Nama Mahasiswa"
                        value={newMemberNama}
                        onChange={(e) => setNewMemberNama(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Prodi"
                        value={newMemberProdi}
                        onChange={(e) => setNewMemberProdi(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-600" />
                      <span>Tambahkan ke Tim</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <span>Lanjut: Unggah Proposal (Opsional)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: lomba_proposals */}
          {step === 3 && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                <p className="font-bold">Alur Diagram: <code>(Opsional) Unggah Proposal (lomba_proposals)</code></p>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  Lampirkan dokumen PDF proposal untuk mempermudah Dospem memberikan catatan koreksi atau persetujuan.
                </p>
              </div>

              {proposalFile ? (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 sacset-card-shadow relative">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{proposalFile.fileName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">Ukuran: {proposalFile.fileSize}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProposalFile(null)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Ringkasan Eksekutif Proposal:
                    </label>
                    <textarea
                      rows={2}
                      value={proposalFile.summary}
                      onChange={(e) =>
                        setProposalFile({ ...proposalFile, summary: e.target.value })
                      }
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() =>
                    setProposalFile({
                      fileName: 'Proposal_Inovasi_sacset_2026.pdf',
                      fileSize: '3.1 MB',
                      summary: 'Proposal komprehensif karya cipta inovasi teknologi PBL.'
                    })
                  }
                  className="p-8 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 text-center cursor-pointer transition-all"
                >
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    Klik untuk Mengunggah Berkas Proposal (Simulasi PDF)
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Format: PDF, DOCX, ZIP (Maksimal 25MB)
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <span>Lanjut: Pilih Dosen Pembimbing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Dosen Pembimbing Review */}
          {step === 4 && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <p className="font-bold flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Alur Diagram: <code>Dosen Pembimbing Review</code></span>
                </p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Dosen yang dipilih akan menerima berkas dalam antrean telaah review untuk disetujui, direvisi, atau ditolak.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Pilih Dosen Pembimbing:
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'dsn_1',
                      nama: 'Dr. Ir. Hendra Wijaya, M.Kom',
                      nip: '198504122010121001',
                      bidang: 'AI & Software Engineering',
                      status: 'Tersedia Verifikasi'
                    },
                    {
                      id: 'dsn_2',
                      nama: 'Prof. Dr. Ratna Sartika, M.T',
                      nip: '197802152005012002',
                      bidang: 'IoT & Cloud Systems',
                      status: 'Tersedia Verifikasi'
                    }
                  ].map((dsn) => (
                    <button
                      key={dsn.id}
                      type="button"
                      onClick={() => {
                        setSelectedDosenId(dsn.id);
                        setSelectedDosenNama(dsn.nama);
                      }}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        selectedDosenId === dsn.id
                          ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{dsn.nama}</p>
                        <p className="text-[10px] text-slate-400 font-mono">NIP: {dsn.nip}</p>
                        <p className="text-[10px] text-blue-600 font-medium">{dsn.bidang}</p>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                        {dsn.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAll}
                  className="flex-1 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all shadow flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Kirim Pengajuan Lomba Sekarang</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { LombaPengajuan } from '../../lib/types';

export default function AdminDashboard() {
  const {
    currentUser,
    currentProdi,
    currentJurusan,
    currentWadir3,
    pengajuanList,
    verifikasiByProdi,
    approvalByWadir3
  } = useApp();

  const role = currentUser?.role || 'prodi';

  const [danaInput, setDanaInput] = useState(5000000);
  const [catatanInput, setCatatanInput] = useState('');
  const [selectedPengajuan, setSelectedPengajuan] = useState<LombaPengajuan | null>(null);
  const [wadirModalOpen, setWadirModalOpen] = useState(false);

  const openWadirAction = (p: LombaPengajuan) => {
    setSelectedPengajuan(p);
    setDanaInput(p.tingkat === 'Internasional' ? 12500000 : 5000000);
    setCatatanInput(`Disetujui pendelegasian resmi kampus mewakili Universitas. Subsidi dana kompetisi dicairkan.`);
    setWadirModalOpen(true);
  };

  const handleWadirApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPengajuan) return;
    approvalByWadir3(selectedPengajuan.id, true, Number(danaInput), catatanInput);
    setWadirModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 sacset-card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser?.name || 'Admin'}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-purple-500 shadow-sm"
          />
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-mono">
              {role === 'prodi'
                ? 'TABEL PRODI_USERS'
                : role === 'jurusan'
                ? 'TABEL JURUSAN_USERS'
                : 'TABEL WADIR3_USERS (EXECUTIVE)'}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {currentUser?.name}
            </h1>
            <p className="text-xs text-purple-700 font-medium mt-0.5">
              {role === 'prodi'
                ? `${currentProdi?.namaProdi} • Kode: ${currentProdi?.kodeProdi}`
                : role === 'jurusan'
                ? `${currentJurusan?.namaJurusan} • Kode: ${currentJurusan?.kodeJurusan}`
                : `${currentWadir3?.jabatan} • NIP: ${currentWadir3?.nip}`}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right w-full md:w-auto">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">
            {role === 'wadir3' ? 'Pagu Anggaran Kemahasiswaan' : 'Wewenang'}
          </span>
          <span className="text-xl font-black text-slate-900 font-mono">
            {role === 'wadir3' ? 'Rp 85.000.000' : 'Verifikasi Akademik'}
          </span>
          <p className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center justify-end gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Otoritas Resmi</span>
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span>
              {role === 'wadir3'
                ? 'Sidang Persetujuan Dana Delegasi & SK Wadir III'
                : 'Pemeriksaan & Validasi Kelayakan Delegasi Lomba'}
            </span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {pengajuanList.length} Berkas Tercatat
          </span>
        </div>

        <div className="space-y-4">
          {pengajuanList.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 sacset-card-shadow hover:border-purple-300 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                      {p.tingkat}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Ketua: <strong className="text-slate-800">{p.ketuaNama}</strong> ({p.ketuaNpm})
                    </span>
                    <span className="text-[11px] text-slate-400">• Dospem: {p.dosenPembimbingNama}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{p.judulLomba}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Penyelenggara: {p.penyelenggara} • Estimasi Biaya: Rp {p.biayaPendaftaran.toLocaleString('id-ID')}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Status Dokumen:</span>
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mt-0.5 ${
                      p.status === 'disetujui_wadir3'
                        ? 'bg-teal-50 text-teal-700 border-teal-300'
                        : p.status === 'verifikasi_prodi'
                        ? 'bg-purple-50 text-purple-700 border-purple-300'
                        : p.status === 'disetujui_dosen'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {p.status.toUpperCase().replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Review notes */}
              <div className="mt-3 text-xs space-y-1.5">
                {p.catatanDosen && (
                  <p className="text-blue-800 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                    <strong>Rekomendasi Dospem:</strong> {p.catatanDosen}
                  </p>
                )}
                {p.catatanWadir3 && (
                  <p className="text-teal-800 bg-teal-50 p-2.5 rounded-xl border border-teal-200">
                    <strong>Keputusan Wadir III:</strong> {p.catatanWadir3}
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                {role === 'prodi' && (
                  <>
                    <button
                      onClick={() => verifikasiByProdi(p.id, true)}
                      className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verifikasi & Teruskan ke Wadir III</span>
                    </button>
                    <button
                      onClick={() => verifikasiByProdi(p.id, false)}
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold border border-slate-200"
                    >
                      Tolak
                    </button>
                  </>
                )}

                {role === 'wadir3' && (
                  <>
                    <button
                      onClick={() => openWadirAction(p)}
                      className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Setujui Dana & Terbitkan SK</span>
                    </button>
                    <button
                      onClick={() => approvalByWadir3(p.id, false)}
                      className="px-4 py-2 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold border border-slate-200"
                    >
                      Tolak Pendelegasian
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wadir Modal */}
      {wadirModalOpen && selectedPengajuan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sacset-card-shadow">
            <h3 className="text-base font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-600" />
              <span>Pengesahan Dana Pendelegasian & SK Wadir III</span>
            </h3>

            <p className="text-xs text-slate-500 mb-4">
              Lomba: <strong>{selectedPengajuan.judulLomba}</strong> ({selectedPengajuan.tingkat})
            </p>

            <form onSubmit={handleWadirApprove} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nominal Subsidi Dana Kompetisi (Rp):
                </label>
                <input
                  type="number"
                  required
                  value={danaInput}
                  onChange={(e) => setDanaInput(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Klausul Keputusan & Nomor SK Pendelegasian:
                </label>
                <textarea
                  rows={3}
                  required
                  value={catatanInput}
                  onChange={(e) => setCatatanInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWadirModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow transition-all"
                >
                  Cairkan Dana & Terbitkan SK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

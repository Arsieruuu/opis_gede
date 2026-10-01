'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Palette,
  CheckCircle,
  Plus,
  Trash2,
  Printer,
  ShieldCheck,
  Code,
  Award,
  Users,
  Briefcase
} from 'lucide-react';
import { StudentSkill, StudentExperience } from '../../lib/types';

export default function CvPortfolioView() {
  const {
    currentUser,
    currentMahasiswa,
    skills,
    experiences,
    addSkill,
    deleteSkill,
    updateSkillPercentage,
    addExperience,
    deleteExperience
  } = useApp();

  const [cvMode, setCvMode] = useState<'creative' | 'ats'>('creative');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showAddExpModal, setShowAddExpModal] = useState(false);

  // New Skill form
  const [skillNama, setSkillNama] = useState('');
  const [skillKategori, setSkillKategori] = useState<StudentSkill['kategori']>('Teknologi & Koding');
  const [skillPercentage, setSkillPercentage] = useState(85);

  // New Exp form
  const [expJenis, setExpJenis] = useState<StudentExperience['jenis']>('Prestasi Lomba');
  const [expJudul, setExpJudul] = useState('');
  const [expPenyelenggara, setExpPenyelenggara] = useState('');
  const [expPeriode, setExpPeriode] = useState('2026');
  const [expPencapaian, setExpPencapaian] = useState('');
  const [expDeskripsi, setExpDeskripsi] = useState('');

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillNama) return;
    addSkill({
      nama: skillNama,
      kategori: skillKategori,
      percentage: Number(skillPercentage)
    });
    setSkillNama('');
    setShowAddSkillModal(false);
  };

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expJudul || !expPenyelenggara) return;
    addExperience({
      jenis: expJenis,
      judul: expJudul,
      penyelenggara: expPenyelenggara,
      periode: expPeriode,
      pencapaian: expPencapaian,
      deskripsi: expDeskripsi,
      linkBukti: 'https://e-ofiice.local/verify/' + Math.floor(Math.random() * 900000)
    });
    setExpJudul('');
    setExpPenyelenggara('');
    setExpPencapaian('');
    setExpDeskripsi('');
    setShowAddExpModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Dual Mode Switcher & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200 sacset-card-shadow">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <span>Generator CV & Portofolio Mahasiswa</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-mono font-bold">
              dual-format
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Integrasi data profil <code>mahasiswa</code>, keahlian <code>student_skills</code>, dan <code>student_experiences</code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setCvMode('creative')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                cvMode === 'creative'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Format Kreatif</span>
            </button>
            <button
              onClick={() => setCvMode('ats')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                cvMode === 'ats'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Format ATS Friendly</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddSkillModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Keahlian</span>
          </button>

          <button
            onClick={() => setShowAddExpModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Pengalaman</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          FORMAT 1: KREATIF MODERN (BENTO SHOWCASE)
          ======================================================== */}
      {cvMode === 'creative' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Profile Hero Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 sacset-card-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'Aria'}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-blue-500 shadow-md"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentUser?.name || 'Aria Pratama'}
                  </h1>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    sacset verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-blue-600 font-bold mt-0.5">
                  {currentMahasiswa?.npm || '2110511042'} • {currentMahasiswa?.prodi || 'S1 Teknik Informatika'}
                </p>
                <p className="text-xs text-slate-600 mt-2 max-w-xl">
                  {currentMahasiswa?.bio || 'Fullstack & Smart Contract enthusiast | Juara Gemastik UX 2025 | PBL builder'}
                </p>
              </div>
            </div>

            <div className="flex md:flex-col gap-3 w-full md:w-auto">
              <div className="flex-1 md:flex-none p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center md:text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">IPK Kumulatif</span>
                <span className="text-xl font-black text-slate-900">{currentMahasiswa?.ipk || 3.88} / 4.00</span>
              </div>
              <div className="flex-1 md:flex-none p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center md:text-right">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">Semester Aktif</span>
                <span className="text-xl font-black text-blue-900">Semester {currentMahasiswa?.semester || 6}</span>
              </div>
            </div>
          </div>

          {/* Grid: Skills & Experiences */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Keahlian (student_skills) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 sacset-card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-600" />
                    <span>Keahlian & Persentase (student_skills)</span>
                  </h3>
                  <button
                    onClick={() => setShowAddSkillModal(true)}
                    className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3.5">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{skill.nama}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-blue-600">{skill.percentage}%</span>
                          <button
                            onClick={() => deleteSkill(skill.id)}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Percentage Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{skill.kategori}</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.percentage}
                          onChange={(e) => updateSkillPercentage(skill.id, Number(e.target.value))}
                          className="w-24 accent-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Rekam Jejak (student_experiences) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 sacset-card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Rekam Jejak & Prestasi (student_experiences)</span>
                  </h3>
                  <button
                    onClick={() => setShowAddExpModal(true)}
                    className="p-1 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {exp.jenis}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">{exp.periode}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">{exp.judul}</h4>
                          <p className="text-xs text-blue-600 font-medium mt-0.5">{exp.penyelenggara}</p>
                          {exp.pencapaian && (
                            <p className="text-xs font-bold text-emerald-600 mt-1">
                              ⭐ Capaian: {exp.pencapaian}
                            </p>
                          )}
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.deskripsi}</p>
                        </div>
                        <button
                          onClick={() => deleteExperience(exp.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FORMAT 2: ATS FRIENDLY RESUME
          ======================================================== */}
      {cvMode === 'ats' && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 sacset-card-shadow max-w-4xl mx-auto border border-slate-200">
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">
              {currentUser?.name || 'Aria Pratama'}
            </h1>
            <p className="text-sm text-slate-700 font-medium mt-0.5">
              {currentMahasiswa?.prodi || 'S1 Teknik Informatika'} • {currentMahasiswa?.jurusan || 'Jurusan TIK'}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-slate-600 mt-2 font-mono">
              <span>NPM: {currentMahasiswa?.npm || '2110511042'}</span>
              <span>•</span>
              <span>Email: {currentUser?.email}</span>
              <span>•</span>
              <span>E-ofiice Verified</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Ringkasan Akademik & Profesional
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Mahasiswa berprestasi semester {currentMahasiswa?.semester || 6} dengan IPK {currentMahasiswa?.ipk || 3.88}/4.00 di E-ofiice. Berpengalaman memimpin tim kompetisi teknologi dan pengembangan aplikasi perangkat lunak berskala institusi.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Keahlian Teknis & Tingkat Penguasaan (student_skills)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 text-xs text-slate-800">
              {skills.map((s) => (
                <div key={s.id}>
                  <strong>• {s.nama}:</strong> <span className="text-slate-600">{s.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Rekam Jejak Prestasi & Organisasi (student_experiences)
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.judul}</span>
                    <span className="font-mono text-slate-500">{exp.periode}</span>
                  </div>
                  <div className="text-slate-600 italic">
                    {exp.penyelenggara} — <strong className="text-slate-800">{exp.pencapaian}</strong>
                  </div>
                  <p className="text-slate-600 mt-0.5">{exp.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 font-mono flex justify-between">
            <span>Diverifikasi oleh E-ofiice</span>
            <span>Status: AKTIF</span>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH KEAHLIAN */}
      {showAddSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sacset-card-shadow">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Tambah Keahlian Baru (student_skills)</span>
            </h3>
            <form onSubmit={handleSaveSkill} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Keahlian</label>
                <input
                  type="text"
                  required
                  placeholder="misal: React Native & TypeScript"
                  value={skillNama}
                  onChange={(e) => setSkillNama(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                <select
                  value={skillKategori}
                  onChange={(e) => setSkillKategori(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                >
                  <option value="Teknologi & Koding">Teknologi & Koding</option>
                  <option value="Desain & UI/UX">Desain & UI/UX</option>
                  <option value="Data & AI">Data & AI</option>
                  <option value="Softskill & Kepemimpinan">Softskill & Kepemimpinan</option>
                  <option value="Bahasa">Bahasa</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Persentase Penguasaan</span>
                  <span className="text-blue-600">{skillPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skillPercentage}
                  onChange={(e) => setSkillPercentage(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSkillModal(false)}
                  className="flex-1 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                >
                  Simpan Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH PENGALAMAN */}
      {showAddExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sacset-card-shadow max-h-[90vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Tambah Rekam Jejak (student_experiences)</span>
            </h3>
            <form onSubmit={handleSaveExp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Pengalaman</label>
                <select
                  value={expJenis}
                  onChange={(e) => setExpJenis(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                >
                  <option value="Prestasi Lomba">Prestasi Lomba / Kompetisi</option>
                  <option value="Organisasi">Organisasi & Kepanitiaan</option>
                  <option value="Proyek / Riset">Proyek Cipta Karya / Riset</option>
                  <option value="Magang & Sertifikasi">Magang & Sertifikasi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Kegiatan / Posisi</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Finalis Gemastik 2026"
                  value={expJudul}
                  onChange={(e) => setExpJudul(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Institusi / Event</label>
                  <input
                    type="text"
                    required
                    placeholder="Puspresnas"
                    value={expPenyelenggara}
                    onChange={(e) => setExpPenyelenggara(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Periode</label>
                  <input
                    type="text"
                    placeholder="Nov 2025"
                    value={expPeriode}
                    onChange={(e) => setExpPeriode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pencapaian</label>
                <input
                  type="text"
                  placeholder="Juara 1 & Medali Emas"
                  value={expPencapaian}
                  onChange={(e) => setExpPencapaian(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={expDeskripsi}
                  onChange={(e) => setExpDeskripsi(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpModal(false)}
                  className="flex-1 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                >
                  Simpan Pengalaman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

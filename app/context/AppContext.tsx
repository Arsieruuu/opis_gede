'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  MahasiswaProfile,
  DosenProfile,
  ProdiProfile,
  JurusanProfile,
  Wadir3Profile,
  StudentSkill,
  StudentExperience,
  LombaPengajuan,
  LombaMember,
  LombaProposal,
  SuratPengajuan,
  SuratAnggaran,
  SuratGeneratedFiles,
  SuratApprovalHistory,
  LombaReport,
  SuratApprovalStatus
} from '../lib/types';
import {
  INITIAL_USERS,
  INITIAL_MAHASISWA,
  INITIAL_DOSEN,
  INITIAL_PRODI,
  INITIAL_JURUSAN,
  INITIAL_WADIR3,
  INITIAL_SKILLS,
  INITIAL_EXPERIENCES,
  INITIAL_PENGAJUAN,
  INITIAL_MEMBERS,
  INITIAL_PROPOSALS,
  INITIAL_SURAT_PENGAJUAN,
  INITIAL_SURAT_ANGGARAN,
  INITIAL_SURAT_FILES,
  INITIAL_SURAT_APPROVAL_HISTORIES,
  INITIAL_LOMBA_REPORTS
} from '../lib/mockData';

interface AppContextType {
  currentUser: User | null;
  currentMahasiswa: MahasiswaProfile | null;
  currentDosen: DosenProfile | null;
  currentProdi: ProdiProfile | null;
  currentJurusan: JurusanProfile | null;
  currentWadir3: Wadir3Profile | null;
  allUsers: User[];
  skills: StudentSkill[];
  experiences: StudentExperience[];
  pengajuanList: LombaPengajuan[];
  membersList: LombaMember[];
  proposalsList: LombaProposal[];
  suratPengajuanList: SuratPengajuan[];
  suratAnggaranList: SuratAnggaran[];
  suratFilesList: SuratGeneratedFiles[];
  suratApprovalHistories: SuratApprovalHistory[];
  lombaReports: LombaReport[];
  isSyncingSatset: boolean;
  notificationMessage: string | null;
  
  // Auth methods
  loginAsUser: (userId: string) => void;
  loginAsRole: (role: UserRole) => void;
  registerUser: (
    user: Omit<User, 'id' | 'createdAt'>,
    specificProfile: any
  ) => void;
  logout: () => void;
  
  // Lomba Actions
  createPengajuan: (
    data: {
      judulLomba: string;
      penyelenggara: string;
      tingkat: 'Internasional' | 'Nasional' | 'Regional' | 'Provinsi';
      kategori: 'Karya Tulis Ilmiah' | 'Inovasi Teknologi / Hackathon' | 'UI/UX & Desain' | 'Robotika & IoT' | 'Bisnis Plan';
      tanggalDeadline: string;
      biayaPendaftaran: number;
      targetJuara: string;
      dosenPembimbingId: string;
      dosenPembimbingNama: string;
    },
    members: Array<{ npm: string; nama: string; prodi: string }>,
    proposal?: { fileName: string; fileSize: string; summary: string }
  ) => void;
  respondMemberInvitation: (memberId: string, status: 'accepted' | 'rejected') => void;
  reviewByDosen: (pengajuanId: string, action: 'approve' | 'revisi' | 'reject', catatan: string) => void;
  verifikasiByProdi: (pengajuanId: string, approve: boolean) => void;
  approvalByWadir3: (pengajuanId: string, approve: boolean, dana?: number, catatan?: string) => void;

  // Surat approval workflow
  submitSuratPengajuan: (
    data: Omit<SuratPengajuan, 'id' | 'status' | 'substansiStatus' | 'anggaranStatus' | 'isFinalReady' | 'createdAt' | 'mahasiswaId' | 'mahasiswaNama' | 'npm'>,
    anggaran: Omit<SuratAnggaran, 'id' | 'suratPengajuanId'>[]
  ) => void;
  reviewSuratByProdi: (suratId: string, approve: boolean, note: string) => void;
  generateSuratDraft: (suratId: string, fileName: string) => void;
  reviewSuratByJurusan: (suratId: string, substansi: SuratApprovalStatus, anggaran: SuratApprovalStatus, note: string) => void;
  approveSuratByWadir3: (suratId: string, approve: boolean, note: string) => void;
  uploadSuratFinal: (suratId: string, fileName: string) => void;

  // Lomba reporting workflow
  submitLombaReport: (data: { pengajuanId: string; fileSertifikat: string; fileLaporan: string; ringkasan: string }) => void;
  validateLombaReportByProdi: (reportId: string, approve: boolean, note: string) => void;
  
  // CV & Skills Actions
  addSkill: (skill: { nama: string; kategori: StudentSkill['kategori']; percentage: number }) => void;
  deleteSkill: (skillId: string) => void;
  updateSkillPercentage: (skillId: string, percentage: number) => void;
  addExperience: (exp: Omit<StudentExperience, 'id' | 'mahasiswaId'>) => void;
  deleteExperience: (expId: string) => void;
  syncSatset: () => void;
  toggleDosenVerifikasi: () => void;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(INITIAL_USERS);
  const [mahasiswaProfiles, setMahasiswaProfiles] = useState<Record<string, MahasiswaProfile>>(INITIAL_MAHASISWA);
  const [dosenProfiles, setDosenProfiles] = useState<Record<string, DosenProfile>>(INITIAL_DOSEN);
  const [prodiProfiles, setProdiProfiles] = useState<Record<string, ProdiProfile>>(INITIAL_PRODI);
  const [jurusanProfiles, setJurusanProfiles] = useState<Record<string, JurusanProfile>>(INITIAL_JURUSAN);
  const [wadir3Profiles, setWadir3Profiles] = useState<Record<string, Wadir3Profile>>(INITIAL_WADIR3);

  const [skills, setSkills] = useState<StudentSkill[]>(INITIAL_SKILLS);
  const [experiences, setExperiences] = useState<StudentExperience[]>(INITIAL_EXPERIENCES);
  const [pengajuanList, setPengajuanList] = useState<LombaPengajuan[]>(INITIAL_PENGAJUAN);
  const [membersList, setMembersList] = useState<LombaMember[]>(INITIAL_MEMBERS);
  const [proposalsList, setProposalsList] = useState<LombaProposal[]>(INITIAL_PROPOSALS);
  const [suratPengajuanList, setSuratPengajuanList] = useState<SuratPengajuan[]>(INITIAL_SURAT_PENGAJUAN);
  const [suratAnggaranList, setSuratAnggaranList] = useState<SuratAnggaran[]>(INITIAL_SURAT_ANGGARAN);
  const [suratFilesList, setSuratFilesList] = useState<SuratGeneratedFiles[]>(INITIAL_SURAT_FILES);
  const [suratApprovalHistories, setSuratApprovalHistories] = useState<SuratApprovalHistory[]>(INITIAL_SURAT_APPROVAL_HISTORIES);
  const [lombaReports, setLombaReports] = useState<LombaReport[]>(INITIAL_LOMBA_REPORTS);

  const [isSyncingSatset, setIsSyncingSatset] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('satset_opis_currentUser');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }
  }, []);

  const triggerToast = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4500);
  };

  const loginAsUser = (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('satset_opis_currentUser', JSON.stringify(user));
      triggerToast(`Berhasil login sebagai ${user.name} (${user.role.toUpperCase()})`);
    }
  };

  const loginAsRole = (role: UserRole) => {
    const user = allUsers.find((u) => u.role === role);
    if (user) {
      loginAsUser(user.id);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('satset_opis_currentUser');
    triggerToast('Anda telah logout dari Satset Network');
  };

  const registerUser = (
    userPayload: Omit<User, 'id' | 'createdAt'>,
    specificProfile: any
  ) => {
    const newUserId = `user_${Date.now()}`;
    const newUser: User = {
      ...userPayload,
      id: newUserId,
      createdAt: new Date().toISOString().split('T')[0],
      satsetId: `SATSET-ID-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setAllUsers((prev) => [...prev, newUser]);

    if (newUser.role === 'mahasiswa') {
      const newMhsProfile: MahasiswaProfile = {
        id: `mhs_${Date.now()}`,
        userId: newUserId,
        npm: specificProfile.npm || '2110519999',
        prodi: specificProfile.prodi || 'S1 Teknik Informatika',
        jurusan: specificProfile.jurusan || 'Teknik Informatika & Komputer',
        semester: Number(specificProfile.semester) || 1,
        ipk: Number(specificProfile.ipk) || 3.5,
        satsetSyncStatus: 'synced',
        lastSync: 'Baru saja',
        phone: specificProfile.phone || '+62 812-0000-1111',
        bio: specificProfile.bio || 'Mahasiswa berprestasi siap berkolaborasi',
        github: specificProfile.github,
        linkedin: specificProfile.linkedin
      };
      setMahasiswaProfiles((prev) => ({ ...prev, [newUserId]: newMhsProfile }));
    } else if (newUser.role === 'dosen') {
      const newDosenProfile: DosenProfile = {
        id: `dsn_${Date.now()}`,
        userId: newUserId,
        nip: specificProfile.nip || '199001012020011001',
        nidn: specificProfile.nidn || '0001019001',
        prodi: specificProfile.prodi || 'S1 Teknik Informatika',
        fakultas: specificProfile.fakultas || 'Fakultas Ilmu Komputer',
        ketersediaanVerifikasi: true,
        bidangKeahlian: specificProfile.bidangKeahlian || ['Artificial Intelligence', 'Software Dev'],
        quotaBimbingan: 10,
        activeBimbinganCount: 0
      };
      setDosenProfiles((prev) => ({ ...prev, [newUserId]: newDosenProfile }));
    }

    setCurrentUser(newUser);
    triggerToast(`Akun ${newUser.name} berhasil dibuat dengan role ${newUser.role}`);
  };

  const createPengajuan = (
    data: {
      judulLomba: string;
      penyelenggara: string;
      tingkat: 'Internasional' | 'Nasional' | 'Regional' | 'Provinsi';
      kategori: 'Karya Tulis Ilmiah' | 'Inovasi Teknologi / Hackathon' | 'UI/UX & Desain' | 'Robotika & IoT' | 'Bisnis Plan';
      tanggalDeadline: string;
      biayaPendaftaran: number;
      targetJuara: string;
      dosenPembimbingId: string;
      dosenPembimbingNama: string;
    },
    members: Array<{ npm: string; nama: string; prodi: string }>,
    proposal?: { fileName: string; fileSize: string; summary: string }
  ) => {
    if (!currentUser) return;
    const currentMhs = mahasiswaProfiles[currentUser.id];
    const newPengajuanId = `lomba_${Date.now()}`;

    // Has team members that need ACC?
    const hasPendingMembers = members.length > 0;
    const initialStatus = hasPendingMembers ? 'menunggu_anggota' : 'menunggu_review_dosen';

    const newPengajuan: LombaPengajuan = {
      id: newPengajuanId,
      ketuaId: currentMhs ? currentMhs.id : currentUser.id,
      ketuaNama: currentUser.name,
      ketuaNpm: currentMhs?.npm || 'NPM-UNKNOWN',
      judulLomba: data.judulLomba,
      penyelenggara: data.penyelenggara,
      tingkat: data.tingkat,
      kategori: data.kategori,
      tanggalDeadline: data.tanggalDeadline,
      biayaPendaftaran: data.biayaPendaftaran,
      targetJuara: data.targetJuara,
      dosenPembimbingId: data.dosenPembimbingId,
      dosenPembimbingNama: data.dosenPembimbingNama,
      status: initialStatus,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // 1. Add Ketua to members
    const ketuaMember: LombaMember = {
      id: `mem_ketua_${Date.now()}`,
      pengajuanId: newPengajuanId,
      mahasiswaId: currentMhs ? currentMhs.id : currentUser.id,
      npm: currentMhs?.npm || '2110511042',
      nama: currentUser.name,
      prodi: currentMhs?.prodi || 'Informatika',
      roleTim: 'Ketua',
      statusAcc: 'accepted',
      updatedAt: new Date().toLocaleTimeString('id-ID')
    };

    // 2. Add extra members (lomba_members) with pending status
    const extraMembers: LombaMember[] = members.map((m, idx) => ({
      id: `mem_${Date.now()}_${idx}`,
      pengajuanId: newPengajuanId,
      mahasiswaId: m.npm === '2110511088' ? 'mhs_2' : `mhs_ext_${idx}`,
      npm: m.npm,
      nama: m.nama,
      prodi: m.prodi,
      roleTim: 'Anggota',
      statusAcc: 'pending',
      updatedAt: new Date().toLocaleTimeString('id-ID')
    }));

    // 3. Add proposal if provided
    if (proposal && proposal.fileName) {
      const newProposal: LombaProposal = {
        id: `prop_${Date.now()}`,
        pengajuanId: newPengajuanId,
        fileName: proposal.fileName,
        fileSize: proposal.fileSize || '2.1 MB',
        uploadedAt: new Date().toLocaleString('id-ID'),
        version: 1,
        summary: proposal.summary || 'Proposal inovasi kompetisi mahasiswa',
        fileUrl: '#'
      };
      setProposalsList((prev) => [newProposal, ...prev]);
    }

    setPengajuanList((prev) => [newPengajuan, ...prev]);
    setMembersList((prev) => [...prev, ketuaMember, ...extraMembers]);

    triggerToast(
      hasPendingMembers
        ? 'Pengajuan dibuat! Menunggu konfirmasi ACC anggota tim sebelum diteruskan ke Dosen.'
        : 'Pengajuan dibuat & langsung diteruskan ke antrean review Dosen Pembimbing!'
    );
  };

  const respondMemberInvitation = (memberId: string, status: 'accepted' | 'rejected') => {
    let targetPengajuanId = '';
    setMembersList((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          targetPengajuanId = m.pengajuanId;
          return { ...m, statusAcc: status, updatedAt: new Date().toLocaleTimeString('id-ID') };
        }
        return m;
      })
    );

    // If accepted, check if all members for this pengajuan are accepted
    if (targetPengajuanId) {
      setPengajuanList((prev) =>
        prev.map((p) => {
          if (p.id === targetPengajuanId && p.status === 'menunggu_anggota') {
            // Check remaining pending members
            const otherMembers = membersList.filter(
              (m) => m.pengajuanId === targetPengajuanId && m.id !== memberId && m.statusAcc === 'pending'
            );
            if (otherMembers.length === 0 && status === 'accepted') {
              return { ...p, status: 'menunggu_review_dosen' };
            }
          }
          return p;
        })
      );
    }

    triggerToast(
      status === 'accepted'
        ? 'Anda menyetujui bergabung dalam tim lomba ini!'
        : 'Anda menolak undangan anggota tim.'
    );
  };

  const reviewByDosen = (
    pengajuanId: string,
    action: 'approve' | 'revisi' | 'reject',
    catatan: string
  ) => {
    setPengajuanList((prev) =>
      prev.map((p) => {
        if (p.id === pengajuanId) {
          const nextStatus =
            action === 'approve'
              ? 'disetujui_dosen'
              : action === 'revisi'
              ? 'revisi_dosen'
              : 'ditolak';
          return {
            ...p,
            status: nextStatus,
            catatanDosen: catatan || (action === 'approve' ? 'Disetujui untuk maju ke tahap verifikasi Program Studi.' : 'Perlu revisi.')
          };
        }
        return p;
      })
    );

    triggerToast(
      action === 'approve'
        ? 'Pengajuan lomba berhasil disetujui Dosen Pembimbing!'
        : action === 'revisi'
        ? 'Catatan revisi telah dikirimkan ke mahasiswa.'
        : 'Pengajuan lomba ditolak.'
    );
  };

  const verifikasiByProdi = (pengajuanId: string, approve: boolean) => {
    setPengajuanList((prev) =>
      prev.map((p) => {
        if (p.id === pengajuanId) {
          return {
            ...p,
            status: approve ? 'verifikasi_prodi' : 'ditolak'
          };
        }
        return p;
      })
    );
    triggerToast(approve ? 'Diverifikasi oleh Prodi. Diteruskan ke Wadir 3!' : 'Ditolak oleh Prodi.');
  };

  const approvalByWadir3 = (
    pengajuanId: string,
    approve: boolean,
    dana?: number,
    catatan?: string
  ) => {
    setPengajuanList((prev) =>
      prev.map((p) => {
        if (p.id === pengajuanId) {
          return {
            ...p,
            status: approve ? 'disetujui_wadir3' : 'ditolak',
            catatanWadir3: catatan || (approve ? `Disetujui pendelegasian resmi kampus dengan subsidi Rp ${(dana || 2500000).toLocaleString('id-ID')}` : 'Tidak disetujui.')
          };
        }
        return p;
      })
    );
    triggerToast(approve ? 'Pengajuan Resmi disetujui Wadir III & Didanai!' : 'Pengajuan ditolak oleh Wadir III.');
  };

  const addSuratHistory = (
    suratId: string,
    stage: SuratApprovalHistory['stage'],
    action: SuratApprovalHistory['action'],
    note: string
  ) => {
    if (!currentUser) return;
    setSuratApprovalHistories((prev) => [
      ...prev,
      {
        id: `hist_surat_${Date.now()}`,
        suratPengajuanId: suratId,
        actorId: currentUser.id,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        stage,
        action,
        note,
        createdAt: new Date().toLocaleString('id-ID')
      }
    ]);
  };

  const submitSuratPengajuan = (
    data: Omit<SuratPengajuan, 'id' | 'status' | 'substansiStatus' | 'anggaranStatus' | 'isFinalReady' | 'createdAt' | 'mahasiswaId' | 'mahasiswaNama' | 'npm'>,
    anggaran: Omit<SuratAnggaran, 'id' | 'suratPengajuanId'>[]
  ) => {
    if (!currentUser || currentUser.role !== 'mahasiswa') return;
    const profile = mahasiswaProfiles[currentUser.id];
    const suratId = `surat_${Date.now()}`;
    const surat: SuratPengajuan = {
      ...data,
      id: suratId,
      mahasiswaId: profile?.id || currentUser.id,
      mahasiswaNama: currentUser.name,
      npm: profile?.npm || 'NPM-UNKNOWN',
      status: 'review_prodi',
      substansiStatus: 'pending',
      anggaranStatus: 'pending',
      isFinalReady: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSuratPengajuanList((prev) => [surat, ...prev]);
    setSuratAnggaranList((prev) => [
      ...prev,
      ...anggaran.map((item, index) => ({ ...item, id: `anggaran_${Date.now()}_${index}`, suratPengajuanId: suratId }))
    ]);
    addSuratHistory(suratId, 'prodi', 'submitted', 'Pengajuan surat dan rincian anggaran dikirim untuk review Prodi.');
    triggerToast('Pengajuan surat berhasil dikirim ke antrean Prodi.');
  };

  const reviewSuratByProdi = (suratId: string, approve: boolean, note: string) => {
    setSuratPengajuanList((prev) => prev.map((surat) => surat.id === suratId ? {
      ...surat,
      status: approve ? 'administrasi_jurusan' : 'ditolak',
      substansiStatus: approve ? 'approved' : 'rejected',
      anggaranStatus: approve ? 'approved' : 'rejected'
    } : surat));
    addSuratHistory(suratId, 'prodi', approve ? 'approved' : 'rejected', note || 'Review Prodi selesai.');
    triggerToast(approve ? 'Substansi dan anggaran surat lolos validasi Prodi.' : 'Pengajuan surat ditolak oleh Prodi.');
  };

  const generateSuratDraft = (suratId: string, fileName: string) => {
    setSuratPengajuanList((prev) => prev.map((surat) => surat.id === suratId ? { ...surat, status: 'review_jurusan' } : surat));
    setSuratFilesList((prev) => {
      const existing = prev.find((file) => file.suratPengajuanId === suratId);
      if (existing) return prev.map((file) => file.suratPengajuanId === suratId ? { ...file, fileDraftGenerated: fileName, generatedAt: new Date().toLocaleString('id-ID') } : file);
      return [...prev, { id: `file_surat_${Date.now()}`, suratPengajuanId: suratId, fileDraftGenerated: fileName, generatedAt: new Date().toLocaleString('id-ID') }];
    });
    addSuratHistory(suratId, 'admin_jurusan', 'draft_generated', `Draft surat ${fileName} berhasil dibuat.`);
    triggerToast('Draft surat berhasil dibuat dan diteruskan ke Jurusan.');
  };

  const reviewSuratByJurusan = (suratId: string, substansi: SuratApprovalStatus, anggaran: SuratApprovalStatus, note: string) => {
    setSuratPengajuanList((prev) => prev.map((surat) => surat.id === suratId ? {
      ...surat,
      status: substansi === 'rejected' || anggaran === 'rejected' ? 'ditolak' : substansi === 'approved' && anggaran === 'approved' ? 'review_wadir3' : 'review_jurusan',
      substansiStatus: substansi,
      anggaranStatus: anggaran
    } : surat));
    addSuratHistory(suratId, 'jurusan', substansi === 'rejected' || anggaran === 'rejected' ? 'rejected' : 'approved', note || `Review Jurusan: substansi ${substansi}, anggaran ${anggaran}.`);
    triggerToast('Review Jurusan tersimpan. Status substansi dan anggaran tetap terpisah.');
  };

  const approveSuratByWadir3 = (suratId: string, approve: boolean, note: string) => {
    setSuratPengajuanList((prev) => prev.map((surat) => surat.id === suratId ? {
      ...surat,
      status: approve ? 'review_wadir3' : 'ditolak',
      substansiStatus: approve ? 'approved' : surat.substansiStatus,
      anggaranStatus: approve ? 'approved' : surat.anggaranStatus
    } : surat));
    addSuratHistory(suratId, 'wadir3', approve ? 'approved' : 'rejected', note || 'Approval akhir Wadir 3 diproses. Menunggu unggah scan final.');
    triggerToast(approve ? 'Approval akhir Wadir 3 tersimpan. Unggah scan surat final.' : 'Pengajuan surat ditolak oleh Wadir 3.');
  };

  const uploadSuratFinal = (suratId: string, fileName: string) => {
    setSuratPengajuanList((prev) => prev.map((surat) => surat.id === suratId ? { ...surat, status: 'final_ready', isFinalReady: true } : surat));
    setSuratFilesList((prev) => prev.map((file) => file.suratPengajuanId === suratId ? { ...file, fileFinalScanned: fileName, uploadedAt: new Date().toLocaleString('id-ID') } : file));
    addSuratHistory(suratId, 'wadir3', 'final_uploaded', `File final tersahkan ${fileName} tersedia untuk diunduh mahasiswa.`);
    triggerToast('File surat final berhasil diunggah. Surat legal siap diunduh mahasiswa.');
  };

  const submitLombaReport = (data: { pengajuanId: string; fileSertifikat: string; fileLaporan: string; ringkasan: string }) => {
    if (!currentUser) return;
    const report: LombaReport = { id: `report_${Date.now()}`, mahasiswaId: currentUser.id, statusPelaporan: 'menunggu_validasi', submittedAt: new Date().toLocaleString('id-ID'), ...data };
    setLombaReports((prev) => [report, ...prev]);
    setPengajuanList((prev) => prev.map((pengajuan) => pengajuan.id === data.pengajuanId ? { ...pengajuan, statusPelaporan: 'menunggu_validasi' } : pengajuan));
    triggerToast('Laporan dan sertifikat tersimpan. Menunggu validasi Prodi.');
  };

  const validateLombaReportByProdi = (reportId: string, approve: boolean, note: string) => {
    const report = lombaReports.find((item) => item.id === reportId);
    if (!report) return;
    setLombaReports((prev) => prev.map((item) => item.id === reportId ? { ...item, statusPelaporan: approve ? 'selesai' : 'ditolak', catatanProdi: note, validatedAt: new Date().toLocaleString('id-ID') } : item));
    setPengajuanList((prev) => prev.map((pengajuan) => pengajuan.id === report.pengajuanId ? { ...pengajuan, statusPelaporan: approve ? 'selesai' : 'ditolak' } : pengajuan));
    triggerToast(approve ? 'Laporan tervalidasi. Mahasiswa dapat mengajukan kegiatan pada periode berikutnya.' : 'Laporan dikembalikan untuk diperbaiki.');
  };

  // CV & Skills Actions
  const addSkill = (newSkill: { nama: string; kategori: StudentSkill['kategori']; percentage: number }) => {
    const currentMhs = currentUser ? mahasiswaProfiles[currentUser.id] : null;
    const skillItem: StudentSkill = {
      id: `skill_${Date.now()}`,
      mahasiswaId: currentMhs?.id || 'mhs_1',
      nama: newSkill.nama,
      kategori: newSkill.kategori,
      percentage: newSkill.percentage,
      verifiedBySatset: true
    };
    setSkills((prev) => [...prev, skillItem]);
    triggerToast(`Keahlian "${newSkill.nama}" (${newSkill.percentage}%) berhasil ditambahkan ke portofolio!`);
  };

  const deleteSkill = (skillId: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== skillId));
    triggerToast('Keahlian dihapus dari portofolio.');
  };

  const updateSkillPercentage = (skillId: string, percentage: number) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, percentage } : s))
    );
  };

  const addExperience = (exp: Omit<StudentExperience, 'id' | 'mahasiswaId'>) => {
    const currentMhs = currentUser ? mahasiswaProfiles[currentUser.id] : null;
    const expItem: StudentExperience = {
      ...exp,
      id: `exp_${Date.now()}`,
      mahasiswaId: currentMhs?.id || 'mhs_1'
    };
    setExperiences((prev) => [expItem, ...prev]);
    triggerToast(`Rekam jejak "${exp.judul}" berhasil disimpan!`);
  };

  const deleteExperience = (expId: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== expId));
    triggerToast('Rekam jejak pengalaman dihapus.');
  };

  const syncSatset = () => {
    setIsSyncingSatset(true);
    triggerToast('Mengontak jaringan Satset Sync API...');
    setTimeout(() => {
      setIsSyncingSatset(false);
      if (currentUser && mahasiswaProfiles[currentUser.id]) {
        setMahasiswaProfiles((prev) => ({
          ...prev,
          [currentUser.id]: {
            ...prev[currentUser.id],
            satsetSyncStatus: 'synced',
            lastSync: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
          }
        }));
      }
      setSkills((prev) => prev.map((s) => ({ ...s, verifiedBySatset: true })));
      triggerToast('Sinkronisasi Satset Berhasil! Data akademik & sertifikasi terverifikasi.');
    }, 1800);
  };

  const toggleDosenVerifikasi = () => {
    if (!currentUser) return;
    setDosenProfiles((prev) => {
      const current = prev[currentUser.id];
      if (!current) return prev;
      const updated = !current.ketersediaanVerifikasi;
      triggerToast(
        updated
          ? 'Status Anda: TERSEDIA untuk verifikasi bimbingan lomba mahasiswa.'
          : 'Status Anda: SEDANG SIBUK / Tidak menerima bimbingan baru saat ini.'
      );
      return {
        ...prev,
        [currentUser.id]: {
          ...current,
          ketersediaanVerifikasi: updated
        }
      };
    });
  };

  const currentMahasiswa = currentUser ? mahasiswaProfiles[currentUser.id] || null : null;
  const currentDosen = currentUser ? dosenProfiles[currentUser.id] || null : null;
  const currentProdi = currentUser ? prodiProfiles[currentUser.id] || null : null;
  const currentJurusan = currentUser ? jurusanProfiles[currentUser.id] || null : null;
  const currentWadir3 = currentUser ? wadir3Profiles[currentUser.id] || null : null;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentMahasiswa,
        currentDosen,
        currentProdi,
        currentJurusan,
        currentWadir3,
        allUsers,
        skills,
        experiences,
        pengajuanList,
        membersList,
        proposalsList,
        suratPengajuanList,
        suratAnggaranList,
        suratFilesList,
        suratApprovalHistories,
        lombaReports,
        isSyncingSatset,
        notificationMessage,
        loginAsUser,
        loginAsRole,
        registerUser,
        logout,
        createPengajuan,
        respondMemberInvitation,
        reviewByDosen,
        verifikasiByProdi,
        approvalByWadir3,
        submitSuratPengajuan,
        reviewSuratByProdi,
        generateSuratDraft,
        reviewSuratByJurusan,
        approveSuratByWadir3,
        uploadSuratFinal,
        submitLombaReport,
        validateLombaReportByProdi,
        addSkill,
        deleteSkill,
        updateSkillPercentage,
        addExperience,
        deleteExperience,
        syncSatset,
        toggleDosenVerifikasi,
        clearNotification: () => setNotificationMessage(null)
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

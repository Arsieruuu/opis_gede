import {
  User,
  MahasiswaProfile,
  DosenProfile,
  ProdiProfile,
  JurusanProfile,
  Wadir3Profile,
  StudentSkill,
  StudentExperience,
  LombaPengajuan,
  LombaMember,
  LombaProposal
} from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_mhs_1',
    email: 'aria.pratama@student.univ.ac.id',
    role: 'mahasiswa',
    name: 'Aria Pratama',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-01-15',
    satsetId: 'SATSET-ID-882194'
  },
  {
    id: 'user_mhs_2',
    email: 'citra.lestari@student.univ.ac.id',
    role: 'mahasiswa',
    name: 'Citra Lestari',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    createdAt: '2024-02-10',
    satsetId: 'SATSET-ID-993012'
  },
  {
    id: 'user_dsn_1',
    email: 'hendra.wijaya@univ.ac.id',
    role: 'dosen',
    name: 'Dr. Ir. Hendra Wijaya, M.Kom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2023-08-01',
    satsetId: 'SATSET-DSN-0104'
  },
  {
    id: 'user_prodi_1',
    email: 'admin.if@univ.ac.id',
    role: 'prodi',
    name: 'Admin Prodi S1 Informatika',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2023-05-10',
    satsetId: 'SATSET-ADM-PRODI'
  },
  {
    id: 'user_jurusan_1',
    email: 'admin.jtik@univ.ac.id',
    role: 'jurusan',
    name: 'Admin Jurusan Teknik Informatika & Komputer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    createdAt: '2023-04-12',
    satsetId: 'SATSET-ADM-JURUSAN'
  },
  {
    id: 'user_wadir3_1',
    email: 'wadir3.kemahasiswaan@univ.ac.id',
    role: 'wadir3',
    name: 'Dr. Budi Santoso, M.Pd (Wadir III)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2022-11-01',
    satsetId: 'SATSET-WADIR3-EXEC'
  }
];

export const INITIAL_MAHASISWA: Record<string, MahasiswaProfile> = {
  user_mhs_1: {
    id: 'mhs_1',
    userId: 'user_mhs_1',
    npm: '2110511042',
    prodi: 'S1 Teknik Informatika',
    jurusan: 'Teknik Informatika & Komputer',
    semester: 6,
    ipk: 3.88,
    satsetSyncStatus: 'synced',
    lastSync: '2026-10-01 10:45 WIB',
    phone: '+62 812-8899-7711',
    bio: 'Fullstack & Smart Contract enthusiast | Juara 1 Gemastik UX 2025 | Web3 builder',
    github: 'https://github.com/ariapratama',
    linkedin: 'https://linkedin.com/in/ariapratama'
  },
  user_mhs_2: {
    id: 'mhs_2',
    userId: 'user_mhs_2',
    npm: '2110511088',
    prodi: 'S1 Sistem Informasi',
    jurusan: 'Teknik Informatika & Komputer',
    semester: 6,
    ipk: 3.92,
    satsetSyncStatus: 'synced',
    lastSync: '2026-09-28 14:10 WIB',
    phone: '+62 856-1122-3344',
    bio: 'Data Analyst & Product Researcher | Tim Pengembang Smart Campus Solution',
    github: 'https://github.com/citralestari',
    linkedin: 'https://linkedin.com/in/citralestari'
  }
};

export const INITIAL_DOSEN: Record<string, DosenProfile> = {
  user_dsn_1: {
    id: 'dsn_1',
    userId: 'user_dsn_1',
    nip: '198504122010121001',
    nidn: '0012048501',
    prodi: 'S1 Teknik Informatika',
    fakultas: 'Fakultas Ilmu Komputer',
    ketersediaanVerifikasi: true,
    bidangKeahlian: ['Artificial Intelligence', 'Web3 & Distributed Systems', 'Software Engineering'],
    quotaBimbingan: 10,
    activeBimbinganCount: 3
  }
};

export const INITIAL_PRODI: Record<string, ProdiProfile> = {
  user_prodi_1: {
    id: 'prodi_1',
    userId: 'user_prodi_1',
    kodeProdi: 'IF-S1-01',
    namaProdi: 'S1 Teknik Informatika',
    fakultas: 'Fakultas Ilmu Komputer',
    kaprodi: 'Ir. Muhammad Yusuf, M.Sc'
  }
};

export const INITIAL_JURUSAN: Record<string, JurusanProfile> = {
  user_jurusan_1: {
    id: 'jurusan_1',
    userId: 'user_jurusan_1',
    kodeJurusan: 'JTIK-01',
    namaJurusan: 'Teknik Informatika & Komputer',
    fakultas: 'Fakultas Ilmu Komputer',
    kajur: 'Dr. Anton Nugroho, M.T'
  }
};

export const INITIAL_WADIR3: Record<string, Wadir3Profile> = {
  user_wadir3_1: {
    id: 'wadir3_1',
    userId: 'user_wadir3_1',
    nip: '197405101999031002',
    jabatan: 'Wakil Direktur III Bidang Kemahasiswaan & Kerjasama',
    skWadir: 'SK/DIR/2024/091-KMH',
    anggaranTersedia: 85000000
  }
};

export const INITIAL_SKILLS: StudentSkill[] = [
  {
    id: 'skill_1',
    mahasiswaId: 'mhs_1',
    nama: 'Next.js & React 19',
    kategori: 'Teknologi & Koding',
    percentage: 92,
    verifiedBySatset: true
  },
  {
    id: 'skill_2',
    mahasiswaId: 'mhs_1',
    nama: 'Solidity & Web3 Architecture',
    kategori: 'Teknologi & Koding',
    percentage: 84,
    verifiedBySatset: true
  },
  {
    id: 'skill_3',
    mahasiswaId: 'mhs_1',
    nama: 'TypeScript / Node.js Microservices',
    kategori: 'Teknologi & Koding',
    percentage: 88,
    verifiedBySatset: true
  },
  {
    id: 'skill_4',
    mahasiswaId: 'mhs_1',
    nama: 'Figma UI/UX & Design System',
    kategori: 'Desain & UI/UX',
    percentage: 90,
    verifiedBySatset: true
  },
  {
    id: 'skill_5',
    mahasiswaId: 'mhs_1',
    nama: 'AI Prompt Engineering & LLM Integration',
    kategori: 'Data & AI',
    percentage: 78,
    verifiedBySatset: false
  },
  {
    id: 'skill_6',
    mahasiswaId: 'mhs_1',
    nama: 'Team Leadership & Agile Scrum',
    kategori: 'Softskill & Kepemimpinan',
    percentage: 85,
    verifiedBySatset: true
  }
];

export const INITIAL_EXPERIENCES: StudentExperience[] = [
  {
    id: 'exp_1',
    mahasiswaId: 'mhs_1',
    jenis: 'Prestasi Lomba',
    judul: 'Juara 1 Hackathon Nasional Web3 Innovation 2025',
    penyelenggara: 'Kementerian Kominfo & Asosiasi Blockchain Indonesia',
    periode: 'Nov 2025',
    pencapaian: 'Gold Medal & Best Technical Solution Award',
    deskripsi: 'Merancang dApp platform verifikasi ijazah anti-pemalsuan terintegrasi dengan jaringan smart contracts layer 2 dan integrasi Satset API.',
    linkBukti: 'https://kominfo.go.id/sertifikat-aria-web3'
  },
  {
    id: 'exp_2',
    mahasiswaId: 'mhs_1',
    jenis: 'Organisasi',
    judul: 'Ketua Divisi Riset & Teknologi (HIMATIF)',
    penyelenggara: 'Himpunan Mahasiswa Teknik Informatika',
    periode: '2024 - 2025',
    pencapaian: 'Memimpin 35 anggota & menginisiasi bootcamp koding gratis bagi 300+ maba',
    deskripsi: 'Bertanggung jawab dalam pengembangan infrastruktur digital kampus, mentoring kompetisi, dan kurikulum inkubasi karya mahasiswa.',
    linkBukti: 'https://himatif.univ.ac.id/divisi-ristek'
  },
  {
    id: 'exp_3',
    mahasiswaId: 'mhs_1',
    jenis: 'Magang & Sertifikasi',
    judul: 'Frontend Engineering Intern',
    penyelenggara: 'PT Satset Fintek Nusantara',
    periode: 'Jul 2025 - Des 2025',
    pencapaian: 'Completed with Outstanding Performance Review',
    deskripsi: 'Mengembangkan high-performance client dashboard, optimasi render DOM hingga 40% lebih kencang, dan integrasi Tailwind CSS v4 design tokens.',
    linkBukti: 'https://satset.com/intern/aria-badge'
  }
];

export const INITIAL_PENGAJUAN: LombaPengajuan[] = [
  {
    id: 'lomba_001',
    ketuaId: 'mhs_1',
    ketuaNama: 'Aria Pratama',
    ketuaNpm: '2110511042',
    judulLomba: 'Gemastik XIX 2026 - Divisi Pengembangan Perangkat Lunak',
    penyelenggara: 'Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek',
    tingkat: 'Nasional',
    kategori: 'Inovasi Teknologi / Hackathon',
    tanggalDeadline: '2026-11-20',
    biayaPendaftaran: 250000,
    targetJuara: 'Juara 1 & Medali Emas Divisi Software Development',
    dosenPembimbingId: 'dsn_1',
    dosenPembimbingNama: 'Dr. Ir. Hendra Wijaya, M.Kom',
    status: 'menunggu_review_dosen',
    catatanDosen: 'Proposal sudah masuk, sedang ditinjau arsitektur sistem dan kesiapan berkas anggota tim.',
    createdAt: '2026-09-29'
  },
  {
    id: 'lomba_002',
    ketuaId: 'mhs_1',
    ketuaNama: 'Aria Pratama',
    ketuaNpm: '2110511042',
    judulLomba: 'ASEAN Cyber Defense & Blockchain Summit Challenge 2026',
    penyelenggara: 'Singapore Cybersecurity Consortium & CyberSG',
    tingkat: 'Internasional',
    kategori: 'Inovasi Teknologi / Hackathon',
    tanggalDeadline: '2026-12-15',
    biayaPendaftaran: 1500000,
    targetJuara: 'Top 3 Finalist ASEAN Level',
    dosenPembimbingId: 'dsn_1',
    dosenPembimbingNama: 'Dr. Ir. Hendra Wijaya, M.Kom',
    status: 'disetujui_wadir3',
    catatanDosen: 'Ide sangat inovatif dan relevan dengan fokus riset kampus. Direkomendasikan penuh pendanaan.',
    catatanWadir3: 'Disetujui untuk delegasi resmi universitas. Subsidi dana pendaftaran dan akomodasi Rp 12.500.000 dicairkan.',
    createdAt: '2026-09-10'
  }
];

export const INITIAL_MEMBERS: LombaMember[] = [
  {
    id: 'mem_1',
    pengajuanId: 'lomba_001',
    mahasiswaId: 'mhs_1',
    npm: '2110511042',
    nama: 'Aria Pratama',
    prodi: 'S1 Teknik Informatika',
    roleTim: 'Ketua',
    statusAcc: 'accepted',
    updatedAt: '2026-09-29 11:00 WIB'
  },
  {
    id: 'mem_2',
    pengajuanId: 'lomba_001',
    mahasiswaId: 'mhs_2',
    npm: '2110511088',
    nama: 'Citra Lestari',
    prodi: 'S1 Sistem Informasi',
    roleTim: 'Anggota',
    statusAcc: 'pending', // Pending notification for Citra to ACC / Reject!
    updatedAt: '2026-09-29 11:05 WIB'
  },
  {
    id: 'mem_3',
    pengajuanId: 'lomba_002',
    mahasiswaId: 'mhs_1',
    npm: '2110511042',
    nama: 'Aria Pratama',
    prodi: 'S1 Teknik Informatika',
    roleTim: 'Ketua',
    statusAcc: 'accepted',
    updatedAt: '2026-09-10 09:00 WIB'
  },
  {
    id: 'mem_4',
    pengajuanId: 'lomba_002',
    mahasiswaId: 'mhs_2',
    npm: '2110511088',
    nama: 'Citra Lestari',
    prodi: 'S1 Sistem Informasi',
    roleTim: 'Anggota',
    statusAcc: 'accepted',
    updatedAt: '2026-09-10 10:15 WIB'
  }
];

export const INITIAL_PROPOSALS: LombaProposal[] = [
  {
    id: 'prop_001',
    pengajuanId: 'lomba_001',
    fileName: 'Proposal_Gemastik2026_TimSatsetInovasi.pdf',
    fileSize: '3.4 MB',
    uploadedAt: '2026-09-29 11:30 WIB',
    version: 1,
    summary: 'Proposal pengembangan aplikasi Web3 terdistribusi untuk otomasi pelaporan dan verifikasi prestasi mahasiswa bereputasi tinggi.',
    fileUrl: '#'
  },
  {
    id: 'prop_002',
    pengajuanId: 'lomba_002',
    fileName: 'Delegasi_ASEAN_Cyber_Blockchain_Final.pdf',
    fileSize: '4.8 MB',
    uploadedAt: '2026-09-10 09:30 WIB',
    version: 2,
    summary: 'Proposal resmi delegasi lomba internasional ASEAN Cyber Defense & Blockchain 2026 beserta rincian RAB.',
    fileUrl: '#'
  }
];

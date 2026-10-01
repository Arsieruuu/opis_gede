export type UserRole = 'mahasiswa' | 'dosen' | 'prodi' | 'jurusan' | 'wadir3';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar: string;
  createdAt: string;
  satsetId?: string;
}

export interface MahasiswaProfile {
  id: string;
  userId: string;
  npm: string;
  prodi: string;
  jurusan: string;
  semester: number;
  ipk: number;
  satsetSyncStatus: 'synced' | 'pending' | 'syncing';
  lastSync: string;
  phone: string;
  bio: string;
  github?: string;
  linkedin?: string;
}

export interface DosenProfile {
  id: string;
  userId: string;
  nip: string;
  nidn: string;
  prodi: string;
  fakultas: string;
  ketersediaanVerifikasi: boolean;
  bidangKeahlian: string[];
  quotaBimbingan: number;
  activeBimbinganCount: number;
}

export interface ProdiProfile {
  id: string;
  userId: string;
  kodeProdi: string;
  namaProdi: string;
  fakultas: string;
  kaprodi: string;
}

export interface JurusanProfile {
  id: string;
  userId: string;
  kodeJurusan: string;
  namaJurusan: string;
  fakultas: string;
  kajur: string;
}

export interface Wadir3Profile {
  id: string;
  userId: string;
  nip: string;
  jabatan: string;
  skWadir: string;
  anggaranTersedia: number;
}

export interface StudentSkill {
  id: string;
  mahasiswaId: string;
  nama: string;
  kategori: 'Teknologi & Koding' | 'Desain & UI/UX' | 'Data & AI' | 'Softskill & Kepemimpinan' | 'Bahasa';
  percentage: number; // 0 - 100
  verifiedBySatset: boolean;
}

export interface StudentExperience {
  id: string;
  mahasiswaId: string;
  jenis: 'Prestasi Lomba' | 'Organisasi' | 'Proyek / Riset' | 'Magang & Sertifikasi';
  judul: string;
  penyelenggara: string;
  periode: string;
  pencapaian: string;
  deskripsi: string;
  linkBukti?: string;
}

export type LombaStatus =
  | 'draft'
  | 'menunggu_anggota'
  | 'menunggu_review_dosen'
  | 'revisi_dosen'
  | 'disetujui_dosen'
  | 'verifikasi_prodi'
  | 'disetujui_wadir3'
  | 'ditolak';

export interface LombaPengajuan {
  id: string;
  ketuaId: string;
  ketuaNama: string;
  ketuaNpm: string;
  judulLomba: string;
  penyelenggara: string;
  tingkat: 'Internasional' | 'Nasional' | 'Regional' | 'Provinsi';
  kategori: 'Karya Tulis Ilmiah' | 'Inovasi Teknologi / Hackathon' | 'UI/UX & Desain' | 'Robotika & IoT' | 'Bisnis Plan';
  tanggalDeadline: string;
  biayaPendaftaran: number;
  targetJuara: string;
  dosenPembimbingId: string;
  dosenPembimbingNama: string;
  status: LombaStatus;
  statusPelaporan?: LombaReportingStatus;
  catatanDosen?: string;
  catatanWadir3?: string;
  createdAt: string;
}

export interface LombaMember {
  id: string;
  pengajuanId: string;
  mahasiswaId: string;
  npm: string;
  nama: string;
  prodi: string;
  roleTim: 'Ketua' | 'Anggota';
  statusAcc: 'pending' | 'accepted' | 'rejected';
  updatedAt: string;
}

export interface LombaProposal {
  id: string;
  pengajuanId: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  version: number;
  summary: string;
  fileUrl?: string;
}

export type SuratJenis = 'Surat Tugas' | 'Surat Dispensasi';
export type SuratApprovalStatus = 'pending' | 'approved' | 'rejected';
export type SuratWorkflowStatus =
  | 'diajukan'
  | 'review_prodi'
  | 'administrasi_jurusan'
  | 'review_jurusan'
  | 'review_wadir3'
  | 'final_ready'
  | 'ditolak';

export interface SuratPengajuan {
  id: string;
  mahasiswaId: string;
  mahasiswaNama: string;
  npm: string;
  jenis: SuratJenis;
  tujuanKegiatan: string;
  penyelenggara: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: SuratWorkflowStatus;
  substansiStatus: SuratApprovalStatus;
  anggaranStatus: SuratApprovalStatus;
  isFinalReady: boolean;
  createdAt: string;
}

export interface SuratAnggaran {
  id: string;
  suratPengajuanId: string;
  item: string;
  nominal: number;
  keterangan?: string;
}

export interface SuratGeneratedFiles {
  id: string;
  suratPengajuanId: string;
  fileDraftGenerated?: string;
  fileFinalScanned?: string;
  generatedAt?: string;
  uploadedAt?: string;
}

export interface SuratApprovalHistory {
  id: string;
  suratPengajuanId: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  stage: 'prodi' | 'admin_jurusan' | 'jurusan' | 'wadir3';
  action: 'submitted' | 'approved' | 'rejected' | 'draft_generated' | 'final_uploaded';
  note: string;
  createdAt: string;
}

export type LombaReportingStatus = 'belum_dilaporkan' | 'menunggu_validasi' | 'selesai' | 'ditolak';

export interface LombaReport {
  id: string;
  pengajuanId: string;
  mahasiswaId: string;
  fileSertifikat: string;
  fileLaporan: string;
  ringkasan: string;
  statusPelaporan: LombaReportingStatus;
  catatanProdi?: string;
  submittedAt: string;
  validatedAt?: string;
}

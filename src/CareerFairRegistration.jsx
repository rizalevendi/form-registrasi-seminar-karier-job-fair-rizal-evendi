import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Validasi password dengan pesan error
const validasiPassword = (value) => {
  if (value.length < 8)
    return "Password harus 8+ karakter, mengandung angka & simbol";

  if (!/\d/.test(value))
    return "Password harus 8+ karakter, mengandung angka & simbol";

  if (!/[!@#$%^&*]/.test(value))
    return "Password harus 8+ karakter, mengandung angka & simbol";

  return true;
};

// Helper untuk validasi URL
const validasiUrl = (value) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return "Masukkan URL yang valid";
  }
};

// ===== KOMPONEN =====

const BagianHeader = ({ icon, title }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2.5 mb-3">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-slate-800 font-semibold text-xl tracking-tight">
        {title}
      </h2>
    </div>
    <div className="h-px w-full bg-gradient-to-r from-indigo-400 via-purple-400 to-transparent" />
  </div>
);

const PembungkusField = ({ label, icon, error, required, children, hint, colSpan }) => (
  <div className={colSpan || ""}>
    <label className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mb-2">
      {icon && <span className="text-indigo-500">{icon}</span>}
      {label}
      {required && <span className="text-rose-400 text-xs ml-0.5">*</span>}
    </label>
    {children}
    {hint && !error && (
      <p className="text-xs text-slate-400 mt-1.5">{hint}</p>
    )}
    {error && (
      <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
        <span className="text-rose-400">●</span> {error.message}
      </p>
    )}
  </div>
);


// Style input dengan efek 
const inputDasar =
  "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/60 transition-all duration-200 bg-white/80 hover:bg-white";

const KartuRadio = ({ value, label, register, name }) => (
  <label className="relative flex cursor-pointer">
    <input
      type="radio"
      value={value}
      {...register(name, { required: "Pilih bidang karier yang diminati" })}
      className="peer sr-only"
    />
    <div className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium transition-all duration-200 peer-checked:border-indigo-400 peer-checked:bg-indigo-50/60 peer-checked:text-indigo-700 hover:border-indigo-300 hover:bg-slate-50/50 cursor-pointer">
      <span className="text-base">{label.split(" ")[0]}</span>
      <span>{label.split(" ").slice(1).join(" ")}</span>
    </div>
  </label>
);

export default function PendaftaranCareerFair() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [namaTerkirim, setNamaTerkirim] = useState("");
  const [tampilkanPassword, setTampilkanPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const onSubmit = (data) => {
    console.log("=== PENDAFTARAN BERHASIL ===");
    console.log("Nama      :", data.namaLengkap);
    console.log("ID Mentee : Rizal Evendi - Reza Kurniawan");
    console.log("Data lengkap:", data);

    setNamaTerkirim(data.namaLengkap);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-blue-50/80 flex items-center justify-center p-4 md:p-8">
      {/* Elemen dekoratif background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      </div>


      {/* Toast Notifikasi */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isSubmitted
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-4 min-w-[320px]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-xl text-white">✓</span>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">
              Pendaftaran Berhasil!
            </p>
            <p className="text-slate-500 text-xs mt-0.5">
              {namaTerkirim} • Rizal Evendi (Reza Kurniawan)
            </p>
          </div>
        </div>
      </div>


      {/* Kartu Utama */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-900/10 border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-indigo-900/20 relative z-10">
        {/* Garis dekoratif atas */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />


        <div className="p-6 md:p-10">
          {/* Bagian Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 shadow-lg shadow-indigo-200 mb-6 relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <svg
                className="w-8 h-8 text-white relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Pendaftaran Career Fair
            </h1>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Ikuti acara karier terbesar tahun 2025. Isi formulir di bawah untuk mendapatkan tempatmu.
            </p>
          </div>


{/* form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
            {/* Bagian 1: Informasi Pribadi */}
            <div>
              <BagianHeader icon="✨" title="Informasi Pribadi" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <PembungkusField
                  label="Nama Lengkap"
                  icon="👤"
                  error={errors.namaLengkap}
                  required
                >
                  <input
                    {...register("namaLengkap", {
                      required: "Nama lengkap wajib diisi",
                    })}
                    className={inputDasar}
                  />
                </PembungkusField>
                <PembungkusField
                  label="Username"
                  icon="@"
                  error={errors.username}
                  required
                >
                  <input
                    {...register("username", {
                      required: "Username wajib diisi",
                      minLength: {
                        value: 6,
                        message: "Username minimal 6 karakter",
                      },
                      maxLength: {
                        value: 20,
                        message: "Username maksimal 20 karakter",
                      },
                    })}
                    className={inputDasar}

                  />
                </PembungkusField>
                <PembungkusField
                  label="Alamat Email"
                  icon="✉️"
                  error={errors.email}
                  required
                >
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email wajib diisi",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Masukkan alamat email yang valid",
                      },
                    })}
                    className={inputDasar}

                  />
                </PembungkusField>
              </div>
            </div>


            {/* Bagian 2: Keamanan Akun */}
            <div>
              <BagianHeader icon="🔒" title="Keamanan Akun" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <PembungkusField
                  label="Password"
                  icon="🔑"
                  error={errors.password}
                  required
                  hint="Min. 8 karakter dengan angka & karakter spesial"
                >
                  <div className="relative">
                    <input
                      type={tampilkanPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password wajib diisi",
                        validate: validasiPassword,
                      })}
                      className={`${inputDasar} pr-20`}
                      placeholder="Buat password yang kuat"
                    />
                    <button
                      type="button"
                      onClick={() => setTampilkanPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                      {tampilkanPassword ? "SEMBUNYIKAN" : "TAMPILKAN"}
                    </button>
                  </div>
                </PembungkusField>
                <PembungkusField
                  label="Usia"
                  icon="🎂"
                  error={errors.usia}
                  required
                >
                  <input
                    type="number"
                    {...register("usia", {
                      required: "Usia wajib diisi",
                      min: {
                        value: 18,
                        message: "Usia minimal 18 tahun",
                      },
                      max: {
                        value: 100,
                        message: "Usia maksimal 100 tahun",
                      },
                    })}
                    className={inputDasar}
                    placeholder="Peserta harus berusia antara 18-100 tahun"
                  />
                </PembungkusField>
              </div>
            </div>


            {/* Bagian 3: Detail Pendaftaran */}
            <div>
              <BagianHeader icon="🎫" title="Detail Pendaftaran" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <PembungkusField
                  label="Tipe Tiket"
                  icon="🎟️"
                  error={errors.tipeTiket}
                  required
                >
                  <select
                    {...register("tipeTiket", {
                      required: "Pilih tipe tiket",
                    })}
                    className={`${inputDasar} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-right-4`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih tipe tiket
                    </option>
                    <option value="visitor">👥 Visitor — Pengunjung Umum</option>
                    <option value="jobseeker">
                      💼 Job Seeker — Pencari Kerja
                    </option>
                    <option value="student">
                      🎓 Student — Mahasiswa/Pelajar
                    </option>
                    <option value="vip">⭐ VIP — Akses Premium + Seminar</option>
                  </select>
                </PembungkusField>
                <PembungkusField
                  label="Portofolio / LinkedIn"
                  icon="🔗"
                  error={errors.urlWebsite}
                  hint="Opsional — bagikan profil profesionalmu"
                >
                  <input
                    {...register("urlWebsite", { validate: validasiUrl })}
                    className={inputDasar}
                    placeholder="https://linkedin.com/in/username"
                  />
                </PembungkusField>
              </div>
            </div>


            {/* Bagian 4: Informasi Karier */}
            <div>
              <BagianHeader icon="🚀" title="Informasi Karier" />
              <div className="space-y-6">
                <PembungkusField
                  label="Bidang Karier yang Diminati"
                  icon="🎯"
                  error={errors.bidangKarier}
                  required
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {[
                      { value: "tech", label: "💻 Teknologi & IT" },
                      { value: "finance", label: "💰 Keuangan & Bisnis" },
                      { value: "creative", label: "🎨 Desain & Kreatif" },
                      { value: "marketing", label: "📣 Marketing & PR" },
                      { value: "engineering", label: "⚙️ Teknik" },
                      { value: "health", label: "🏥 Kesehatan & Medis" },
                    ].map((opt) => (
                      <KartuRadio
                        key={opt.value}
                        value={opt.value}
                        label={opt.label}
                        register={register}
                        name="bidangKarier"
                      />
                    ))}
                  </div>
                  {errors.bidangKarier && (
                    <p className="text-xs text-rose-500 mt-2">
                      {errors.bidangKarier.message}
                    </p>
                  )}
                </PembungkusField>

                <PembungkusField
                  label="Motivasi & Tujuan"
                  icon="💭"
                  error={errors.motivasi}
                  required
                >
                  <textarea
                    {...register("motivasi", {
                      required: "Tujuan wajib diisi",
                      minLength: {
                        value: 30,
                        message: "Minimal 30 karakter",
                      },
                    })}
                    rows={4}
                    className={`${inputDasar} resize-none`}
                    placeholder="Apa tujuanmu mengikuti Career Fair ini? Kesempatan apa yang kamu cari?..."
                  />
                </PembungkusField>
              </div>
            </div>


            {/* Syarat & Ketentuan */}
            <div className="bg-indigo-50/40 rounded-2xl p-5 border border-indigo-100/50">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("setujuSyarat", {
                    required: "Kamu harus menyetujui syarat dan ketentuan",
                  })}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-200 focus:ring-2 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-600 leading-relaxed">
                  Saya menyetujui{" "}
                  <span className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                    Syarat dan Ketentuan
                  </span>{" "}
                  Career Fair 2026, dan mengonfirmasi kehadiran saya untuk
                  seluruh rangkaian acara.
                </span>
              </label>
              {errors.setujuSyarat && (
                <p className="text-xs text-rose-500 mt-2 ml-7">
                  {errors.setujuSyarat.message}
                </p>
              )}
            </div>


            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white font-medium text-sm tracking-wide transition-all duration-300 shadow-md shadow-indigo-200/50 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  Daftar Sekarang
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-slate-300 text-xs">
              © 2026 Career Fair · Data kamu aman bersama kami
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
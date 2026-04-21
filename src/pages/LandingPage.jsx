import React, { useState, useEffect } from "react";
import "../css/LandingPage.css";

const LandingPage = () => {
  const [count, setCount] = useState({ users: 0, games: 0, learners: 0 });

  useEffect(() => {
    const targets = { users: 24800, games: 312000, learners: 9600 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount({
        users: Math.floor(targets.users * ease),
        games: Math.floor(targets.games * ease),
        learners: Math.floor(targets.learners * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: "➕", title: "Petualangan Penjumlahan", desc: "Jelajahi dunia angka dengan latihan penjumlahan yang seru dan penuh hadiah!", color: "#FFD6E0" },
    { icon: "➖", title: "Misi Pengurangan", desc: "Ikuti perjalanan seru untuk menguasai pengurangan lewat mini game interaktif.", color: "#D6F0FF" },
    { icon: "✖️", title: "Misi Perkalian", desc: "Tingkatkan skill kamu dengan tantangan perkalian yang seru dan penuh reward.", color: "#D6FFE8" },
    { icon: "🛒", title: "Simulator Belanja", desc: "Latih matematika kehidupan nyata dengan menjalankan toko virtualmu sendiri!", color: "#FFF3D6" },
    { icon: "🔢", title: "Ninja Angka", desc: "Asah kecepatan berhitung dengan tantangan cepat dan combo menarik.", color: "#EDD6FF" },
    { icon: "📐", title: "Eksplorasi Bentuk", desc: "Pelajari geometri lewat aktivitas bentuk yang interaktif dan berwarna.", color: "#FFE8D6" },
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Orang tua murid kelas 2", quote: "Anak saya sekarang malah minta waktu belajar matematika! MathingLearning bikin belajar terasa seperti bermain.", avatar: "👩", stars: 5 },
    { name: "Jake", role: "Siswa 9 tahun", quote: "Game belanjanya seru banget! Sekarang aku bisa bantu ibu hitung uang di toko 😄", avatar: "👦", stars: 5 },
    { name: "Pak Torres", role: "Guru kelas 3", quote: "Saya rekomendasikan MathingLearning ke semua murid saya. Fitur timer sangat membantu meningkatkan kecepatan berhitung.", avatar: "👨‍🏫", stars: 5 },
  ];

  return (
    <div className="landing">
      
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-blob blob-1" />
        <div className="hero-bg-blob blob-2" />
        <div className="hero-bg-blob blob-3" />

        <div className="hero-content">
          <div className="hero-badge">✨ Platform Matematika #1 untuk Anak</div>
          <h1 className="hero-title">
            Selamat Datang di<br />
            <span className="hero-title-accent">MathingLearning</span> 🚀
          </h1>
          <p className="hero-subtitle">
            Ubah rasa takut matematika jadi menyenangkan! Game dan tantangan kami membuat belajar angka jadi aktivitas favorit anak.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Mulai Belajar 🎮</button>
            <button className="btn btn-ghost">Lihat Demo 🎬</button>
          </div>
          <div className="hero-trust">
            <span className="trust-avatars">👧👦🧒👩‍🦱👦🏽</span>
            <span className="trust-text">Dipakai oleh <strong>24,800+</strong> anak</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="clay-card hero-card main-card floating-slow">
            <div className="hero-card-emoji">🏆</div>
            <p className="hero-card-label">Tantangan Harian</p>
            <div className="math-problem">
              <span className="math-num">48</span>
              <span className="math-op">×</span>
              <span className="math-num">7</span>
              <span className="math-op">=</span>
              <span className="math-answer">?</span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: "72%" }} />
            </div>
            <p className="progress-label">72% Selesai</p>
          </div>

          <div className="clay-card hero-card side-card card-top floating-medium">
            <span className="side-card-icon">⭐</span>
            <p className="side-card-val">1,240</p>
            <p className="side-card-sub">Poin Didapat</p>
          </div>

          <div className="clay-card hero-card side-card card-bottom floating-fast">
            <span className="side-card-icon">🔥</span>
            <p className="side-card-val">14 Hari</p>
            <p className="side-card-sub">Streak</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-header">
          <div className="section-tag">🎯 Aktivitas</div>
          <h2 className="section-title">Jelajahi Tantangan Seru</h2>
          <p className="section-subtitle">Berbagai mode permainan untuk meningkatkan skill matematika anak.</p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="clay-card feature-card" key={i} style={{ "--card-bg": f.color }}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats" id="stats">
        <div className="stats-inner">
          <div className="section-header light-header">
            <div className="section-tag tag-light">📊 Statistik</div>
            <h2 className="section-title">Dipercaya Banyak Pengguna</h2>
          </div>

          <div className="stats-grid">
            <div className="clay-card stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{count.users.toLocaleString()}+</div>
              <div className="stat-label">Pengguna Aktif</div>
            </div>

            <div className="clay-card stat-card stat-card-accent">
              <div className="stat-icon">🎮</div>
              <div className="stat-value">{count.games.toLocaleString()}+</div>
              <div className="stat-label">Game Dimainkan</div>
            </div>

            <div className="clay-card stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-value">{count.learners.toLocaleString()}+</div>
              <div className="stat-label">Sekolah Bergabung</div>
            </div>

            <div className="clay-card stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">4.9/5</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMER */}
      <section className="timer-section">
        <div className="timer-inner">
          <div className="timer-text">
            <div className="section-tag">⏱️ Pengaturan Waktu</div>
            <h2 className="section-title">Atur Kecepatanmu Sendiri</h2>
            <p className="section-subtitle">
              Setiap anak belajar dengan cara berbeda. Kamu bisa mengatur waktu dari <strong>5 detik</strong> sampai <strong>30 detik</strong> per soal.
            </p>
            <ul className="timer-perks">
              <li>⚡ Timer fleksibel</li>
              <li>🧘 Mode santai tanpa batas waktu</li>
              <li>📈 Menyesuaikan kemampuan</li>
              <li>🏅 Bonus poin jika cepat</li>
            </ul>
            <button className="btn btn-primary">Atur Timer 🕐</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Siap Jadi Jago Matematika?</h2>
          <p className="cta-subtitle">Gabung sekarang dan mulai belajar dengan cara yang menyenangkan.</p>
          <div className="cta-actions">
            <button className="btn btn-cta-primary">Daftar Gratis 🎮</button>
            <button className="btn btn-cta-ghost">Masuk →</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonials">
        <div className="section-header">
          <div className="section-tag">💬 Testimoni</div>
          <h2 className="section-title">Apa Kata Mereka?</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="clay-card testimonial-card" key={i}>
              <div className="stars">{"⭐".repeat(t.stars)}</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <span className="author-avatar">{t.avatar}</span>
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <div className="section-header">
          <div className="section-tag">📬 Kontak</div>
          <h2 className="section-title">Hubungi Kami</h2>
        </div>

        <div className="contact-grid">
          <div className="clay-card contact-card">
            <span className="contact-icon">📧</span>
            <h4>Email</h4>
            <p>hello@mathinglearning.com</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-icon">🧮</span>
            <span className="brand-name">MathingLearning</span>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} MathingLearning.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
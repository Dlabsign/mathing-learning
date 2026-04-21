import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
    const navigate = useNavigate();
    const userName = user.displayName || user.email.split('@')[0];

    return (
        <>

            <div id="hero-screen" className="screen active">
                <div className="blob-decor blob1" />
                <div className="blob-decor blob2" />
                <div className="blob-decor blob3" />
                <div className="blob-decor blob4" />

                <div className="hero-card">
                    <span className="sparkle sp1">✦</span>
                    <span className="sparkle sp2">✦</span>
                    <span className="sparkle sp3">✦</span>
                    <span className="sparkle sp4">✦</span>

                    <div className="star-badge">🌟</div>

                    <h1 className="hero-title">
                        Halo, <span className="name-gradient">{userName}</span>!
                    </h1>

                    <p className="hero-desc">
                        Siap jadi superstar matematika?<br />
                        Pilih permainan & kalahkan waktu!
                    </p>

                    <div className="badges-grid">
                        <div className="clay-badge badge-blue">
                            <span className="badge-icon">➕</span> Penjumlahan
                        </div>
                        <div className="clay-badge badge-green">
                            <span className="badge-icon">➖</span> Pengurangan
                        </div>
                        <div className="clay-badge badge-orange">
                            <span className="badge-icon">✖️</span> Perkalian
                        </div>
                        <div className="clay-badge badge-pink">
                            <span className="badge-icon">🛒</span> Belanja
                        </div>
                    </div>

                    <div className="btn-row">
                        <button className="clay-btn-main" onClick={() => navigate('/menu')}>
                            🎮 Mulai Belajar!
                        </button>
                        <button className="clay-btn-sec" onClick={() => navigate('/profile')}>
                            👤 Profil & Riwayat
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
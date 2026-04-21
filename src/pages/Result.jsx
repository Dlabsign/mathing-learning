import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total, correct, wrong, avgTime } = location.state || { score: 0, total: 10, correct: 0, wrong: 0, avgTime: 0 };

    const pct = Math.round((score / total) * 100);
    let trophy = '🏆', title = 'Luar Biasa!', msg = 'Kamu hebat sekali! Pertahankan performa ini!';

    if (pct < 50) { 
        trophy = '💪'; 
        title = 'Semangat!'; 
        msg = 'Terus berlatih ya, kamu pasti bisa menjadi lebih baik!'; 
    }
    else if (pct < 80) { 
        trophy = '🌟'; 
        title = 'Bagus!'; 
        msg = 'Kamu semakin jago matematika! Tingkatkan lagi!'; 
    }

    return (
        <div id="results-screen">
            {/* Dekorasi Background */}
            <div className="blob-decor blob1" />
            <div className="blob-decor blob2" />
            <div className="blob-decor blob3" />
            <div className="blob-decor blob4" />

            <div className="results-box">
                {/* Efek Bintang di pojok card */}
                <span className="sparkle sp1">✦</span>
                <span className="sparkle sp2">✦</span>

                <div className="results-content-grid">
                    {/* Panel Kiri: Bintang & Skor */}
                    <div className="results-left">
                        <span className="results-trophy">{trophy}</span>
                        <h1 className="results-title">{title}</h1>
                        <div className="results-score"><span>{score}</span>/<span>{total}</span></div>
                    </div>

                    {/* Panel Kanan: Penjelasan & Tombol */}
                    <div className="results-right">
                        <p className="results-sub">{msg}</p>

                        <div className="results-stats">
                            <div className="stat-card">
                                <div className="stat-num text-green">{correct}</div>
                                <div className="stat-label">Benar</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num text-red">{wrong}</div>
                                <div className="stat-label">Salah</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num text-blue">{avgTime}s</div>
                                <div className="stat-label">Rata-rata</div>
                            </div>
                        </div>

                        <button className="btn-results-main" onClick={() => navigate('/menu')}>
                            Main Lagi 🎮
                        </button>
                        
                        <div className="or-divider">— atau —</div>
                        
                        <button className="btn-results-sec" onClick={() => navigate('/')}>
                            Kembali ke Home 🏠
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
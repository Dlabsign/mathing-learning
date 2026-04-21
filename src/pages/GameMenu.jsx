import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '../../data'; // Pastikan path import ini sesuai (../data atau ../utils/data)
import '../css/GameMenu.css'; // Import file CSS khusus untuk Game Menu

const GameMenu = () => {
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [selectedGame, setSelectedGame] = useState(null);
    const [timer, setTimer] = useState(20);
    const navigate = useNavigate();

    const filteredGames = GAMES.filter(game => game.level === selectedLevel);

    const handleStart = () => {
        if (selectedGame) {
            navigate('/play', { state: { gameType: selectedGame, timeLimit: timer } });
        }
    };

    return (
        // Menggunakan class 'screen active' agar animasi transisi tetap berjalan
        <div id="menu-screen" className="screen active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Dekorasi Background */}
            <div className="blob-decor blob1" />
            <div className="blob-decor blob2" />
            <div className="blob-decor blob3" />
            <div className="blob-decor blob4" />

            {/* Tambahan class 'clay-card' untuk base background putih dan radius */}
            <div className="clay-card menu-card" style={{ padding: '32px' }}>
                
                {/* Efek Bintang */}
                <span className="sparkle sp1">✦</span>
                <span className="sparkle sp2">✦</span>

                <div className="menu-split">
                    
                    {/* PANEL KIRI: Pilihan Game */}
                    <div className="menu-left">
                        <h2 className="menu-title">Pilih Permainan 🎮</h2>
                        <p className="menu-sub">Pilih topik yang ingin kamu mainkan</p>

                        {/* Selector Level */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                            <button 
                                className={`clay-btn ${selectedLevel === 1 ? 'clay-btn-primary' : 'clay-btn-gray'}`}
                                style={{ flex: 1, padding: '12px', borderRadius: '16px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
                                onClick={() => { setSelectedLevel(1); setSelectedGame(null); }}
                            >
                                Level 1: Dasar
                            </button>
                            <button 
                                className={`clay-btn ${selectedLevel === 2 ? 'clay-btn-purple' : 'clay-btn-gray'}`}
                                style={{ flex: 1, padding: '12px', borderRadius: '16px', fontWeight: '800', border: 'none', cursor: 'pointer', color: selectedLevel === 2 ? '#fff' : 'var(--text-dark)' }}
                                onClick={() => { setSelectedLevel(2); setSelectedGame(null); }}
                            >
                                Level 2: Tantangan ⚡
                            </button>
                        </div>

                        <div className="game-grid">
                            {filteredGames.map((g) => {
                                const isSelected = selectedGame === g.id;
                                return (
                                    <div
                                        key={g.id}
                                        className={`game-card ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setSelectedGame(g.id)}
                                        style={{
                                            borderColor: isSelected ? g.accent : 'transparent',
                                            backgroundColor: isSelected ? g.color : '#FFFFFF'
                                        }}
                                    >
                                        <span className="game-card-icon">{g.icon}</span>
                                        <h3 className="game-card-title">{g.title}</h3>
                                        <p className="game-card-desc">{g.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* PANEL KANAN: Pengaturan Timer & Tombol Mulai */}
                    <div className="menu-right">
                        <div className="timer-config">
                            <h3>⏱ Waktu per Soal</h3>
                            <p>Berapa detik waktu yang kamu butuhkan?</p>
                            
                            <div className="timer-row">
                                <span className="timer-label">10s</span>
                                <input
                                    type="range"
                                    className="timer-slider"
                                    min="10"
                                    max="30"
                                    step="5"
                                    value={timer}
                                    onChange={(e) => setTimer(parseInt(e.target.value))}
                                />
                                <span className="timer-label">30s</span>
                            </div>
                            
                            {/* Memisahkan timer-val agar posisinya rapi di bawah slider */}
                            <div style={{ marginTop: '20px' }}>
                                <span className="timer-val">{timer}s</span>
                            </div>
                        </div>

                        {/* Tombol dengan class CSS khusus dari kamu (.clay-btn-success) */}
                        <button
                            className="clay-btn-success"
                            disabled={!selectedGame}
                            onClick={handleStart}
                        >
                            Mulai Main! ✨
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GameMenu;
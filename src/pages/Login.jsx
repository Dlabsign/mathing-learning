import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import '../css/Login.css'; // Import file CSS khusus login



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Arahkan ke home setelah berhasil login
        } catch (err) {
            setError('Email atau password salah! Coba lagi ya.');
        }
    };

    const fillDemo = () => {
        setEmail('demo@mathinglearning.com');
        setPassword('demo123');
    };

    return (
        <>
            <div id="login-screen">
                {/* Dekorasi Blob Global (Hanya visual jika dipanggil dari luar) */}
                <div className="blob-decor blob1" />
                <div className="blob-decor blob2" />
                <div className="blob-decor blob3" />
                <div className="blob-decor blob4" />

                <div className="login-box-split">
                    {/* Bintang Kerlip */}
                    <span className="sparkle sp1">✦</span>
                    <span className="parkle sp2">✦</span>

                    <div className="login-grid">

                        {/* PANEL KIRI: Informasi */}
                        <div className="login-left">
                            <div className="login-logo">🧮</div>
                            <h1 className="login-title">MathingLearning</h1>
                            <p className="login-subtitle">✨ Matematika jadi ajaib! ✨</p>

                            <div className="login-illustration-text">
                                🚀 Masuk sekarang dan kalahkan rekor waktumu di setiap permainan!
                            </div>
                        </div>

                        {/* PANEL KANAN: Form Login */}
                        <div className="login-right">
                            {error && <div className="login-error">{error}</div>}

                            <form onSubmit={handleLogin}>
                                <div className="field-group">
                                    <label className="field-label">Email</label>
                                    <input
                                        className="field-input"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="kamu@contoh.com"
                                        required
                                    />
                                </div>
                                <div className="field-group">
                                    <label className="field-label">Password</label>
                                    <input
                                        className="field-input"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <button type="submit" className="clay-btn-primary">
                                    Ayo Mulai! 🚀
                                </button>
                            </form>

                            <p className="login-demo">
                                Mau coba? Klik: <span onClick={fillDemo} className="link-highlight">Gunakan akun demo</span>
                            </p>

                            <p className="login-demo" style={{ marginTop: '8px' }}>
                                Belum punya akun? <Link to="/register" className="link-highlight">Daftar di sini</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
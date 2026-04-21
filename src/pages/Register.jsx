import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// Import EmailJS untuk mengirim email
import emailjs from '@emailjs/browser';
import '../css/Login.css'; // Import file CSS khusus login

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // 1. Buat akun di Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Simpan nama ke profil pengguna
            await updateProfile(user, { displayName: name });

            // 3. Kirim email sambutan via EmailJS
            sendWelcomeEmail(name, email);

            // 4. Arahkan ke halaman utama
            navigate('/');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Email sudah terdaftar. Gunakan email lain ya!');
            } else {
                setError('Gagal mendaftar. Pastikan data benar!');
            }
        }
    };

    const sendWelcomeEmail = (userName, userEmail) => {
        // Parameter yang akan dikirim ke template EmailJS
        const templateParams = {
            to_name: userName,
            to_email: userEmail,
            message: "Selamat bergabung pada mathing learning! Mari jadi juara matematika bersama kami."
        };

        // Ganti dengan Service ID, Template ID, dan Public Key dari akun EmailJS kamu
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
            .then((response) => {
                console.log('Email berhasil dikirim!', response.status, response.text);
            }, (err) => {
                console.error('Gagal mengirim email...', err);
            });
    };

    return (
        <>
          

            <div id="register-screen">
                {/* Dekorasi Blob */}
                <div className="blob-decor blob1" />
                <div className="blob-decor blob2" />
                <div className="blob-decor blob3" />
                <div className="blob-decor blob4" />

                <div className="register-box-split">
                    {/* Bintang Kerlip */}
                    <span className="sparkle sp1">✦</span>
                    <span className="sparkle sp2">✦</span>

                    <div className="register-grid">
                        
                        {/* PANEL KIRI: Informasi */}
                        <div className="register-left">
                            <div className="register-logo">🎒</div>
                            <h1 className="register-title">Daftar Akun Baru</h1>
                            <p className="register-subtitle">Bergabung dengan petualangan angka! ✨</p>
                            
                            <div className="register-illustration-text">
                                🌟 Ayo buat akunmu sekarang dan jadilah juara matematika bersama kami!
                            </div>
                        </div>

                        {/* PANEL KANAN: Form Register */}
                        <div className="register-right">
                            {error && <div className="register-error">{error}</div>}

                            <form onSubmit={handleRegister}>
                                <div className="field-group">
                                    <label className="field-label">Nama Lengkap</label>
                                    <input
                                        className="field-input"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Siapa namamu?"
                                        required
                                    />
                                </div>
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
                                        placeholder="Minimal 6 karakter"
                                        required
                                    />
                                </div>
                                <button type="submit" className="clay-btn-orange">
                                    Daftar Sekarang 🚀
                                </button>
                            </form>
                            
                            <p className="register-demo">
                                Sudah punya akun? <Link to="/login" className="link-highlight-orange">Masuk di sini</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
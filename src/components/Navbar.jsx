import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState('id'); // State untuk bahasa ('id' atau 'en')
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Gagal logout:", error);
        }
    };

    const isActive = (path) => location.pathname === path;

    // Fungsi untuk mengubah bahasa
    const toggleLanguage = () => {
        setLang((prev) => (prev === 'id' ? 'en' : 'id'));
    };

    // Dictionary untuk teks dalam dua bahasa
    const text = {
        id: {
            home: "Beranda",
            main: "Main 🎮",
            profile: "Profil 👤",
            logout: "Keluar 🚪",
            login: "Masuk ✨",
        },
        en: {
            home: "Home",
            main: "Play 🎮",
            profile: "Profile 👤",
            logout: "Logout 🚪",
            login: "Login ✨",
        }
    };

    // Mengambil terjemahan aktif
    const t = text[lang];

    return (
        <>
            <style>{`
                .nav-wrapper {
                    position: fixed;
                    top: 16px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: calc(100% - 48px);
                    max-width: 1000px;
                    z-index: 1000;
                    transition: all 0.3s ease;
                }

                .nav-glass {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-radius: 24px;
                    border: 2px solid rgba(255, 255, 255, 0.9);
                    box-shadow: 0 8px 32px rgba(180, 150, 255, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.8);
                    padding: 12px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nav-brand {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                }

                .nav-brand-icon {
                    background: linear-gradient(145deg, #FFE566, #FFCA28);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 10px rgba(255,180,0,0.2), inset 0 2px 0 rgba(255,255,255,0.6);
                }

                .nav-brand-text {
                    font-family: 'Nunito', sans-serif;
                    font-weight: 900;
                    font-size: 20px;
                    color: #3D2C8D;
                    letter-spacing: -0.5px;
                }

                .nav-menu {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .nav-link {
                    text-decoration: none;
                    font-family: 'Nunito', sans-serif;
                    font-weight: 800;
                    font-size: 15px;
                    color: #7A6B8A;
                    padding: 10px 18px;
                    border-radius: 16px;
                    transition: all 0.2s ease;
                }

                .nav-link:hover {
                    background: #F0F4FF;
                    color: #5A3FD8;
                }

                .nav-link.active {
                    background: #DDE8FF;
                    color: #2A4BB0;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
                }

                .nav-btn-logout {
                    background: linear-gradient(145deg, #f87171, #dc2626);
                    color: white;
                    font-family: 'Nunito', sans-serif;
                    font-weight: 800;
                    font-size: 15px;
                    padding: 10px 20px;
                    border-radius: 16px;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 0 #991b1b, 0 6px 12px rgba(220, 38, 38, 0.2);
                    transition: transform 0.1s, box-shadow 0.1s;
                }

                .nav-btn-logout:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 0 #991b1b, 0 8px 16px rgba(220, 38, 38, 0.3);
                }

                .nav-btn-logout:active {
                    transform: translateY(3px);
                    box-shadow: 0 1px 0 #991b1b;
                }

                /* Tombol Bahasa */
                .nav-btn-lang {
                    background: #F0F4FF;
                    color: #5A3FD8;
                    font-family: 'Nunito', sans-serif;
                    font-weight: 800;
                    font-size: 15px;
                    padding: 10px 16px;
                    border-radius: 16px;
                    border: 2px solid #DDE8FF;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .nav-btn-lang:hover {
                    background: #DDE8FF;
                    transform: translateY(-2px);
                }

                /* Mobile Toggle */
                .nav-toggle {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #3D2C8D;
                }

                @media (max-width: 768px) {
                    .nav-toggle { display: block; }
                    .nav-menu {
                        position: absolute;
                        top: 80px;
                        left: 0;
                        right: 0;
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(16px);
                        border-radius: 24px;
                        border: 2px solid rgba(255, 255, 255, 0.9);
                        box-shadow: 0 8px 32px rgba(180, 150, 255, 0.15);
                        flex-direction: column;
                        padding: 20px;
                        gap: 16px;
                        display: none;
                        transform-origin: top center;
                    }
                    .nav-menu.open {
                        display: flex;
                        animation: slideDown 0.3s ease-out;
                    }
                    .nav-link, .nav-btn-logout, .nav-btn-lang {
                        width: 100%;
                        text-align: center;
                    }
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px) scaleY(0.9); }
                    to { opacity: 1; transform: translateY(0) scaleY(1); }
                }
            `}</style>

            <div className="nav-wrapper">
                <nav className="nav-glass">
                    <Link to="/" className="nav-brand">
                        <img
                            src="/favicon.svg"
                            alt="logo"
                            className="nav-brand-icon"
                        />
                        <span className="nav-brand-text">MathingLearning</span>
                    </Link>

                    <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? '✖' : '☰'}
                    </button>

                    <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
                            {t.home}
                        </Link>
                        {user && (
                            <>
                                <Link to="/menu" className={`nav-link ${isActive('/menu') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
                                    {t.main}
                                </Link>
                                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
                                    {t.profile}
                                </Link>
                                <button className="nav-btn-logout" onClick={() => { setIsOpen(false); handleLogout(); }}>
                                    {t.logout}
                                </button>
                            </>
                        )}
                        {!user && (
                            <Link to="/login" className="nav-link active" style={{ background: 'var(--clay-light-purple)', color: 'white', boxShadow: '0 4px 0 var(--clay-purple)' }}>
                                {t.login}
                            </Link>
                        )}
                        
                        {/* Tombol Toggle Bahasa */}
                        <button className="nav-btn-lang" onClick={toggleLanguage}>
                            {lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
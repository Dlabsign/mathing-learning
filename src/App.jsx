import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Import Language Provider
import { LanguageProvider } from './context/LanguageContext'; // Sesuaikan path jika berbeda

// Import Pages & Components
import Login from './pages/Login';
import Home from './pages/Home';
import Menu from './pages/GameMenu';
import ActiveGame from './pages/ActiveGame';
import Register from './pages/Register';
import Result from './pages/Result';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './pages/LandingPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading...</div>;

  return (
    // Bungkus seluruh aplikasi dengan LanguageProvider agar state bahasa menjadi global
    <LanguageProvider>
      <BrowserRouter>
        {/* Navbar bisa menerima props user untuk menyesuaikan menu (misal: tombol Logout vs Login) */}
        <Navbar user={user} />

        <div className="content-wrapper">
          <Routes>
            {/* [DIPERBAIKI] Logika rute beranda digabung */}
            {/* Jika sudah login -> masuk Home. Jika belum -> masuk Hero (Landing Page) */}
            <Route path="/" element={user ? <Home user={user} /> : <Hero />} />

            {/* Autentikasi */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

            {/* Rute yang dilindungi (Protected Routes - Harus Login) */}
            <Route path="/menu" element={user ? <Menu /> : <Navigate to="/login" />} />
            <Route path="/play" element={user ? <ActiveGame /> : <Navigate to="/login" />} />
            <Route path="/result" element={user ? <Result /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        {/* Jika Footer sudah siap digunakan, Anda bisa menghilangkan komentar di bawah ini */}
        {/* <Footer /> */}
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { updateProfile, updatePassword } from 'firebase/auth';
import '../css/Profile.css';

const Profile = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk navigasi sub-menu: 'history', 'editProfile', 'editPassword'
  const [activeTab, setActiveTab] = useState('history');

  // State untuk form edit
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.photoURL || '');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  // Pilihan Avatar
  const avatarOptions = [
    { id: 'male', label: 'Laki-laki 👨', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4' },
    { id: 'female', label: 'Perempuan 👩', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia&backgroundColor=ffdfbf' }
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "users", user.uid, "history"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHistory(data);
      } catch (error) {
        console.error("Gagal mengambil riwayat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const formatDate = (firebaseTimestamp) => {
    if (!firebaseTimestamp) return 'Baru saja';
    const date = firebaseTimestamp.toDate();
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: selectedAvatar
      });
      setMessage({ type: 'success', text: 'Profil berhasil diperbarui! 🎉' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal memperbarui profil: ' + error.message });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password minimal 6 karakter.' });
      return;
    }
    try {
      await updatePassword(user, newPassword);
      setMessage({ type: 'success', text: 'Password berhasil diubah! 🔒' });
      setNewPassword('');
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        setMessage({ type: 'error', text: 'Silakan logout dan login kembali untuk mengganti password.' });
      } else {
        setMessage({ type: 'error', text: 'Gagal mengubah password: ' + error.message });
      }
    }
  };

  return (
    <>


      <div id="profile-screen">
        {/* Dekorasi Background */}
        <div className="blob-decor blob1" />
        <div className="blob-decor blob2" />
        <div className="blob-decor blob3" />
        <div className="blob-decor blob4" />

        <div className="profile-card">
          {/* Bintang Kerlip */}
          <span className="sparkle sp1">✦</span>
          <span className="sparkle sp2">✦</span>

          <div className="profile-split">

            {/* PANEL KIRI: Sidebar */}
            <div className="profile-sidebar">
              <div className="profile-avatar-wrap">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" />
                ) : (
                  user?.displayName ? user.displayName.charAt(0).toUpperCase() : '👤'
                )}
              </div>
              <h2 className="profile-name">{user?.displayName || 'Pemain Hebat'}</h2>
              <p className="profile-email">{user?.email}</p>

              <div className="profile-tabs">
                <button
                  className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('history'); setMessage({ type: '', text: '' }); }}
                >
                  <span>📚</span> Riwayat
                </button>
                <button
                  className={`tab-btn ${activeTab === 'editProfile' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('editProfile'); setMessage({ type: '', text: '' }); }}
                >
                  <span>✏️</span> Profil
                </button>
                <button
                  className={`tab-btn ${activeTab === 'editPassword' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('editPassword'); setMessage({ type: '', text: '' }); }}
                >
                  <span>🔒</span> Password
                </button>
              </div>
            </div>

            {/* PANEL KANAN: Main Content */}
            <div className="profile-main">

              {/* Notifikasi */}
              {message.text && (
                <div className={`profile-alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                  {message.text}
                </div>
              )}

              {/* KONTEN: Riwayat */}
              {activeTab === 'history' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h3 className="history-title">Riwayat Belajarmu ✨</h3>
                  {loading ? (
                    <p style={{ textAlign: 'center', color: '#7A6B8A', fontWeight: 'bold', marginTop: '20px' }}>Memuat data ajaib... ⏳</p>
                  ) : history.length === 0 ? (
                    <div className="history-empty">
                      <span style={{ fontSize: '48px' }}>🌱</span>
                      <p style={{ color: '#7A6B8A', fontWeight: '700', marginTop: '12px' }}>Belum ada riwayat. Ayo mulai main!</p>
                    </div>
                  ) : (
                    <div className="history-list">
                      {history.map((item) => (
                        <div key={item.id} className="history-card">
                          <div>
                            <div className="history-type">{item.gameType}</div>
                            <div className="history-detail">
                              {formatDate(item.timestamp)} • Rata-rata: {item.avgTime}s
                            </div>
                          </div>
                          <div className={`history-score ${item.score >= 7 ? 'score-good' : 'score-avg'}`}>
                            {item.score}/{item.total}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* KONTEN: Edit Profil */}
              {activeTab === 'editProfile' && (
                <div>
                  <h3 className="history-title">Edit Profil 🎨</h3>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="field-group">
                      <label className="field-label">Nama Akun (Username)</label>
                      <input
                        className="field-input"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Masukkan nama baru"
                        required
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Pilih Avatar Baru</label>
                      <div className="avatar-picker-grid">
                        {avatarOptions.map(avatar => (
                          <div
                            key={avatar.id}
                            className={`avatar-option ${selectedAvatar === avatar.url ? 'selected' : ''}`}
                            onClick={() => setSelectedAvatar(avatar.url)}
                          >
                            <img src={avatar.url} alt={avatar.label} />
                            <p>{avatar.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button type="submit" className="btn-submit">
                      Simpan Profil ✔️
                    </button>
                  </form>
                </div>
              )}

              {/* KONTEN: Edit Password */}
              {activeTab === 'editPassword' && (
                <div>
                  <h3 className="history-title">Ganti Password 🔑</h3>
                  <form onSubmit={handleUpdatePassword}>
                    <div className="field-group">
                      <label className="field-label">Password Baru</label>
                      <input
                        className="field-input"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-submit">
                      Simpan Password ✔️
                    </button>
                  </form>
                </div>
              )}


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
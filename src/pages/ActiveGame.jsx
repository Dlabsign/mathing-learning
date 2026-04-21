import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateQuestion } from '../utils/gameLogic';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ActiveGame = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { gameType, timeLimit } = location.state || { gameType: 'addition', timeLimit: 20 };

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timings, setTimings] = useState([]);

    useEffect(() => {
        if (gameType) {
            const generated = Array.from({ length: 10 }, () => generateQuestion(gameType));
            setQuestions(generated);
        }
    }, [gameType]);

    useEffect(() => {
        if (timeLeft <= 0 || selectedAnswer !== null) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, selectedAnswer]);

    const handleAnswer = (answer) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(answer);
        const currentQ = questions[currentIndex];
        const timeSpent = timeLimit - Math.max(0, timeLeft);
        
        setTimings((prev) => [...prev, timeSpent]);

        if (answer === currentQ.answer) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNext = async () => {
        if (currentIndex < questions.length - 1) {
            setSelectedAnswer(null);
            setTimeLeft(timeLimit);
            setCurrentIndex((prev) => prev + 1);
        } else {
            const wrong = 10 - score;
            const avgTime = timings.length ? Math.round(timings.reduce((a, b) => a + b, 0) / timings.length) : 0;

            try {
                if (auth.currentUser) {
                    await addDoc(collection(db, "users", auth.currentUser.uid, "history"), {
                        gameType: gameType,
                        score: score,
                        total: 10,
                        avgTime: avgTime,
                        timestamp: serverTimestamp()
                    });
                }
            } catch (error) {
                console.error("Gagal menyimpan riwayat:", error);
            }

            navigate('/result', {
                state: { score, total: 10, correct: score, wrong, avgTime }
            });
        }
    };

    if (!questions || questions.length === 0 || !questions[0]) {
        return <div id="game-screen"><h2 style={{textAlign: 'center', color: '#3D2C8D'}}>Menyiapkan soal ajaibmu... ✨</h2></div>;
    }

    const currentQ = questions[currentIndex];
    const isTimeUp = timeLeft <= 0 && selectedAnswer === null;
    const isAnswered = selectedAnswer !== null || isTimeUp;
    const progressPct = ((currentIndex) / questions.length) * 100;

    return (
        <div id="game-screen">
            {/* Dekorasi Latar */}
            <div className="blob-decor blob1" />
            <div className="blob-decor blob2" />
            <div className="blob-decor blob3" />
            <div className="blob-decor blob4" />

            <div className="game-container">
                {/* Class .split akan ditambahkan jika user sudah menjawab, membagi layout jadi 2 kolom */}
                <div className={`game-layout ${isAnswered ? 'split' : ''}`}>
                    
                    {/* PANEL KIRI: Soal & Jawaban */}
                    <div className="game-main-panel">
                        <div className="game-header">
                            <div className="score-pill">⭐ <span className="num">{score}</span></div>
                            
                            <div className="progress-bar-wrap">
                                <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
                            </div>

                            <div className="timer-ring-wrap">
                                <svg width="60" height="60" viewBox="0 0 60 60">
                                    <circle cx="30" cy="30" r="26" fill="none" stroke="#E8E5F2" strokeWidth="5" />
                                    <circle
                                        cx="30" cy="30" r="26" fill="none"
                                        stroke={timeLeft <= 5 ? '#ef4444' : '#5A3FD8'}
                                        strokeWidth="5"
                                        strokeDasharray="163.4"
                                        strokeDashoffset={163.4 * (1 - (timeLeft / timeLimit))}
                                        strokeLinecap="round" transform="rotate(-90 30 30)"
                                        style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                                    />
                                </svg>
                                <div className={`timer-ring-text ${timeLeft <= 5 ? 'urgent' : ''}`}>
                                    {timeLeft}
                                </div>
                            </div>
                        </div>

                        <div className="q-category">SOAL KE {currentIndex + 1}</div>
                        <div className="q-text" dangerouslySetInnerHTML={{ __html: currentQ.text.replace(/\n/g, '<br>') }} />

                        <div className="answer-grid">
                            {currentQ.options.map((opt, i) => {
                                let btnClass = "answer-btn";
                                if (isAnswered) {
                                    if (opt === currentQ.answer) btnClass += " correct-ans"; 
                                    else if (opt === selectedAnswer) btnClass += " wrong-ans"; 
                                }

                                return (
                                    <button
                                        key={i}
                                        className={btnClass}
                                        disabled={isAnswered}
                                        onClick={() => handleAnswer(opt)}
                                    >
                                        {currentQ.isShopping ? `$${opt.toFixed(2)}` : opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* PANEL KANAN: Penjelasan & Tombol Next (Muncul kalau sudah dijawab/waktu habis) */}
                    {isAnswered && (
                        <div className="game-side-panel">
                            <div className="explanation-box">
                                <h4>{selectedAnswer === currentQ.answer ? '✅ Kerja Bagus!' : '❌ Ops! Begini cara menghitungnya:'}</h4>
                                {currentQ.explanation.map((step, idx) => (
                                    <div key={idx} className="explanation-step">
                                        <div className="step-num">{idx + 1}</div>
                                        <span>{step.t}</span>
                                    </div>
                                ))}
                                <p className="explanation-detail">{currentQ.detail}</p>
                            </div>

                            <div className="next-btn-wrap">
                                <button className="clay-btn-primary" onClick={handleNext}>
                                    {currentIndex < questions.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil Akhir 🏆'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActiveGame;
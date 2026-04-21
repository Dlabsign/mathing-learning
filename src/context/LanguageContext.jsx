import React, { createContext, useState, useContext } from 'react';

// 1. Buat Context
const LanguageContext = createContext();

// 2. Buat Provider untuk membungkus aplikasi
export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('id'); // 'id' untuk Indonesia, 'en' untuk Inggris

    const toggleLang = () => {
        setLang((prevLang) => (prevLang === 'id' ? 'en' : 'id'));
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

// 3. Buat Custom Hook agar lebih mudah dipanggil di komponen lain
export const useLanguage = () => {
    return useContext(LanguageContext);
};
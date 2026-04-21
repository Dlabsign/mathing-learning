// File: src/utils/gameLogic.js

// ==========================================================================
// 1. FUNGSI BANTUAN (HELPERS)
// ==========================================================================

// Mendapatkan angka acak di antara min dan max
function r(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mengacak urutan array (untuk opsi jawaban agar posisinya selalu berubah)
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Fungsi untuk menghasilkan opsi unik agar tidak ada jawaban yang ganda/double
function generateUniqueOptions(correctAnswer, min = 1, max = 20) {
  const optionsSet = new Set();
  optionsSet.add(correctAnswer);

  // Terus mencari angka acak sampai kita punya tepat 4 angka unik di dalam Set
  while (optionsSet.size < 4) {
    let randomOffset = r(-5, 5); 
    if (randomOffset === 0) randomOffset = 1; // Jangan sampai offsetnya 0

    let newOption;
    // Jika jawaban desimal, buat pengecoh desimal juga
    if (correctAnswer % 1 !== 0) {
       newOption = parseFloat((correctAnswer + randomOffset * 0.5).toFixed(2));
    } else {
       newOption = correctAnswer + randomOffset;
    }

    // Pastikan angka tidak negatif (kecuali memang dibutuhkan)
    if (newOption >= 0) {
      optionsSet.add(newOption);
    } else {
      optionsSet.add(r(min, max));
    }
  }

  // Ubah Set kembali menjadi Array lalu acak posisinya
  return shuffle(Array.from(optionsSet));
}


// ==========================================================================
// 2. LOGIKA UTAMA PEMBUATAN SOAL
// ==========================================================================

export function generateQuestion(type) {
  
  // --- LEVEL 1 ---

  if (type === 'addition') {
    const a = r(1, 50), b = r(1, 50), ans = a + b;
    return {
      text: `${a} + ${b} = ?`,
      answer: ans,
      options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
      explanation: [
        { t: `Mulai dengan angka ${a}` },
        { t: `Hitung maju ${b} langkah` },
        { t: `${a} + ${b} = ${ans} ✓` }
      ],
      detail: `Penjumlahan berarti menggabungkan. ${a} + ${b} berarti kamu mulai dari ${a} dan menambahkan ${b} lagi.`
    };
  }

  if (type === 'subtraction') {
    const a = r(10, 60), b = r(1, a - 1), ans = a - b;
    return {
      text: `${a} − ${b} = ?`,
      answer: ans,
      options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
      explanation: [
        { t: `Mulai dengan angka ${a}` },
        { t: `Kurangi atau ambil ${b}` },
        { t: `${a} − ${b} = ${ans} ✓` }
      ],
      detail: `Pengurangan berarti mengambil sebagian. Kita mulai di angka ${a} lalu hitung mundur sebanyak ${b} langkah.`
    };
  }

  if (type === 'multiplication') {
    const a = r(1, 10), b = r(1, 10), ans = a * b;
    return {
      text: `${a} × ${b} = ?`,
      answer: ans,
      options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
      explanation: [
        { t: `Ada ${a} kelompok, masing-masing berisi ${b}` },
        { t: `Tambahkan angka ${b} sebanyak ${a} kali` },
        { t: `${a} × ${b} = ${ans} ✓` }
      ],
      detail: `Perkalian adalah cara cepat untuk menjumlahkan! ${a} × ${b} artinya menambahkan angka ${b} sebanyak ${a} kali: ${Array.from({ length: a }, () => b).join(' + ')} = ${ans}`
    };
  }

  if (type === 'shopping') {
    const prices = [0.50, 1.00, 1.50, 2.00, 2.50, 3.00, 3.50, 4.00, 4.50, 5.00];
    const price = prices[r(0, prices.length - 1)];
    const payOptions = [5, 10, 20].filter(p => p > price);
    const paid = payOptions[r(0, payOptions.length - 1)];
    const ans = parseFloat((paid - price).toFixed(2));
    return {
      text: `Harga barang $${price.toFixed(2)}\nKamu bayar $${paid.toFixed(2)}\nKembalian = ?`,
      answer: ans,
      options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
      explanation: [
        { t: `Harga barang: $${price.toFixed(2)}` },
        { t: `Uang yang dibayar: $${paid.toFixed(2)}` },
        { t: `Kembalian = $${paid} − $${price.toFixed(2)} = $${ans.toFixed(2)} ✓` }
      ],
      detail: `Untuk mencari kembalian, selalu kurangi uang yang kamu bayarkan dengan harga barang. $${paid} − $${price.toFixed(2)} = $${ans.toFixed(2)}`,
      isShopping: true
    };
  }


  // --- LEVEL 2 ---

  if (type === 'exponent_log') {
    const isLog = Math.random() > 0.5;
    if (!isLog) {
      const base = r(2, 5), exp = r(2, 4), ans = Math.pow(base, exp);
      return {
        text: `${base}<sup>${exp}</sup> = ?`,
        answer: ans,
        options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
        explanation: [{ t: `${base} pangkat ${exp} berarti ${base} dikali sebanyak ${exp} kali.` }, { t: `${Array(exp).fill(base).join(' × ')} = ${ans} ✓` }],
        detail: "Eksponen adalah perkalian berulang dari angka yang sama."
      };
    } else {
      const base = r(2, 5), ans = r(2, 4), val = Math.pow(base, ans);
      return {
        text: `<sup>${base}</sup>log(${val}) = ?`,
        answer: ans,
        options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
        explanation: [{ t: `Cari angka berapa: ${base} dipangkatkan ... menghasilkan ${val}?` }, { t: `${base}<sup>${ans}</sup> = ${val}, maka jawabannya ${ans} ✓` }],
        detail: "Logaritma adalah kebalikan dari eksponen."
      };
    }
  }

  if (type === 'functions') {
    const a = r(1, 5), b = r(1, 10), x = r(1, 5), ans = (a * x) + b;
    return {
      text: `f(x) = ${a}x + ${b}<br>Berapakah f(${x})?`,
      answer: ans,
      options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
      explanation: [{ t: `Ganti x dengan angka ${x}` }, { t: `f(${x}) = ${a}(${x}) + ${b}` }, { t: `${a * x} + ${b} = ${ans} ✓` }],
      detail: "Substitusi berarti memasukkan nilai x ke dalam rumus fungsi."
    };
  }

  if (type === 'trigonometry') {
    const questions = [
      { q: 'sin(30°)', a: 0.5, exp: 'Sin 30° adalah 1/2' },
      { q: 'cos(60°)', a: 0.5, exp: 'Cos 60° adalah 1/2' },
      { q: 'tan(45°)', a: 1, exp: 'Tan 45° adalah 1' },
      { q: 'sin(90°)', a: 1, exp: 'Sin 90° adalah 1' },
      { q: 'cos(90°)', a: 0, exp: 'Cos 90° adalah 0' }
    ];
    const pick = questions[r(0, questions.length - 1)];
    
    // Khusus trigonometri, kita gunakan nilai-nilai yang masuk akal di tabel sudut istimewa
    const trigOptions = new Set([pick.a]);
    const commonTrigValues = [0, 0.5, 0.86, 1, -0.5, -1];
    
    // Acak nilai umum dan masukkan ke Set sampai ada 4 opsi
    const shuffledCommon = shuffle(commonTrigValues);
    for (let val of shuffledCommon) {
      if (trigOptions.size < 4) trigOptions.add(val);
    }

    return {
      text: `${pick.q} = ?`,
      answer: pick.a,
      options: shuffle(Array.from(trigOptions)), // Opsi Trigonometri unik
      explanation: [{ t: pick.exp }],
      detail: "Trigonometri mempelajari hubungan sudut dan sisi pada segitiga."
    };
  }

  if (type === 'statistics') {
    const data = Array.from({ length: 5 }, () => r(1, 10)).sort((a, b) => a - b);
    const mode = Math.random() > 0.5; // Pilih tanya Mean atau Median
    
    if (mode) {
      const sum = data.reduce((a, b) => a + b, 0), ans = sum / 5;
      return {
        text: `Data: ${data.join(', ')}<br>Berapakah Mean (Rata-rata)?`,
        answer: ans,
        options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
        explanation: [{ t: `Jumlahkan semua data: ${sum}` }, { t: `Bagi dengan banyak data (5)` }, { t: `${sum} ÷ 5 = ${ans} ✓` }],
        detail: "Mean adalah nilai rata-rata dari seluruh kumpulan data."
      };
    } else {
      const ans = data[2]; // Nilai tengah dari 5 data
      return {
        text: `Data: ${data.join(', ')}<br>Berapakah Median (Nilai Tengah)?`,
        answer: ans,
        options: generateUniqueOptions(ans), // <-- Menggunakan fungsi unik
        explanation: [{ t: `Urutkan data: ${data.join(', ')}` }, { t: `Cari nilai yang ada di paling tengah: ${ans} ✓` }],
        detail: "Median adalah nilai tengah setelah data diurutkan."
      };
    }
  }
}
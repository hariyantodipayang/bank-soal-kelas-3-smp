import { useState } from 'react'

// Data awal contoh soal
const initialQuestions = [
  {
    id: 1,
    type: 'pilihan-ganda',
    subject: 'Matematika',
    topic: 'Aljabar',
    competency: '3.1 Memahami bentuk aljabar',
    level: 'HOTS',
    question: 'Jika x + y = 10 dan x - y = 4, berapakah nilai dari x² - y²?',
    options: ['24', '36', '40', '48'],
    correctAnswer: '40',
    discussion: 'x² - y² = (x + y)(x - y) = 10 × 4 = 40',
    points: 10
  },
  {
    id: 2,
    type: 'benar-salah',
    subject: 'IPA',
    topic: 'Sistem Pencernaan',
    competency: '3.2 Memahami sistem pencernaan manusia',
    level: 'AKM',
    question: 'Enzim ptialin berfungsi untuk mencerna protein di dalam mulut.',
    correctAnswer: false,
    discussion: 'Salah. Enzim ptialin berfungsi untuk mencerna karbohidrat (amilum) menjadi maltosa, bukan protein.',
    points: 5
  },
  {
    id: 3,
    type: 'menjodohkan',
    subject: 'Bahasa Indonesia',
    topic: 'Unsur Cerita',
    competency: '3.3 Mengidentifikasi unsur-unsur cerita pendek',
    level: 'Sedang',
    question: 'Pasangkan unsur cerita dengan definisi yang tepat!',
    leftItems: ['Tema', 'Alur', 'Tokoh', 'Latar'],
    rightItems: ['Ide pokok cerita', 'Urutan peristiwa', 'Pelaku dalam cerita', 'Tempat/waktu terjadinya cerita'],
    correctPairs: [0, 1, 2, 3],
    discussion: 'Tema adalah ide pokok, Alur adalah urutan peristiwa, Tokoh adalah pelaku, Latar adalah tempat/waktu',
    points: 15
  },
  {
    id: 4,
    type: 'isian',
    subject: 'IPS',
    topic: 'ASEAN',
    competency: '3.4 Memahami kerjasama negara-negara ASEAN',
    level: 'Mudah',
    question: 'Ibu kota negara Thailand adalah ________',
    correctAnswer: 'Bangkok',
    discussion: 'Bangkok adalah ibu kota negara Thailand sejak tahun 1782.',
    points: 5
  },
  {
    id: 5,
    type: 'uraian',
    subject: 'IPA',
    topic: 'Energi Terbarukan',
    competency: '4.1 Menyajikan karya tentang energi terbarukan',
    level: 'HOTS',
    question: 'Jelaskan kelebihan dan kekurangan energi surya dibandingkan dengan energi fosil! Berikan minimal 3 poin untuk masing-masing.',
    correctAnswer: '',
    rubric: [
      { criteria: 'Menjelaskan kelebihan energi surya', score: 30 },
      { criteria: 'Menjelaskan kekurangan energi surya', score: 30 },
      { criteria: 'Perbandingan dengan energi fosil', score: 20 },
      { criteria: 'Kelengkapan dan kejelasan jawaban', score: 20 }
    ],
    totalScore: 100,
    discussion: 'Kelebihan: ramah lingkungan, tidak terbatas, biaya operasional rendah. Kekurangan: tergantung cuaca, biaya instalasi tinggi, efisiensi masih terbatas.',
    points: 25
  },
  {
    id: 6,
    type: 'pilihan-ganda',
    subject: 'Bahasa Inggris',
    topic: 'Simple Past Tense',
    competency: '3.5 Menggunakan simple past tense',
    level: 'AKM',
    question: 'Yesterday, I ___ to the market with my mother.',
    options: ['go', 'went', 'gone', 'going'],
    correctAnswer: 'went',
    discussion: 'Kalimat menggunakan keterangan waktu "yesterday" (kemarin), sehingga menggunakan Simple Past Tense dengan verb 2 "went".',
    points: 10
  },
  {
    id: 7,
    type: 'pilihan-ganda-kompleks',
    subject: 'Matematika',
    topic: 'Geometri',
    competency: '3.6 Memahami bangun ruang sisi datar',
    level: 'HOTS',
    question: 'Manakah pernyataan yang benar tentang kubus? (Pilih lebih dari satu)',
    options: [
      'Memiliki 6 sisi yang berbentuk persegi',
      'Memiliki 8 titik sudut',
      'Memiliki 10 rusuk',
      'Semua rusuknya sama panjang'
    ],
    correctAnswers: [0, 1, 3],
    discussion: 'Kubus memiliki 6 sisi persegi, 8 titik sudut, 12 rusuk (bukan 10), dan semua rusuknya sama panjang.',
    points: 15
  }
]

const kisiKisiTemplate = {
  subject: '',
  grade: '9',
  semester: '1',
  academicYear: '2024/2025',
  items: []
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [questions, setQuestions] = useState(initialQuestions)
  const [kisiKisi, setKisiKisi] = useState(kisiKisiTemplate)
  const [filters, setFilters] = useState({
    type: '',
    subject: '',
    level: ''
  })

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    if (filters.type && q.type !== filters.type) return false
    if (filters.subject && q.subject !== filters.subject) return false
    if (filters.level && q.level !== filters.level) return false
    return true
  })

  // Statistics
  const stats = {
    total: questions.length,
    byType: {
      'pilihan-ganda': questions.filter(q => q.type === 'pilihan-ganda').length,
      'benar-salah': questions.filter(q => q.type === 'benar-salah').length,
      'menjodohkan': questions.filter(q => q.type === 'menjodohkan').length,
      'isian': questions.filter(q => q.type === 'isian').length,
      'uraian': questions.filter(q => q.type === 'uraian').length
    },
    byLevel: {
      'HOTS': questions.filter(q => q.level === 'HOTS').length,
      'AKM': questions.filter(q => q.level === 'AKM').length
    }
  }

  const getTypeLabel = (type) => {
    const labels = {
      'pilihan-ganda': 'Pilihan Ganda',
      'pilihan-ganda-kompleks': 'Pilihan Ganda Kompleks',
      'benar-salah': 'Benar-Salah',
      'menjodohkan': 'Menjodohkan',
      'isian': 'Isian',
      'uraian': 'Uraian'
    }
    return labels[type] || type
  }

  const renderDashboard = () => (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Soal</p>
        </div>
        <div className="stat-card">
          <h3>{stats.byLevel.HOTS}</h3>
          <p>Soal HOTS</p>
        </div>
        <div className="stat-card">
          <h3>{stats.byLevel.AKM}</h3>
          <p>Soal AKM</p>
        </div>
        <div className="stat-card">
          <h3>{Object.keys(stats.byType).length}</h3>
          <p>Jenis Soal</p>
        </div>
      </div>

      <div className="card">
        <h3>📊 Distribusi Jenis Soal</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '20px' }}>
          {Object.entries(stats.byType).map(([type, count]) => (
            <div key={type} style={{ background: '#e3f2fd', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '2em', color: '#1976d2' }}>{count}</h4>
              <p style={{ color: '#495057' }}>{getTypeLabel(type)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>📝 Soal Terbaru</h3>
        <div className="question-list">
          {questions.slice(0, 3).map(q => (
            <div key={q.id} className="question-item">
              <h4>{q.question}</h4>
              <div>
                <span className="badge badge-type">{getTypeLabel(q.type)}</span>
                <span className="badge badge-subject">{q.subject}</span>
                <span className="badge badge-level">{q.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderQuestionForm = () => (
    <div className="card">
      <h3>➕ Tambah Soal Baru</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newQuestion = {
          id: Date.now(),
          type: formData.get('type'),
          subject: formData.get('subject'),
          topic: formData.get('topic'),
          competency: formData.get('competency'),
          level: formData.get('level'),
          question: formData.get('question'),
          points: parseInt(formData.get('points')),
          discussion: formData.get('discussion')
        }

        if (newQuestion.type === 'pilihan-ganda' || newQuestion.type === 'pilihan-ganda-kompleks') {
          newQuestion.options = formData.get('options').split('\n').filter(o => o.trim())
          newQuestion.correctAnswer = newQuestion.type === 'pilihan-ganda-kompleks' 
            ? formData.get('correctAnswer').split(',').map(n => parseInt(n.trim()))
            : formData.get('correctAnswer')
        } else if (newQuestion.type === 'benar-salah') {
          newQuestion.correctAnswer = formData.get('correctAnswer') === 'true'
        } else if (newQuestion.type === 'menjodohkan') {
          newQuestion.leftItems = formData.get('leftItems').split('\n').filter(i => i.trim())
          newQuestion.rightItems = formData.get('rightItems').split('\n').filter(i => i.trim())
          newQuestion.correctPairs = formData.get('correctPairs').split(',').map(n => parseInt(n.trim()))
        } else if (newQuestion.type === 'isian' || newQuestion.type === 'uraian') {
          newQuestion.correctAnswer = formData.get('correctAnswer')
          if (newQuestion.type === 'uraian') {
            newQuestion.rubric = []
            newQuestion.totalScore = parseInt(formData.get('totalScore'))
          }
        }

        setQuestions([...questions, newQuestion])
        e.target.reset()
        alert('Soal berhasil ditambahkan!')
      }}>
        <div className="form-group">
          <label>Jenis Soal *</label>
          <select name="type" required>
            <option value="">Pilih jenis soal...</option>
            <option value="pilihan-ganda">Pilihan Ganda</option>
            <option value="pilihan-ganda-kompleks">Pilihan Ganda Kompleks</option>
            <option value="benar-salah">Benar-Salah</option>
            <option value="menjodohkan">Menjodohkan</option>
            <option value="isian">Isian</option>
            <option value="uraian">Uraian</option>
          </select>
        </div>

        <div className="filter-grid">
          <div className="form-group">
            <label>Mata Pelajaran *</label>
            <select name="subject" required>
              <option value="">Pilih...</option>
              <option value="Matematika">Matematika</option>
              <option value="IPA">IPA</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="IPS">IPS</option>
            </select>
          </div>

          <div className="form-group">
            <label>Topik *</label>
            <input type="text" name="topic" placeholder="Contoh: Aljabar" required />
          </div>

          <div className="form-group">
            <label>Kompetensi Dasar *</label>
            <input type="text" name="competency" placeholder="Contoh: 3.1 Memahami..." required />
          </div>

          <div className="form-group">
            <label>Level Kognitif *</label>
            <select name="level" required>
              <option value="">Pilih...</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sukar">Sukar</option>
              <option value="HOTS">HOTS (Higher Order Thinking Skills)</option>
              <option value="AKM">AKM (Asesmen Kompetensi Minimum)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Poin/Nilai *</label>
          <input type="number" name="points" placeholder="Contoh: 10" required />
        </div>

        <div className="form-group">
          <label>Pertanyaan *</label>
          <textarea name="question" placeholder="Tulis pertanyaan di sini..." required></textarea>
        </div>

        <div className="form-group">
          <label>Pilihan Jawaban (untuk Pilihan Ganda, satu per baris)</label>
          <textarea name="options" placeholder="Opsi A&#10;Opsi B&#10;Opsi C&#10;Opsi D"></textarea>
        </div>

        <div className="form-group">
          <label>Jawaban Benar *</label>
          <input type="text" name="correctAnswer" placeholder="Jawaban yang benar" required />
          <small style={{ color: '#6c757d', display: 'block', marginTop: '5px' }}>
            Untuk pilihan ganda kompleks, pisahkan nomor dengan koma (contoh: 0,1,3)
          </small>
        </div>

        <div className="form-group">
          <label>Pembahasan</label>
          <textarea name="discussion" placeholder="Penjelasan jawaban..."></textarea>
        </div>

        <button type="submit" className="btn btn-primary">💾 Simpan Soal</button>
        <button type="reset" className="btn btn-secondary">🔄 Reset</button>
      </form>
    </div>
  )

  const renderQuestionList = () => (
    <div>
      <div className="filter-section">
        <h3 style={{ marginBottom: '15px' }}>🔍 Filter Soal</h3>
        <div className="filter-grid">
          <div className="form-group">
            <label>Jenis Soal</label>
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option value="">Semua</option>
              <option value="pilihan-ganda">Pilihan Ganda</option>
              <option value="benar-salah">Benar-Salah</option>
              <option value="menjodohkan">Menjodohkan</option>
              <option value="isian">Isian</option>
              <option value="uraian">Uraian</option>
            </select>
          </div>

          <div className="form-group">
            <label>Mata Pelajaran</label>
            <select value={filters.subject} onChange={(e) => setFilters({...filters, subject: e.target.value})}>
              <option value="">Semua</option>
              <option value="Matematika">Matematika</option>
              <option value="IPA">IPA</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="IPS">IPS</option>
            </select>
          </div>

          <div className="form-group">
            <label>Level</label>
            <select value={filters.level} onChange={(e) => setFilters({...filters, level: e.target.value})}>
              <option value="">Semua</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sukar">Sukar</option>
              <option value="HOTS">HOTS</option>
              <option value="AKM">AKM</option>
            </select>
          </div>
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={() => setFilters({ type: '', subject: '', level: '' })}
        >
          🔄 Reset Filter
        </button>
      </div>

      <div className="question-list">
        {filteredQuestions.map(q => (
          <div key={q.id} className="question-item">
            <h4>{q.question}</h4>
            <div style={{ marginBottom: '15px' }}>
              <span className="badge badge-type">{getTypeLabel(q.type)}</span>
              <span className="badge badge-subject">{q.subject}</span>
              <span className="badge badge-level">{q.level}</span>
              <span className="badge" style={{ background: '#fce4ec', color: '#c2185b' }}>{q.points} poin</span>
            </div>

            {q.options && (
              <ul className="options-list">
                {q.options.map((opt, idx) => (
                  <li key={idx} className={
                    Array.isArray(q.correctAnswer) 
                      ? (q.correctAnswer.includes(idx) ? 'correct' : '')
                      : (opt === q.correctAnswer ? 'correct' : '')
                  }>
                    {String.fromCharCode(65 + idx)}. {opt}
                  </li>
                ))}
              </ul>
            )}

            {q.type === 'menjodohkan' && q.leftItems && (
              <div className="matching-pairs">
                <div className="matching-column">
                  <strong>Pernyataan:</strong>
                  {q.leftItems.map((item, idx) => (
                    <div key={idx} className="matching-item">{item}</div>
                  ))}
                </div>
                <div className="matching-column">
                  <strong>Jawaban:</strong>
                  {q.rightItems.map((item, idx) => (
                    <div key={idx} className="matching-item">{item}</div>
                  ))}
                </div>
              </div>
            )}

            {q.rubric && (
              <div style={{ marginTop: '15px' }}>
                <strong>Rubrik Penilaian:</strong>
                <table className="rubric-table">
                  <thead>
                    <tr>
                      <th>Kriteria</th>
                      <th>Skor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {q.rubric.map((r, idx) => (
                      <tr key={idx}>
                        <td>{r.criteria}</td>
                        <td>{r.score}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>{q.totalScore}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {q.discussion && (
              <div className="discussion-section">
                <strong>💡 Pembahasan:</strong>
                <p style={{ marginTop: '10px' }}>{q.discussion}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderKisiKisi = () => (
    <div className="card">
      <h3>📋 Kisi-Kisi Soal</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        setKisiKisi({
          subject: formData.get('subject'),
          grade: formData.get('grade'),
          semester: formData.get('semester'),
          academicYear: formData.get('academicYear'),
          items: kisiKisi.items
        })
        alert('Kisi-kisi berhasil disimpan!')
      }}>
        <div className="filter-grid">
          <div className="form-group">
            <label>Mata Pelajaran</label>
            <select name="subject" defaultValue={kisiKisi.subject}>
              <option value="">Pilih...</option>
              <option value="Matematika">Matematika</option>
              <option value="IPA">IPA</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="IPS">IPS</option>
            </select>
          </div>

          <div className="form-group">
            <label>Kelas</label>
            <select name="grade" defaultValue={kisiKisi.grade}>
              <option value="7">Kelas 7</option>
              <option value="8">Kelas 8</option>
              <option value="9">Kelas 9</option>
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <select name="semester" defaultValue={kisiKisi.semester}>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tahun Ajaran</label>
            <input type="text" name="academicYear" defaultValue={kisiKisi.academicYear} placeholder="2024/2025" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">💾 Simpan Kisi-Kisi</button>
        <button 
          type="button" 
          className="btn btn-success"
          onClick={() => window.print()}
        >
          🖨️ Cetak Kisi-Kisi
        </button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <h4>Preview Kisi-Kisi</h4>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '15px', border: '2px solid #dee2e6' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>KISI-KISI SOAL KELAS {kisiKisi.grade} SMP</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#667eea', color: 'white' }}>
                <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>No</th>
                <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Kompetensi Dasar</th>
                <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Materi</th>
                <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Indikator Soal</th>
                <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Level</th>
                <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Bentuk Soal</th>
                <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>No. Soal</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((q, idx) => (
                <tr key={q.id}>
                  <td style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ padding: '12px', border: '2px solid #dee2e6' }}>{q.competency}</td>
                  <td style={{ padding: '12px', border: '2px solid #dee2e6' }}>{q.topic}</td>
                  <td style={{ padding: '12px', border: '2px solid #dee2e6' }}>{q.question.substring(0, 50)}...</td>
                  <td style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'center' }}>{q.level}</td>
                  <td style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'center' }}>{getTypeLabel(q.type)}</td>
                  <td style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'center' }}>{idx + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderKunciJawaban = () => (
    <div className="card">
      <h3>🔑 Kunci Jawaban</h3>
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#667eea', color: 'white' }}>
              <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>No</th>
              <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Soal</th>
              <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Jawaban</th>
              <th style={{ padding: '12px', border: '2px solid #dee2e6' }}>Poin</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q, idx) => (
              <tr key={q.id}>
                <td style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'center' }}>{idx + 1}</td>
                <td style={{ padding: '12px', border: '2px solid #dee2e6' }}>{q.question.substring(0, 60)}...</td>
                <td style={{ padding: '12px', border: '2px solid #dee2e6' }}>
                  {q.type === 'pilihan-ganda-kompleks' 
                    ? q.correctAnswer.map(a => String.fromCharCode(65 + a)).join(', ')
                    : q.type === 'benar-salah'
                      ? q.correctAnswer ? 'Benar' : 'Salah'
                      : Array.isArray(q.correctAnswer)
                        ? q.correctAnswer.map(a => String.fromCharCode(65 + a)).join(', ')
                        : q.correctAnswer
                  }
                </td>
                <td style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'center' }}>{q.points}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: '#e8f5e9', fontWeight: 'bold' }}>
              <td colSpan="3" style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'right' }}>Total Skor:</td>
              <td style={{ padding: '12px', border: '2px solid #dee2e6', textAlign: 'center' }}>
                {filteredQuestions.reduce((sum, q) => sum + q.points, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )

  return (
    <div className="app-container">
      <header className="header">
        <h1>📚 Bank Soal Kelas 3 SMP</h1>
        <p>Sistem Manajemen Soal Terintegrasi - Kurikulum Merdeka</p>
      </header>

      <nav className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ Tambah Soal
        </button>
        <button 
          className={`nav-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          📝 Daftar Soal
        </button>
        <button 
          className={`nav-tab ${activeTab === 'kisi' ? 'active' : ''}`}
          onClick={() => setActiveTab('kisi')}
        >
          📋 Kisi-Kisi
        </button>
        <button 
          className={`nav-tab ${activeTab === 'kunci' ? 'active' : ''}`}
          onClick={() => setActiveTab('kunci')}
        >
          🔑 Kunci Jawaban
        </button>
      </nav>

      <main className="content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'add' && renderQuestionForm()}
        {activeTab === 'list' && renderQuestionList()}
        {activeTab === 'kisi' && renderKisiKisi()}
        {activeTab === 'kunci' && renderKunciJawaban()}
      </main>
    </div>
  )
}

export default App

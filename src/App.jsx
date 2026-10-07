import { useRef, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen,
  Bot, Check, ChevronDown, ChevronRight, CircleHelp, Clock3, CloudUpload,
  FileSearch, FileText, Fingerprint, Globe2, GraduationCap, HardDrive,
  LayoutDashboard, LockKeyhole, LogOut, Menu, MessageSquareText, MoreHorizontal,
  Search, Send, Settings2, ShieldAlert, ShieldCheck, ShieldPlus, Sparkles,
  TerminalSquare, Upload, Wifi,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'home', label: 'Bosh sahifa', icon: LayoutDashboard },
  { id: 'files', label: 'Fayllar tahlili', icon: FileSearch, badge: '3' },
  { id: 'assistant', label: 'AI yordamchi', icon: Bot },
  { id: 'academy', label: 'Xavfsizlik darslari', icon: GraduationCap },
]

const initialFiles = [
  { name: 'invoice_2025.pdf', type: 'PDF hujjat', size: '2.4 MB', status: 'Xavfsiz', tone: 'safe', date: 'Bugun, 10:42' },
  { name: 'system_update.exe', type: 'Windows dasturi', size: '18.7 MB', status: 'Tekshirildi', tone: 'warning', date: 'Bugun, 09:18' },
  { name: 'team-photos.zip', type: 'Arxiv fayl', size: '84.1 MB', status: 'Xavfsiz', tone: 'safe', date: 'Kecha, 16:05' },
]

const activities = [
  { icon: ShieldCheck, title: 'Kirish himoyasi yangilandi', detail: 'Ko‘p bosqichli autentifikatsiya yoqildi', time: '10:42', tone: 'green' },
  { icon: FileSearch, title: 'Fayl tahlili yakunlandi', detail: 'invoice_2025.pdf · 0 tahdid topildi', time: '09:18', tone: 'blue' },
  { icon: LockKeyhole, title: 'Yangi qurilma tasdiqlandi', detail: 'Chrome · Toshkent, O‘zbekiston', time: 'Kecha', tone: 'amber' },
]

const lessons = [
  { category: 'Asoslar', level: 'BOSHLANG‘ICH', title: 'Fishing xabarlarini qanday aniqlash mumkin?', description: 'Shubhali havolalar va soxta xatlarni erta tanish usullari.', duration: '8 daqiqa', icon: MessageSquareText, color: 'mint', progress: 0 },
  { category: 'Hisoblar', level: 'BOSHLANG‘ICH', title: 'Kuchli parol: birinchi himoya chizig‘i', description: 'Parol menejeri va noyob parollar bilan hisoblaringizni asrang.', duration: '6 daqiqa', icon: Fingerprint, color: 'blue', progress: 42 },
  { category: 'Qurilmalar', level: 'O‘RTA', title: 'Ochiq Wi-Fi tarmoqlarida xavfsiz qolish', description: 'Jamoat tarmoqlarida ma’lumotlaringizni himoya qiling.', duration: '11 daqiqa', icon: Wifi, color: 'orange', progress: 0 },
  { category: 'Fayllar', level: 'O‘RTA', title: 'Noma’lum faylni ochishdan oldin', description: 'Yuklab olingan fayllarni xavfsiz tekshirish tartibi.', duration: '9 daqiqa', icon: FileSearch, color: 'pink', progress: 0 },
]

const chartBars = [38, 57, 43, 76, 51, 62, 36, 82, 47, 70, 54, 91, 46, 64, 40, 74, 58, 85, 49, 69, 32, 61, 45, 78]

function IconButton({ children, label, className = '', onClick }) {
  return <button className={`icon-button ${className}`} type="button" aria-label={label} title={label} onClick={onClick}>{children}</button>
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const [files, setFiles] = useState(initialFiles)
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Salom, Dilnoza! Men Qalqon AI yordamchisiman. Xavfsizlik bo‘yicha savollaringizga javob berishga tayyorman.' },
    { from: 'ai', text: 'Bugun sizga qanday yordam bera olaman?' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [lessonFilter, setLessonFilter] = useState('Barchasi')
  const [startedLessons, setStartedLessons] = useState([])
  const [settings, setSettings] = useState({ alerts: true, weekly: false, publicProfile: false })
  const [notice, setNotice] = useState('')
  const fileInput = useRef(null)

  const notify = (text) => {
    setNotice(text)
    window.setTimeout(() => setNotice(''), 2800)
  }

  const scanFiles = (pickedFiles) => {
    const selected = Array.from(pickedFiles || [])
    if (!selected.length) return
    const additions = selected.map((file) => ({
      name: file.name,
      type: file.type || 'Noma’lum fayl',
      size: file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`,
      status: 'Tahlil qilinmoqda',
      tone: 'scanning',
      date: 'Hozir',
    }))
    setFiles((current) => [...additions, ...current])
    setActivePage('files')
    window.setTimeout(() => {
      setFiles((current) => current.map((file) => additions.some((item) => item.name === file.name && item.date === file.date)
        ? { ...file, status: 'Xavfsiz', tone: 'safe' }
        : file))
      notify('Tahlil tugadi. Tahdid aniqlanmadi.')
    }, 1800)
  }

  const sendMessage = (event) => {
    event.preventDefault()
    const text = chatInput.trim()
    if (!text) return
    setMessages((current) => [...current, { from: 'user', text }])
    setChatInput('')
    window.setTimeout(() => setMessages((current) => [...current, {
      from: 'ai',
      text: 'Yaxshi savol. Avvalo havolaning domenini diqqat bilan tekshiring, jo‘natuvchi manzilini tasdiqlang va shubhali fayllarni ochmang. Qo‘shimcha ishonch uchun faylni tahlil bo‘limiga yuklashingiz mumkin.',
    }]), 650)
  }

  const pageTitle = navItems.find((item) => item.id === activePage)?.label || 'Profil sozlamalari'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><ShieldPlus size={20} strokeWidth={2.2} /></div>
          <div className="brand-name">QALQON<span>.</span><small>SECURITY CONSOLE</small></div>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">D</div>
          <div className="workspace-copy"><strong>Shaxsiy makon</strong><span>Standart tarif</span></div>
          <ChevronDown size={15} />
        </div>

        <div className="nav-label">ISH MAYDONI</div>
        <nav className="primary-nav" aria-label="Asosiy navigatsiya">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button key={id} className={`nav-link ${activePage === id ? 'active' : ''}`} type="button" onClick={() => setActivePage(id)}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {badge && <span className="nav-badge">{badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-tip">
          <div className="tip-icon"><Sparkles size={16} /></div>
          <strong>Himoyangizni kuchaytiring</strong>
          <p>Hisobingizni tekshirib, xavfsizlik darajasini oshiring.</p>
          <button type="button" onClick={() => setActivePage('settings')}>Hisobni ko‘rish <ArrowRight size={14} /></button>
        </div>

        <button className={`nav-link settings-link ${activePage === 'settings' ? 'active' : ''}`} type="button" onClick={() => setActivePage('settings')}>
          <Settings2 size={18} strokeWidth={1.8} /><span>Profil sozlamalari</span>
        </button>
        <div className="sidebar-profile">
          <div className="profile-avatar">DO</div>
          <div className="profile-copy"><strong>Dilnoza O.</strong><span>Himoya yoqilgan</span></div>
          <MoreHorizontal size={18} />
        </div>
        <div className="sidebar-footer"><span>QALQON / DEMO</span><span className="footer-live"><i /> NAMOYISH</span></div>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <div className="mobile-brand"><div className="brand-mark"><ShieldPlus size={18} /></div><strong>QALQON<span>.</span></strong></div>
          <div className="breadcrumbs"><span>Qalqon</span><ChevronRight size={14} /><strong>{pageTitle}</strong></div>
          <div className="topbar-actions">
            <label className="global-search"><Search size={16} /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Qidirish..." aria-label="Qidirish" /><kbd>⌘ K</kbd></label>
            <div className="topbar-divider" />
            <span className="secure-status"><i /> Demo rejimi</span>
            <IconButton label="Bildirishnomalar" onClick={() => notify('Yangi bildirishnomalar yo‘q')}><Bell size={18} /></IconButton>
            <button className="topbar-user" type="button" onClick={() => setActivePage('settings')} aria-label="Profil sozlamalari"><span className="profile-avatar">DO</span><ChevronDown size={14} /></button>
          </div>
        </header>

        <main className="main-content">
          {activePage === 'home' && <HomePage onNavigate={setActivePage} onUpload={() => fileInput.current?.click()} searchTerm={searchTerm} />}
          {activePage === 'files' && <FilesPage files={files} onUpload={() => fileInput.current?.click()} onDrop={scanFiles} searchTerm={searchTerm} />}
          {activePage === 'assistant' && <AssistantPage messages={messages} chatInput={chatInput} setChatInput={setChatInput} onSend={sendMessage} />}
          {activePage === 'academy' && <AcademyPage lessonFilter={lessonFilter} setLessonFilter={setLessonFilter} startedLessons={startedLessons} setStartedLessons={setStartedLessons} />}
          {activePage === 'settings' && <SettingsPage settings={settings} setSettings={setSettings} notify={notify} />}
        </main>
      </div>

      <input ref={fileInput} className="visually-hidden" type="file" multiple onChange={(event) => { scanFiles(event.target.files); event.target.value = '' }} />
      {notice && <div className="toast" role="status"><Check size={16} />{notice}</div>}
    </div>
  )
}

function HomePage({ onNavigate, onUpload, searchTerm }) {
  const visibleActivities = activities.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <>
      <SectionHeading eyebrow="CHORSHANBA, 7 OKTABR 2026" title="Xavfsizlik markazi" description="Raqamli hayotingiz holati bir qarashda." action={<button className="button button-secondary date-button" type="button"><Clock3 size={15} /> Oxirgi 24 soat <ChevronDown size={14} /></button>} />

      <section className="hero-panel">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="hero-kicker"><span className="pulse-dot" /> NAMOYISH / XAVFSIZLIK HOLATI</div>
          <h2>Raqamli hududingiz<br /><span>nazorat ostida.</span></h2>
          <p>Demo ma’lumotlari ko‘rsatilmoqda. Haqiqiy monitoring xizmati ulanmagan.</p>
          <button className="button button-neon" type="button" onClick={() => onNavigate('files')}><ShieldCheck size={16} /> Himoyani tekshirish <ArrowRight size={15} /></button>
        </div>
        <div className="score-wrap">
          <div className="score-ring"><div className="score-inner"><span>98</span><small>ball</small></div></div>
          <div className="score-caption"><strong>Xavfsizlik darajasi</strong><span><ArrowUpRight size={13} /> 4 ballga oshdi</span></div>
        </div>
        <div className="hero-corner">QALQON / LIVE MONITORING</div>
      </section>

      <section className="stats-grid" aria-label="Xavfsizlik ko‘rsatkichlari">
        <StatCard icon={ShieldCheck} label="Bloklangan tahdidlar" value="24" change="+8%" detail="o‘tgan haftaga nisbatan" tone="green" />
        <StatCard icon={FileSearch} label="Tekshirilgan fayllar" value="138" change="+12" detail="shu hafta" tone="blue" />
        <StatCard icon={Fingerprint} label="Himoyalangan hisoblar" value="06" change="Barchasi" detail="ikki bosqichli himoya" tone="orange" />
      </section>

      <div className="dashboard-grid">
        <section className="panel traffic-panel">
          <div className="panel-heading"><div><div className="eyebrow">TAHDIDLAR MONITORINGI</div><h2>Tarmoq faolligi</h2></div><button className="period-select" type="button">7 kun <ChevronDown size={13} /></button></div>
          <div className="traffic-summary"><strong>1,284</strong><span>tekshiruv</span><span className="trend-positive"><ArrowDownRight size={14} /> 18.6%</span><small>avvalgi haftaga nisbatan</small></div>
          <div className="chart-area"><div className="chart-guides"><i /><i /><i /><i /></div><div className="chart-bars">{chartBars.map((height, index) => <div key={index} className={`chart-bar ${index === 17 ? 'peak' : ''}`} style={{ height: `${height}%` }} />)}</div></div>
          <div className="chart-labels"><span>01 OKT</span><span>03 OKT</span><span>05 OKT</span><span>BUGUN</span></div>
        </section>

        <section className="panel quick-panel">
          <div className="panel-heading"><div><div className="eyebrow">TEZKOR AMALLAR</div><h2>Himoyani boshqaring</h2></div><div className="panel-icon"><Activity size={16} /></div></div>
          <button className="quick-action" type="button" onClick={onUpload}><span className="quick-icon cyan"><Upload size={17} /></span><span><strong>Faylni tekshirish</strong><small>Shubhali faylni tahlil qiling</small></span><ChevronRight size={16} /></button>
          <button className="quick-action" type="button" onClick={() => onNavigate('assistant')}><span className="quick-icon lime"><Bot size={17} /></span><span><strong>AI bilan maslahat</strong><small>Xavfsizlik savolini bering</small></span><ChevronRight size={16} /></button>
          <button className="quick-action" type="button" onClick={() => onNavigate('academy')}><span className="quick-icon orange"><BookOpen size={17} /></span><span><strong>Darslarni davom ettirish</strong><small>Bilimingizni mustahkamlang</small></span><ChevronRight size={16} /></button>
          <div className="scan-status"><span className="scan-orbit"><i /></span><span><strong>Real vaqt himoyasi</strong><small>Oxirgi yangilanish: hozir</small></span><span className="status-pill">FAOL</span></div>
        </section>
      </div>

      <div className="dashboard-grid lower-grid">
        <section className="panel activity-panel">
          <div className="panel-heading"><div><div className="eyebrow">SO‘NGGI HODISALAR</div><h2>Faollik jurnali</h2></div><button className="text-action" type="button" onClick={() => onNavigate('files')}>Barchasi <ArrowRight size={14} /></button></div>
          <div className="activity-list">{visibleActivities.length ? visibleActivities.map((item) => <div className="activity-row" key={item.title}><span className={`activity-icon ${item.tone}`}><item.icon size={16} /></span><span className="activity-copy"><strong>{item.title}</strong><small>{item.detail}</small></span><time>{item.time}</time></div>) : <p className="empty-search">Mos hodisa topilmadi.</p>}</div>
        </section>
        <section className="learning-strip">
          <div className="learning-top"><span className="learning-icon"><GraduationCap size={18} /></span><span className="eyebrow">SIZ UCHUN TAVSIYA</span><span className="lesson-time">6 DAQ</span></div>
          <h2>Fishingni bir qarashda aniqlang</h2>
          <p>Shubhali xabarlarni ajratish bo‘yicha qisqa dars.</p>
          <button type="button" onClick={() => onNavigate('academy')}>Darsni boshlash <ArrowRight size={15} /></button>
          <div className="learning-watermark"><ShieldAlert size={82} /></div>
        </section>
      </div>
      <div className="page-footnote"><span><Sparkles size={12} /> Namoyish ma’lumotlari</span><span>Haqiqiy tahlil uchun backend yoki xavfsizlik API integratsiyasi kerak.</span></div>
    </>
  )
}

function StatCard({ icon: Icon, label, value, change, detail, tone }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={17} /></div><div className="stat-label">{label}</div><div className="stat-main"><strong>{value}</strong><span className={`stat-change ${tone}`}>{change}</span></div><div className="stat-detail">{detail}</div></article>
}

function FilesPage({ files, onUpload, onDrop, searchTerm }) {
  const [dragging, setDragging] = useState(false)
  const filteredFiles = files.filter((file) => `${file.name} ${file.type}`.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <>
      <SectionHeading eyebrow="TAHDIDNI OLDINDAN ANIQLANG" title="Fayllar tahlili" description="Fayllarni ochishdan oldin xavfsizligini tekshiring." action={<span className="quota-label"><HardDrive size={15} /> 2.4 GB / 10 GB</span>} />
      <section className={`upload-zone ${dragging ? 'dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); onDrop(event.dataTransfer.files) }}>
        <div className="upload-symbol"><CloudUpload size={23} /></div><h2>Fayllarni shu yerga tashlang</h2><p>Yoki qurilmangizdan tanlang · PDF, ZIP, EXE, DOCX · 100 MB gacha</p><button className="button button-neon" type="button" onClick={onUpload}><Upload size={15} /> Fayl tanlash</button><div className="upload-secure"><LockKeyhole size={12} /> Demo rejim: fayllar serverga yuborilmaydi</div>
      </section>
      <section className="panel files-panel"><div className="panel-heading"><div><div className="eyebrow">TAHLIL TARIXI</div><h2>So‘nggi fayllar <span className="count-chip">{filteredFiles.length}</span></h2></div><button className="button button-secondary small-button" type="button"><MoreHorizontal size={16} /> Ko‘proq</button></div>
        <div className="file-table-wrap"><table className="file-table"><thead><tr><th>FAYL NOMI</th><th>HAJMI</th><th>HOLATI</th><th>SANA</th><th aria-label="Amallar" /></tr></thead><tbody>{filteredFiles.map((file, index) => <tr key={`${file.name}-${index}`}><td><div className="file-name"><span className="file-type-icon"><FileText size={17} /></span><span><strong>{file.name}</strong><small>{file.type}</small></span></div></td><td>{file.size}</td><td><span className={`file-status ${file.tone}`}><i />{file.status}</span></td><td>{file.date}</td><td><IconButton label={`${file.name} amallari`}><MoreHorizontal size={17} /></IconButton></td></tr>)}</tbody></table>{filteredFiles.length === 0 && <p className="empty-search">Qidiruv bo‘yicha fayl topilmadi.</p>}</div>
      </section>
      <div className="analysis-note"><ShieldCheck size={17} /><span><strong>Demo tahlil</strong> Natija simulyatsiya qilinadi; haqiqiy tekshiruv uchun antivirus API kerak.</span><button type="button">Batafsil <ArrowRight size={14} /></button></div>
    </>
  )
}

function AssistantPage({ messages, chatInput, setChatInput, onSend }) {
  const suggestions = ['Fishing xatini qanday aniqlayman?', 'Kuchli parol qanday bo‘ladi?', 'Bu faylni ochsam bo‘ladimi?']
  return (
    <>
      <SectionHeading eyebrow="SIZNING XAVFSIZLIK HAMKORINGIZ" title="AI yordamchi" description="Savolingizni bering, sodda va amaliy javob oling." action={<span className="ai-online"><i /> AI ONLAYN</span>} />
      <section className="assistant-layout">
        <div className="assistant-chat panel">
          <div className="chat-header"><div className="ai-avatar"><Bot size={18} /></div><div><strong>Qalqon AI</strong><span><i /> xavfsizlik bo‘yicha yordamchi</span></div><IconButton label="Yangi suhbat"><MoreHorizontal size={17} /></IconButton></div>
          <div className="chat-messages">{messages.map((message, index) => <div key={`${message.from}-${index}`} className={`chat-message ${message.from}`}><div className="message-avatar">{message.from === 'ai' ? <ShieldPlus size={15} /> : 'DO'}</div><div className="message-content"><span>{message.from === 'ai' ? 'QALQON AI' : 'SIZ'}</span><p>{message.text}</p></div></div>)}</div>
          <div className="chat-bottom"><div className="suggestion-row">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setChatInput(suggestion)}>{suggestion}</button>)}</div><form className="chat-composer" onSubmit={onSend}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Savolingizni yozing..." aria-label="AI yordamchiga xabar" /><button type="submit" aria-label="Xabar yuborish"><Send size={17} /></button></form><div className="chat-disclaimer"><LockKeyhole size={12} /> Demo javoblari oldindan belgilangan; AI serverga ulanmagan</div></div>
        </div>
        <aside className="assistant-aside"><div className="panel help-panel"><div className="aside-icon"><Sparkles size={17} /></div><div className="eyebrow">QALQON AI IMKONIYATLARI</div><h2>Raqamli xavfsizlik bo‘yicha yo‘l-yo‘riq</h2><ul><li><Check size={14} /> Shubhali xabarni baholash</li><li><Check size={14} /> Parol bo‘yicha tavsiyalar</li><li><Check size={14} /> Qurilma xavfsizligi</li><li><Check size={14} /> Maxfiylik sozlamalari</li></ul></div><div className="privacy-card"><LockKeyhole size={16} /><div><strong>Demo sessiya</strong><p>Xabarlar faqat joriy sahifa sessiyasida qoladi.</p></div></div></aside>
      </section>
    </>
  )
}

function AcademyPage({ lessonFilter, setLessonFilter, startedLessons, setStartedLessons }) {
  const filters = ['Barchasi', 'Asoslar', 'Hisoblar', 'Qurilmalar', 'Fayllar']
  const visibleLessons = lessonFilter === 'Barchasi' ? lessons : lessons.filter((lesson) => lesson.category === lessonFilter)
  return (
    <>
      <SectionHeading eyebrow="BILIM — ENG KUCHLI HIMOYA" title="Xavfsizlik darslari" description="Kundalik raqamli odatlarni mustahkamlaydigan qisqa darslar." action={<div className="learning-progress"><div><span>UMUMIY NATIJA</span><strong>2 / 8 dars</strong></div><div className="progress-track"><i style={{ width: '25%' }} /></div></div>} />
      <section className="academy-banner"><div className="academy-banner-icon"><GraduationCap size={23} /></div><div><span className="eyebrow">SIZNING O‘QUV REJANGIZ</span><h2>Har kuni bir qadam xavfsizroq.</h2><p>Bugun 6 daqiqalik dars bilan hisoblaringizni mustahkamlang.</p></div><div className="academy-banner-stats"><strong>12<span>%</span></strong><small>kurs yakunlandi</small><div className="progress-track"><i style={{ width: '12%' }} /></div></div></section>
      <div className="lesson-toolbar"><div className="filter-tabs" role="tablist" aria-label="Dars toifalari">{filters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={lessonFilter === filter} className={lessonFilter === filter ? 'selected' : ''} onClick={() => setLessonFilter(filter)}>{filter}</button>)}</div><button className="button button-secondary small-button" type="button"><Menu size={15} /> Yo‘nalishlar</button></div>
      <section className="lesson-grid">{visibleLessons.map((lesson) => { const started = startedLessons.includes(lesson.title); return <article className="lesson-card" key={lesson.title}><div className="lesson-card-top"><span className={`lesson-icon ${lesson.color}`}><lesson.icon size={18} /></span><span className="lesson-level">{lesson.level}</span><button className="lesson-more" type="button" aria-label="Dars amallari"><MoreHorizontal size={17} /></button></div><div className="lesson-category">{lesson.category}</div><h2>{lesson.title}</h2><p>{lesson.description}</p><div className="lesson-card-meta"><span><Clock3 size={13} /> {lesson.duration}</span><span className="lesson-progress-text">{started ? 'BOSHLANDI' : lesson.progress ? `${lesson.progress}%` : 'BOSHLANMAGAN'}</span></div><div className="progress-track"><i style={{ width: started ? '14%' : `${lesson.progress}%` }} /></div><button className={`lesson-button ${started ? 'in-progress' : ''}`} type="button" onClick={() => setStartedLessons((current) => started ? current.filter((title) => title !== lesson.title) : [...current, lesson.title])}>{started ? 'Davom ettirish' : 'Darsni boshlash'} <ArrowRight size={15} /></button></article> })}</section>
      <div className="academy-footer"><ShieldCheck size={16} /><span>Har bir dars mutaxassislar tomonidan tayyorlangan va muntazam yangilanadi.</span><button type="button">O‘quv rejasi <ArrowRight size={14} /></button></div>
    </>
  )
}

function SettingsPage({ settings, setSettings, notify }) {
  const [displayName, setDisplayName] = useState('Dilnoza O.');
  const [email, setEmail] = useState('dilnoza@example.uz');
  const toggleSetting = (name) => setSettings((current) => ({ ...current, [name]: !current[name] }))
  return (
    <>
      <SectionHeading eyebrow="HISOB VA XAVFSIZLIK" title="Profil sozlamalari" description="Shaxsiy ma’lumotlaringiz va himoya parametrlarini boshqaring." action={<button className="button button-neon" type="button" onClick={() => notify('Sozlamalar saqlandi')}><Check size={15} /> O‘zgarishlarni saqlash</button>} />
      <div className="settings-layout"><div className="settings-main">
        <section className="panel settings-panel"><div className="settings-heading"><div><div className="eyebrow">SHAXSIY MA’LUMOTLAR</div><h2>Profil</h2></div><span className="verified-label"><ShieldCheck size={14} /> Tasdiqlangan</span></div><div className="profile-edit"><div className="profile-avatar large">DO</div><div><strong>Profil rasmi</strong><p>JPG yoki PNG, 2 MB gacha.</p><button className="text-action" type="button">Rasmni almashtirish <ArrowRight size={13} /></button></div></div><div className="form-grid"><label>Ism va familiya<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} /></label><label>Elektron pochta<input value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Til<select defaultValue="uz"><option value="uz">O‘zbekcha</option><option value="ru">Русский</option><option value="en">English</option></select></label><label>Vaqt mintaqasi<select defaultValue="tashkent"><option value="tashkent">Toshkent (GMT+5)</option><option value="utc">UTC</option></select></label></div></section>
        <section className="panel settings-panel"><div className="settings-heading"><div><div className="eyebrow">BILDIRISHNOMALAR</div><h2>Xabarnoma sozlamalari</h2></div><Bell size={17} /></div><SettingToggle title="Xavfsizlik ogohlantirishlari" detail="Shubhali kirish va tahdidlar haqida darhol xabar bering." active={settings.alerts} onClick={() => toggleSetting('alerts')} /><SettingToggle title="Haftalik hisobot" detail="Himoya holati bo‘yicha qisqa xulosani oling." active={settings.weekly} onClick={() => toggleSetting('weekly')} /></section>
        <section className="panel settings-panel"><div className="settings-heading"><div><div className="eyebrow">HIMOYA VA MAXFIYLIK</div><h2>Hisob xavfsizligi</h2></div><LockKeyhole size={17} /></div><div className="security-row"><span className="security-row-icon"><Fingerprint size={17} /></span><div><strong>Ikki bosqichli autentifikatsiya</strong><p>Hisobingizga qo‘shimcha himoya qatlami.</p></div><span className="enabled-pill"><i /> YOQILGAN</span></div><div className="security-row"><span className="security-row-icon"><Globe2 size={17} /></span><div><strong>Faol seanslar</strong><p>2 ta qurilmada tizimga kirilgan.</p></div><button className="text-action" type="button">Boshqarish <ArrowRight size={13} /></button></div></section>
      </div><aside className="settings-aside"><div className="account-card"><div className="account-card-top"><ShieldCheck size={19} /><span>HIMOYA DARAJASI</span></div><strong>Yuqori</strong><div className="progress-track"><i style={{ width: '92%' }} /></div><p>Hisobingiz yaxshi himoyalangan. Tavsiyalarni bajaring.</p><button type="button">Tekshiruvni ko‘rish <ArrowRight size={14} /></button></div><div className="panel account-links"><button type="button"><CircleHelp size={16} /> Yordam markazi <ChevronRight size={15} /></button><button type="button"><TerminalSquare size={16} /> Faollik jurnali <ChevronRight size={15} /></button><button type="button"><LogOut size={16} /> Hisobdan chiqish <ChevronRight size={15} /></button></div></aside></div>
    </>
  )
}

function SettingToggle({ title, detail, active, onClick }) {
  return <div className="setting-toggle-row"><div><strong>{title}</strong><p>{detail}</p></div><button className={`toggle-switch ${active ? 'on' : ''}`} type="button" role="switch" aria-checked={active} aria-label={title} onClick={onClick}><i /></button></div>
}

export default App

# 🎨 ДЕТАЛЬНЫЙ ПЛАН РЕФАКТОРИНГА ПОРТФОЛИО-САЙТА

## 📐 АРХИТЕКТУРА ПРОЕКТА

### Структура страниц:
```
Главная страница (/)
├── Hero Section
├── About + Tech Stack Section
├── Portfolio Section (5 проектов)
└── Contact Section

Страница проектов (/portfolio)
└── Все проекты в grid layout
```

### Технологический стек:
- React 18+ с TypeScript
- Framer Motion для анимаций
- Tailwind CSS (только core classes)
- React Router для навигации
- Lucide React для иконок

---

## 🎯 СЕКЦИЯ 1: HERO SECTION

### Цель:
Создать минималистичный первый экран с фото и кратким представлением.

### Структура компонента:
```tsx
<section className="hero-section">
  <div className="container">
    <div className="hero-grid">
      {/* Левая колонка - Текст */}
      <div className="hero-left">
        <h1>Создаю производительные интерфейсы на <span>React & TypeScript</span></h1>
        <button>Портфолио</button>
      </div>
      
      {/* Правая колонка - Фото */}
      <div className="hero-right">
        <img src="/hero-me.svg" alt="Sergey Kutushev" />
      </div>
    </div>
  </div>
</section>
```

### Визуальное оформление:

#### Фон:
**Темная тема:**
- Base background: `#0a0b0d`
- Subtle radial gradient: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1), transparent 50%)`
- Никаких сложных слоев, svg паттернов

**Светлая тема:**
- Base background: `#ffffff`
- Subtle radial gradient: `radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.08), transparent 50%)`

#### Типографика:
```tsx
// Заголовок h1
font-size: clamp(2rem, 5vw + 1rem, 3.75rem)
font-weight: 700
line-height: 1.2
color: var(--text-primary)

// Gradient текст для "React & TypeScript"
background: var(--gradient-primary)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

#### Кнопка:
```tsx
// Стили кнопки "Портфолио"
background: var(--gradient-primary)
padding: 14px 32px
border-radius: 12px
font-weight: 600
box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4)

// Hover
transform: translateY(-2px)
box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6)
```

#### Фото:
```tsx
// Контейнер
position: relative
width: 100%
max-width: 500px
aspect-ratio: 1 / 1

// Изображение
object-fit: cover
border-radius: 24px
filter: grayscale(0%) // можно добавить легкий фильтр

// Декоративный элемент (опционально)
// Gradient border или subtle glow вокруг фото
```

### Layout:

**Desktop (>1024px):**
```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  min-height: 100vh;
}
```

**Tablet (768-1024px):**
```css
.hero-grid {
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 80px 32px;
}
```

**Mobile (<768px):**
```css
.hero-grid {
  grid-template-columns: 1fr;
  gap: 32px;
  padding: 60px 24px;
  text-align: center;
}

.hero-right {
  order: -1; /* Фото сверху */
  max-width: 350px;
  margin: 0 auto;
}
```

### Анимации Framer Motion:

```tsx
// Заголовок
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>

// Кнопка
<motion.button
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
>

// Фото
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.4, duration: 0.8 }}
>
```

### Функциональность:

```tsx
// Smooth scroll к портфолио
const scrollToPortfolio = () => {
  document.getElementById('portfolio')?.scrollIntoView({ 
    behavior: 'smooth' 
  });
};
```

---

## 👤 СЕКЦИЯ 2: ОБО МНЕ + ТЕХНОЛОГИЧЕСКИЙ СТЕК

### Цель:
Объединить информацию обо мне и технологическом стеке в одной секции с двумя glass-morphism карточками.

### Структура компонента:

```tsx
<section className="about-section">
  <div className="container">
    <div className="about-grid">
      
      {/* Левая карточка - Обо мне */}
      <motion.div className="about-card glass-card">
        <h2>Обо мне</h2>
        <p>Frontend-разработчик с пониманием бизнес-логики</p>
        <ul className="about-points">
          <li>Создаю быстрые интерфейсы, опираясь на общий опыт 10+ лет работы с бизнесом и IT</li>
          <li>Разрабатываю реальные продукты в сфере Fintech и Web3-сервисов</li>
          <li>Проектирую архитектуру, пишу чистый код и соблюдаю сроки</li>
        </ul>
      </motion.div>
      
      {/* Правая карточка - Стек */}
      <motion.div className="tech-card glass-card">
        <div className="tech-header">
          <h2>Технологический стек</h2>
        </div>
        
        <div className="tech-grid">
          {techStack.map((tech) => (
            <motion.div 
              className="tech-item"
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <img src={tech.icon} alt={tech.name} />
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
    </div>
  </div>
</section>
```

### Визуальное оформление Glass-Morphism:

**Темная тема:**
```css
.glass-card {
  background: rgba(18, 20, 26, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.glass-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
}
```

**Светлая тема:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-card:hover {
  border-color: rgba(20, 184, 166, 0.3);
  box-shadow: 0 8px 32px rgba(20, 184, 166, 0.15);
}
```

### Список технологий:

```tsx
const techStack = [
  { name: 'React', icon: '/icons/react.svg', category: 'frontend' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '/icons/tailwind.svg', category: 'styles' },
  { name: 'Framer Motion', icon: '/icons/framer.svg', category: 'frontend' },
  { name: 'Vite', icon: '/icons/vite.svg', category: 'tools' },
  { name: 'Docker', icon: '/icons/docker.svg', category: 'backend' },
  { name: 'Ethers.js', icon: '/icons/ethers.svg', category: 'web3' },
  { name: 'Wagmi', icon: '/icons/wagmi.svg', category: 'web3' },
  // ... остальные
];
```

### Tech Grid Layout:

```css
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-item img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.tech-item span {
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
}

.tech-item:hover {
  background: rgba(59, 130, 246, 0.1);
}
```

### Layout секции:

**Desktop (>1024px):**
```css
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 120px 0;
}
```

**Tablet (768-1024px):**
```css
.about-grid {
  gap: 32px;
  padding: 80px 0;
}
```

**Mobile (<768px):**
```css
.about-grid {
  grid-template-columns: 1fr;
  gap: 24px;
  padding: 60px 0;
}

.glass-card {
  padding: 32px 24px;
}

.tech-grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

### Анимации:

```tsx
// Левая карточка
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>

// Правая карточка
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, delay: 0.2 }}
>

// Технологии - stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

---

## 💼 СЕКЦИЯ 3: ПОРТФОЛИО (ВЕЕР + СТРАНИЦА)

### Цель:
Показать 5 избранных проектов веером на главной странице и создать отдельную страницу со всеми проектами.

### ЧАСТЬ 3.1: ГЛАВНАЯ СТРАНИЦА - 5 ПРОЕКТОВ ВЕЕРОМ

#### Структура компонента:

```tsx
<section className="portfolio-section">
  <div className="container">
    
    {/* Заголовок */}
    <motion.div className="section-header">
      <h2>Code manifest: избранные решения</h2>
      <p>Реализованные проекты, демонстрирующие мой подход к разработке</p>
    </motion.div>
    
    {/* Контейнер веера */}
    <div className="portfolio-fan">
      {featuredProjects.map((project, index) => (
        <ProjectCard 
          key={project.id}
          project={project}
          index={index}
          onClick={() => openModal(project)}
        />
      ))}
    </div>
    
    {/* Кнопка "Смотреть все" */}
    <Link to="/portfolio" className="view-all-btn">
      Смотреть все проекты
    </Link>
    
  </div>
</section>
```

#### Избранные проекты:

```tsx
const featuredProjects = [
  { id: 16, title: 'NFT Marketplace', ... },  // Левая-2
  { id: 9, title: 'Lumi', ... },              // Левая-1
  { id: 3, title: 'AIBRO', ... },             // Центр
  { id: 5, title: 'Portfolio', ... },         // Правая-1
  { id: 11, title: 'Yokai', ... },            // Правая-2
];
```

#### Дизайн карточки проекта (из старого портфолио):

```tsx
<motion.div 
  className="project-card"
  style={{ 
    position: 'absolute',
    ...getFanPosition(index) 
  }}
  whileHover={{ 
    scale: 1.05, 
    y: -12, 
    zIndex: 10,
    rotate: 0  // При hover карточка выравнивается
  }}
>
  {/* Изображение проекта */}
  <div className="project-image">
    <LazyImage src={project.image} alt={project.title} />
    
    {/* Gradient overlay */}
    <div className="image-gradient" />
    
    {/* Иконка кода */}
    <motion.div 
      className="code-icon"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <Code size={20} />
    </motion.div>
  </div>
  
  {/* Контент карточки */}
  <div className="card-content">
    {/* Категория badge */}
    <span className="category-badge">{project.category}</span>
    
    {/* Заголовок */}
    <h3>{project.title}</h3>
    
    {/* Технологии */}
    <p className="tech-stack">{project.tech}</p>
    
    {/* Метрики */}
    <div className="card-footer">
      <div className="metrics">
        <span className="metric-label">{project.metrics.label}</span>
        <span className="metric-value">{project.metrics.value}</span>
      </div>
      <ArrowRight className="arrow-icon" />
    </div>
  </div>
</motion.div>
```

#### Стили карточки:

```css
.project-card {
  width: 380px;
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  border-color: var(--accent-blue);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
}

.project-image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover img {
  transform: scale(1.05);
}

.image-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg-primary), transparent);
  opacity: 0.6;
}

.code-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(10, 11, 13, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-blue);
}

.card-content {
  padding: 24px;
}

.category-badge {
  display: inline-block;
  padding: 6px 12px;
  background: var(--gradient-primary);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 12px;
}

.card-content h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  transition: color 0.3s;
}

.project-card:hover h3 {
  color: var(--accent-blue);
}

.tech-stack {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border-default);
}

.metrics {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--accent-blue);
}

.arrow-icon {
  color: var(--accent-blue);
  transition: transform 0.3s;
}

.project-card:hover .arrow-icon {
  transform: translateX(4px);
}
```

#### Позиционирование веера:

```tsx
const getFanPosition = (index: number) => {
  const positions = [
    // Left-2 (NFT Marketplace)
    { x: -450, y: 100, rotate: -12, scale: 0.92, zIndex: 1 },
    // Left-1 (Lumi)
    { x: -230, y: 50, rotate: -6, scale: 0.96, zIndex: 2 },
    // Center (AIBRO)
    { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3 },
    // Right-1 (Portfolio)
    { x: 230, y: 50, rotate: 6, scale: 0.96, zIndex: 2 },
    // Right-2 (Yokai)
    { x: 450, y: 100, rotate: 12, scale: 0.92, zIndex: 1 },
  ];
  
  return positions[index];
};
```

#### Анимация появления веера:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const cardVariants = (position) => ({
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 100 
  },
  visible: { 
    opacity: 1, 
    scale: position.scale,
    x: position.x,
    y: position.y,
    rotate: position.rotate,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});
```

#### Layout веера:

**Desktop (>1200px):**
```css
.portfolio-fan {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 0;
}

.project-card {
  position: absolute;
  /* Позиции задаются через getFanPosition */
}
```

**Tablet (768-1200px):**
```css
.portfolio-fan {
  height: 500px;
}

/* Уменьшить расстояния между карточками */
const getFanPosition = (index: number) => {
  const positions = [
    { x: -300, y: 80, rotate: -10, scale: 0.9 },
    { x: -150, y: 40, rotate: -5, scale: 0.95 },
    { x: 0, y: 0, rotate: 0, scale: 1 },
    { x: 150, y: 40, rotate: 5, scale: 0.95 },
    { x: 300, y: 80, rotate: 10, scale: 0.9 },
  ];
  return positions[index];
};
```

**Mobile (<768px) - ОТКЛЮЧИТЬ ВЕЕР:**
```css
.portfolio-fan {
  position: static;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin: 40px 0;
}

.project-card {
  position: relative !important;
  width: 100% !important;
  max-width: 400px;
  margin: 0 auto;
  /* Сбросить все трансформации */
  transform: none !important;
}
```

#### Modal проекта (PopUp):

```tsx
<AnimatePresence>
  {selectedProject && (
    <motion.div 
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="modal-header">
          <h3>{selectedProject.title}</h3>
          <button onClick={closeModal}>✕</button>
        </div>
        
        {/* Табы */}
        <div className="modal-tabs">
          <button 
            className={activeTab === 'flow' ? 'active' : ''}
            onClick={() => setActiveTab('flow')}
          >
            The Flow
          </button>
          <button 
            className={activeTab === 'code' ? 'active' : ''}
            onClick={() => setActiveTab('code')}
          >
            Code Highlight
          </button>
        </div>
        
        {/* Контент */}
        <div className="modal-body">
          {activeTab === 'flow' ? (
            <div className="flow-content">
              <div className="flow-block input">
                <h4>Input</h4>
                <p>{selectedProject.flow.input}</p>
              </div>
              <div className="flow-block process">
                <h4>Process</h4>
                <p>{selectedProject.flow.process}</p>
              </div>
              <div className="flow-block output">
                <h4>Output</h4>
                <p>{selectedProject.flow.output}</p>
              </div>
            </div>
          ) : (
            <div className="code-content">
              <div className="code-header">
                <Code size={24} />
                <h4>{selectedProject.codeHighlight.title}</h4>
              </div>
              <pre>
                <code>{selectedProject.codeHighlight.code}</code>
              </pre>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

#### Стили Modal:

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: 24px;
  max-width: 900px;
  max-height: 90vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-default);
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 28px;
  font-weight: 700;
}

.modal-header button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--bg-tertiary);
  cursor: pointer;
  transition: background 0.3s;
}

.modal-tabs {
  display: flex;
  gap: 16px;
  padding: 24px 32px 0;
}

.modal-tabs button {
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-tabs button.active {
  background: var(--gradient-primary);
  color: white;
}

.modal-tabs button:not(.active) {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.modal-body {
  padding: 32px;
  overflow-y: auto;
}

.flow-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.flow-block {
  padding: 24px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 16px;
}

.flow-block h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.flow-block.input h4 { color: var(--accent-blue); }
.flow-block.process h4 { color: var(--accent-purple); }
.flow-block.output h4 { color: var(--accent-green); }

.code-content pre {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  padding: 24px;
  overflow-x: auto;
}

.code-content code {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}
```

### ЧАСТЬ 3.2: ОТДЕЛЬНАЯ СТРАНИЦА /PORTFOLIO

#### Структура страницы:

```tsx
export const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  return (
    <div className="portfolio-page">
      <div className="container">
        
        {/* Back Button */}
        <motion.div className="back-button">
          <Link to="/#portfolio">
            <ArrowLeft /> Назад к сайту
          </Link>
        </motion.div>
        
        {/* Header */}
        <motion.div className="page-header">
          <h1>Портфолио</h1>
          <p>Реализованные проекты, демонстрирующие мой подход к разработке</p>
        </motion.div>
        
        {/* Grid всех проектов */}
        <div className="projects-grid">
          {allProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
};
```

#### Layout Grid:

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 64px;
}

/* Tablet */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

#### Карточки на странице портфолио:

```tsx
// Те же карточки, что на главной, но БЕЗ веера
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: delay }}
  whileHover={{ y: -10 }}
  className="project-card"
>
  {/* Тот же контент карточки */}
</motion.div>
```

---

## 📧 СЕКЦИЯ 4: КОНТАКТЫ

### Цель:
Минималистичная секция с кодом контактов и иконками социальных сетей.

### Структура компонента:

```tsx
<section className="contact-section">
  <div className="container">
    
    {/* Заголовок */}
    <motion.div className="section-header">
      <h2>Контакты</h2>
    </motion.div>
    
    {/* Code Block */}
    <motion.div 
      className="contact-code"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <pre>
        <code>{`const contact = {
  telegram: '@sskutushev',
  email: 'sskutushev@gmail.com',
  github: 'github.com/sskutushev',
  location: 'Санкт-Петербург'
};`}</code>
      </pre>
    </motion.div>
    
    {/* Социальные иконки */}
    <motion.div 
      className="social-icons"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.a 
        href="https://t.me/sskutushev"
        variants={iconVariants}
        whileHover={{ scale: 1.15, rotate: 5 }}
      >
        <Send size={24} />
      </motion.a>
      
      <motion.a 
        href="https://github.com/sskutushev"
        variants={iconVariants}
        whileHover={{ scale: 1.15, rotate: 5 }}
      >
        <Github size={24} />
      </motion.a>
      
      <motion.a 
        href="mailto:sskutushev@gmail.com"
        variants={iconVariants}
        whileHover={{ scale: 1.15, rotate: 5 }}
      >
        <Mail size={24} />
      </motion.a>
    </motion.div>
    
  </div>
</section>
```

### Стили Code Block:

```css
.contact-code {
  max-width: 600px;
  margin: 0 auto 48px;
  background: rgba(18, 20, 26, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid var(--accent-blue);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
}

.contact-code pre {
  margin: 0;
  overflow-x: auto;
}

.contact-code code {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-primary);
}

/* Syntax highlighting */
.contact-code code .key {
  color: #60a5fa; /* Синий для ключей */
}

.contact-code code .string {
  color: #34d399; /* Зеленый для строк */
}

/* Светлая тема */
.light .contact-code {
  background: rgba(255, 255, 255, 0.9);
  border-color: var(--accent-teal);
  box-shadow: 0 8px 32px rgba(20, 184, 166, 0.15);
}
```

### Социальные иконки:

```css
.social-icons {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.social-icons a {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.social-icons a:hover {
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.5);
  transform: translateY(-4px);
}

/* Mobile */
@media (max-width: 768px) {
  .social-icons a {
    width: 56px;
    height: 56px;
  }
  
  .social-icons {
    gap: 20px;
  }
}
```

### Анимации:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
```

### Фон секции:

```css
.contact-section {
  position: relative;
  padding: 120px 0;
  background: var(--bg-secondary);
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent);
  filter: blur(80px);
  pointer-events: none;
}

/* Светлая тема */
.light .contact-section::before {
  background: radial-gradient(circle, rgba(20, 184, 166, 0.08), transparent);
}
```

---

## 🎨 ОБЩИЕ КОМПОНЕНТЫ И УЛУЧШЕНИЯ

### Theme Toggle (Переключатель темы):

```tsx
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'dark' ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </motion.button>
  );
};
```

```css
.theme-toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s;
}

.theme-toggle:hover {
  background: var(--bg-secondary);
  border-color: var(--accent-blue);
}
```

### Context для темы:

```tsx
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Проверяем сохраненную тему или системные настройки
    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  });
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Accessibility улучшения:

```tsx
// Skip to main content
<a href="#main-content" className="skip-link">
  Перейти к основному контенту
</a>

// Focus visible states
*:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}

// ARIA labels
<button aria-label="Открыть проект">
  {/* content */}
</button>

// Semantic HTML
<main id="main-content">
  <section aria-labelledby="portfolio-heading">
    <h2 id="portfolio-heading">Портфолио</h2>
  </section>
</main>

// Keyboard navigation для карточек
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

---

## 🚀 ПРОИЗВОДИТЕЛЬНОСТЬ И ОПТИМИЗАЦИЯ

### Lazy Loading:

```tsx
// Lazy load страниц
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));

// Lazy load изображений
<img 
  src={project.image} 
  alt={project.title}
  loading="lazy"
/>

// Или кастомный компонент
export const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`lazy-image ${isLoaded ? 'loaded' : ''}`}>
      <img 
        src={src} 
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && <div className="skeleton" />}
    </div>
  );
};
```

### Code Splitting:

```tsx
// React Router с lazy loading
<Routes>
  <Route path="/" element={<MainPage />} />
  <Route 
    path="/portfolio" 
    element={
      <Suspense fallback={<PageLoader />}>
        <PortfolioPage />
      </Suspense>
    } 
  />
</Routes>
```

### Оптимизация анимаций:

```tsx
// Использовать will-change для анимированных элементов
.project-card {
  will-change: transform;
}

// Отключать анимации на слабых устройствах
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ

### Этап 1: Базовая структура
- [ ] Настроить React Router (/, /portfolio)
- [ ] Создать ThemeContext и ThemeProvider
- [ ] Настроить Tailwind config с CSS переменными
- [ ] Создать базовую структуру 4 секций

### Этап 2: Hero Section
- [ ] Упростить фон (убрать layers)
- [ ] Адаптивная типографика (clamp)
- [ ] Оптимизировать фото
- [ ] Анимации Framer Motion
- [ ] Адаптив Mobile/Tablet/Desktop

### Этап 3: About + Tech Stack
- [ ] Создать glass-morphism карточки
- [ ] Bullet points с анимацией
- [ ] Grid технологий с иконками
- [ ] Hover эффекты
- [ ] Адаптив для двух карточек

### Этап 4: Portfolio Section - Главная
- [ ] Создать ProjectCard компонент (дизайн из старого портфолио)
- [ ] Реализовать веер для 5 проектов
- [ ] Позиционирование getFanPosition()
- [ ] Анимация появления веера
- [ ] ProjectModal с табами (Flow/Code)
- [ ] Кнопка "Смотреть все"
- [ ] Адаптив: отключить веер на mobile

### Этап 5: Portfolio Page - /portfolio
- [ ] Создать PortfolioPage компонент
- [ ] Back navigation
- [ ] Grid всех проектов (3/2/1 колонки)
- [ ] Использовать те же ProjectCard
- [ ] Интеграция с ProjectModal
- [ ] Анимации появления карточек

### Этап 6: Contact Section
- [ ] Code block с контактами
- [ ] Syntax highlighting
- [ ] Социальные иконки (3 шт)
- [ ] Hover эффекты
- [ ] Фон с blur эффектом

### Этап 7: Theme Toggle
- [ ] Кнопка переключения
- [ ] Сохранение в localStorage
- [ ] Smooth transition между темами
- [ ] Системные настройки по умолчанию

### Этап 8: Accessibility
- [ ] Skip to main content link
- [ ] ARIA labels
- [ ] Focus visible states
- [ ] Keyboard navigation
- [ ] Semantic HTML
- [ ] Screen reader friendly

### Этап 9: Оптимизация
- [ ] Lazy loading изображений
- [ ] Code splitting для /portfolio
- [ ] Оптимизация анимаций (will-change)
- [ ] Prefers-reduced-motion
- [ ] WebP изображения
- [ ] Минификация и сжатие

### Этап 10: Тестирование
- [ ] Desktop (1920px, 1440px, 1280px)
- [ ] Tablet (1024px, 768px)
- [ ] Mobile (375px, 414px)
- [ ] Safari, Chrome, Firefox
- [ ] Keyboard navigation
- [ ] Screen reader
- [ ] Lighthouse (90+ на всех метриках)

---

## 🎯 КРИТИЧЕСКИЕ ПРАВИЛА

### ❌ НЕЛЬЗЯ:
- Использовать localStorage/sessionStorage в artifacts
- Использовать кастомные Tailwind классы (только core)
- Импортировать скрипты кроме cdnjs.cloudflare.com
- Создавать сложные фоновые слои
- Перегружать анимациями

### ✅ МОЖНО И НУЖНО:
- React state для хранения данных
- Tailwind core utility classes
- Framer Motion для анимаций
- Semantic HTML5
- CSS переменные для тем
- Минималистичный дизайн
- Glass-morphism эффекты
- Плавные transitions

---

## 📊 ОЖИДАЕМЫЙ РЕЗУЛЬТАТ

### Главная страница:
1. **Hero** - чистый фон, крупный заголовок, фото справа
2. **About + Stack** - 2 glass карточки с информацией
3. **Portfolio** - веер из 5 проектов с модалами
4. **Contact** - code block + социальные иконки

### Страница /portfolio:
- Grid всех проектов (адаптивный)
- Те же карточки и модалы
- Back navigation

### Общее:
- Две темы (светлая/темная)
- Полная адаптивность
- Плавные анимации
- Отличная accessibility
- 90+ Lighthouse score
- Минималистичный, профессиональный дизайн
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  flow?: {
    input: string;
    process: string;
    output: string;
  };
  codeHighlight?: {
    title: string;
    code: string;
    language: string;
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'AIBRO Business',
    category: 'Full-Stack SaaS / B2B Platform',
    description:
      'Создать production-ready SaaS платформу с нуля. Реализовать full-stack приложение, включающее аутентификацию (JWT + Telegram), прием крипто-платежей (USDT/TON) и полноценный личный кабинет пользователя для управления подписками.',
    tech: [
      'React 19',
      'TS',
      'React Query',
      'Prisma',
      'PostgreSQL',
      'Express',
      'Playwright',
      'Vercel',
      'Railway',
    ],
    image: '/images/project-airbro-dark.jpg',
    liveUrl: 'https://aibro.io',
    githubUrl: 'https://github.com/Sskutushev/aibro',
    flow: {
      input:
        'Создать production-ready SaaS платформу с нуля. Реализовать full-stack приложение, включающее аутентификацию (JWT + Telegram), прием крипто-платежей (USDT/TON) и полноценный личный кабинет пользователя для управления подписками.',
      process:
        'Архитектура Monorepo. Frontend на Vercel (React 19, Vite, React Query, Zod, Framer Motion). Backend на Railway (Node.js, Express, Prisma, PostgreSQL). Бэкенд построен по слоеной архитектуре (Routes → Controllers → Services → Repositories). Настроен полный CI/CD-пайплайн с E2E-тестированием на Playwright.',
      output:
        'Масштабируемая, безопасная и полностью документированная SaaS-платформа. Включает многоязычную поддержку (i18n), смену тем, защищенный дашборд и автоматизированный CI/CD. Проект полностью соответствует лучшим практикам безопасности (OWASP).',
    },
    codeHighlight: {
      title: 'Automated CI/CD Pipeline (Backend Testing)',
      code: `
  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: airbro_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: cd backend && npm ci

      - name: Run migrations
        run: cd backend && npm run prisma:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/airbro_test

      - name: Run tests
        run: cd backend && npm test -- --run --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/airbro_test
          JWT_SECRET: test_secret_key_for_ci_pipeline`,
      language: 'yaml',
    },
  },
  {
    id: 2,
    title: 'Lumi',
    category: 'PWA / Task Management',
    description:
      'Я решил сделать свой, собственный Task Manager (Lumi). Я не хотел компромиссов: он должен быть быстрым, работать оффлайн и быть максимально защищенным (проект сделан мной, от и до).',
    tech: [
      'React 18 / TS',
      'TanStack Query',
      'Optimistic UI',
      'PWA / Offline',
      'Supabase RLS',
    ],
    image: '/images/Lumi.jpg',
    githubUrl: 'https://github.com/Sskutushev/lumi',
    flow: {
      input:
        'Я решил сделать свой, собственный Task Manager (Lumi). Я не хотел компромиссов: он должен быть быстрым, работать оффлайн и быть максимально защищенным (проект сделан мной, от и до).',
      process:
        'Архитектура и Стек: Чистый React 18, TypeScript, Vite. Бэкенд и Realtime полностью на Supabase. Скорость (Performance): Я добился мгновенного отклика (Optimistic UI) и включил PWA с умным кэшированием (NetworkFirst для API). Безопасность (Security): Настроил Row Level Security (RLS) в PostgreSQL, чтобы гарантировать, что каждый пользователь видит только свои данные. Вся входящая data строго валидируется на клиенте через Zod. Надежность: Все ошибки отслеживаются в реальном времени через Sentry. Конфигурация Vercel включает необходимые Security Headers (X-XSS-Protection, X-Frame-Options). DevOps: Внедрил Husky и Commitlint для принудительного соблюдения конвенции коммитов.',
      output:
        'Я создал полноценное PWA-приложение, которое работает как нативное. Это высокопроизводительный продукт с защищенным API-слоем и возможностью оффлайн-работы, полностью спроектированный и реализованный мною в одиночку.',
    },
    codeHighlight: {
      title: 'Optimistic Update с Rollback',
      code: `
// src/hooks/mutations/useCreateTask.ts
// Обеспечивает мгновенное обновление UI до получения ответа от сервера (Optimistic UI)
// и автоматический откат (Rollback) при ошибке, чтобы UI не врал пользователю.

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksAPI } from '../../lib/api/tasks.api';
import { Task, TaskInput } from '../../types/api.types';

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const tasksKey = ['tasks']; // Ключ кэша для списка задач

  return useMutation({
    mutationFn: (newTask: TaskInput) => tasksAPI.create(newTask),

    // 1. onMutate: Срабатывает перед вызовом API (начало Optimistic Update)
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: tasksKey }); // Блокируем фоновый рефетчинг

      const previousTasks = queryClient.getQueryData(tasksKey); // Сохраняем "снэпшот" данных

      // Оптимистическое обновление: добавляем временную задачу в UI
      const optimisticTask: Task = {
        ...newTask,
        id: 'optimistic-id-' + Date.now(), // Генерируем временный ID
        is_completed: false,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Task[]>(tasksKey, (oldTasks = []) => [
        optimisticTask,
        ...oldTasks,
      ]);

      return { previousTasks }; // Передаем снэпшот для отката
    },

    // 2. onError: Срабатывает при ошибке API
    onError: (err, newTask, context) => {
      // Откат (Rollback): возвращаем предыдущие данные в кэш
      if (context?.previousTasks) {
        queryClient.setQueryData(tasksKey, context.previousTasks);
      }
      // Логирование и оповещение Sentry
      console.error('Task creation failed, rolled back:', err);
    },

    // 3. onSettled: Вызывается всегда (успех или ошибка)
    onSettled: () => {
      // Инициируем фоновый рефетчинг для синхронизации с Supabase
      queryClient.invalidateQueries({ queryKey: tasksKey });
    },
  });
};`,
      language: 'typescript',
    },
  },
  {
    id: 3,
    title: 'NFT Marketplace',
    category: 'Test Assignment / E-commerce',
    description:
      'Разработать production-ready NFT marketplace с адаптивной версткой по Figma-дизайну (Desktop 1440 / Tablet 1024 / Mobile 375). Интегрировать CoinGecko API для получения NFT данных, реализовать сложную карусель с таймерами, генерацию случайных ставок и создать engaging user experience с плавными GSAP-анимациями.',
    tech: [
      'Next.js 14',
      'TypeScript',
      'Redux Toolkit',
      'GSAP',
      'Swiper.js',
      'PWA',
    ],
    image: '/images/nft-market.jpg',
    githubUrl: 'https://github.com/Sskutushev/marketplace',
    flow: {
      input:
        'Разработать production-ready NFT marketplace с адаптивной версткой по Figma-дизайну (Desktop 1440 / Tablet 1024 / Mobile 375). Интегрировать CoinGecko API для получения NFT данных, реализовать сложную карусель с таймерами, генерацию случайных ставок и создать engaging user experience с плавными GSAP-анимациями.',
      process:
        'Архитектура: Next.js 14 App Router + TypeScript strict mode с Redux Toolkit для глобального состояния. Модульная структура (components, hooks, services, store, utils) с полным разделением ответственности по Clean Architecture принципам. Анимационная система: - GSAP Timeline для hero-секции (stagger animations, ease curves) - Canvas API для particle background (60 FPS, adaptive particle count) - requestAnimationFrame для счетчиков с cubic ease-out easing - Framer Motion паттерны для micro-interactions - Intersection Observer для lazy-loading анимаций UI/UX Особенности: - Pixel-perfect верстка с точностью до 1px по Figma - SCSS Modules + Variables + Mixins для масштабируемости - Адаптивные breakpoints: 1920px / 1440px / 1024px / 375px - Sticky header с backdrop-filter blur эффектом - Mobile burger menu с плавной трансформацией - Hover states с активными зонами и transitions Real-time Features: - WebSocket integration (coincap.io) для live price updates - Auto-reconnection с exponential backoff (5 attempts, 3s delay) - Fallback механизм: каждые 5 секунд если WS недоступен - Live badge индикатор на NFT карточках - Countdown таймеры с обновлением каждую секунд Data Layer: - CoinGecko API + fallback на mock данные (10 NFT) - Redux async thunks для асинхронных операций - Случайная генерация: bid (0.5-5 ETH), endTime (+1-24h), images (5 вариантов) - Сортировка NFT по текущей ставке (desc) - Error boundaries для graceful error handling Performance Optimizations: - React.memo на NFTCard с custom comparison - useMemo для сортировки массива NFT - useCallback для event handlers - Canvas optimization: 30 particles (mobile) vs 50 (desktop) - Performance Monitor для dev mode (frame time tracking) - Bundle Analyzer для size optimization PWA Implementation: - next-pwa с Service Workers для offline support - Web App Manifest (standalone mode, theme color) - Installable на mobile и desktop - Caching strategy для assets и API responses Testing & Quality: - Jest + React Testing Library для unit тестов - Playwright для E2E тестирования (carousel navigation, mobile menu, timers) - TypeScript strict mode с полной типизацией - ESLint + Prettier для code quality - Coverage для критичных компонентов DevOps: - Docker multi-stage build (deps → builder → runner) - docker-compose с healthcheck - Оптимизированный размер образа через alpine + standalone - Environment variables для production/development',
      output:
        'Production-ready NFT marketplace с pixel-perfect дизайном, real-time WebSocket updates, 60 FPS анимациями и full PWA support. Проект демонстрирует глубокое понимание современного frontend стека, Clean Architecture принципов, performance optimization техник и создания engaging user experience. Ключевые достижения: - Pixel-perfect верстка (95% точность по Figma комментариям) - GSAP Timeline анимации с точным timing - WebSocket real-time updates с fallback стратегией - Canvas Particles background (60 FPS на всех устройствах) - PWA с offline support и installability - Unit + E2E тесты для критичных flow - Docker production-ready deployment - TypeScript strict mode (0 any types в core logic) - Performance optimizations (memo, useMemo, requestAnimationFrame) - Engaging UX с micro-interactions и countdown таймерами',
    },
    codeHighlight: {
      title: 'GSAP Timeline Hero Animation',
      code: `
// components/Hero/HeroSection.tsx
useEffect(() => {
  if (!isVisible) return;

  const isMobile = window.innerWidth <= 900;
  const config = { ease: 'power3.out', duration: 0.8 };

  const tl = gsap.timeline({ defaults: config });

  // Последовательная анимация элементов
  tl.fromTo(headline, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
    .fromTo(subheadline, { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .fromTo(buttonGroup, { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .fromTo([image1, image2], { x: 100, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1 }, '-=0.6')
    .fromTo(image3, { opacity: 0 },
            { opacity: 1, duration: 0.6 }, '-=0.2');

  // Cleanup will-change после анимации
  tl.eventCallback('onComplete', () => {
    mainRef.current?.classList.add(styles.animated);
  });

  return () => tl.kill();
}, [isVisible]);
// Плавная последовательность: Текст → Кнопки → Изображения с stagger эффектом и оптимизацией will-change.
`,
      language: 'typescript',
    },
  },
  {
    id: 4,
    title: 'Yokai Threat Matrix',
    category: 'PWA / Real-Time Dashboard',
    description:
      'Разработать SPA-дашборд для мониторинга духовных аномалий (ёкаев) в реальном времени. Операторы должны видеть всплески энергии и отправлять "отряды зачистки". Требования: строгий Feature-Sliced Design, SSE для live updates, оптимистичные обновления с 30% вероятностью ошибки, Docker deployment.',
    tech: [
      'Next.js 14 App Router',
      'Feature-Sliced Design',
      'TanStack Query',
      'SSE',
      'Optimistic UI',
      'Zod Validation',
      'Docker',
    ],
    image: '/images/yokai.jpg',
    githubUrl: 'https://github.com/Sskutushev/yokai',
    flow: {
      input:
        'Разработать SPA-дашборд для мониторинга духовных аномалий (ёкаев) в реальном времени. Операторы должны видеть всплески энергии и отправлять "отряды зачистки". Требования: строгий Feature-Sliced Design, SSE для live updates, оптимистичные обновления с 30% вероятностью ошибки, Docker deployment.',
      process:
        'Архитектура: Строгий Feature-Sliced Design с изолированными layers (app/pages/widgets/features/entities/shared). Каждый slice независим — новые фичи добавляются без рефакторинга. Real-Time: Server-Sent Events вместо WebSocket для однонаправленного потока. Каждые 5 секунд случайный yokai меняет threat level. Интеграция с React Query cache — UI обновляется мгновенно без re-fetching. State Management: TanStack Query с Optimistic Updates. UI меняется до ответа сервера, при ошибке (30% вероятность) автоматический rollback. Паттерн из Trello/Linear. Type Safety: TypeScript strict mode + Zod для runtime-валидации всех API входов/выходов. Schemas документируют контракты и защищают от невалидных данных. Testing & CI/CD: Test Pyramid (Jest + Playwright), 67% coverage. GitHub Actions pipeline: lint → test → build → e2e. Husky hooks для commitlint и lint-staged. DevOps: Docker Compose для one-command deployment. Nginx для production-ready serving.',
      output:
        'Production-ready дашборд с real-time SSE, надежной архитектурой FSD, автоматизированным тестированием и полным CI/CD циклом. Проект демонстрирует понимание enterprise-паттернов: от optimistic updates до deployment automation. Сверх нормы: Полное тестовое покрытие (unit/integration/e2e), CI/CD pipeline с quality gates, Архитектурная документация (docs/), Git hooks для code quality.',
    },
    codeHighlight: {
      title: 'Optimistic Updates с Rollback',
      code: `
// features/capture-anomaly/model/use-capture.ts
useMutation({
  // 🎯 UI обновляется мгновенно
  onMutate: async (anomalyId) => {
    await queryClient.cancelQueries(['anomalies']);
    const previous = queryClient.getQueryData(['anomalies']);

    queryClient.setQueryData(['anomalies'], (old) =>
      old?.map(a => a.id === anomalyId
        ? {...a, status: 'captured'}
        : a
      )
    );

    return { previous };
  },

  // 🔄 Автоматический откат при ошибке (30%)
  onError: (_err, _id, context) => {
    queryClient.setQueryData(['anomalies'], context?.previous);
    toast.error('Yokai escaped!');
  }
});
// Паттерн из Trello/Linear: Мгновенный feedback пользователю, автоматический rollback без дополнительной логики.
`,
      language: 'typescript',
    },
  },
  {
    id: 10,
    title: 'TOT',
    category: 'Placeholder',
    description: 'Placeholder project description.',
    tech: ['React', 'TypeScript'],
    image: '/images/project-tot.jpg',
  },
  {
    id: 11,
    title: 'Portfolio',
    category: 'Personal / Open Source',
    description:
      'Портфолио-сайт, который сам по себе является демонстрацией навыков: от архитектуры до доступности.',
    tech: [
      'React 19',
      'TypeScript',
      'Vite 7',
      'Tailwind CSS',
      'Framer Motion',
      'Vitest',
      'Playwright',
    ],
    image: '/images/project-portfolio-light.jpg',
    flow: {
      input:
        'Создать портфолио-сайт, который сам по себе является демонстрацией навыков: от архитектуры до доступности.',
      process:
        '🎨 Уникальные фишки: • Полный CI/CD Pipeline Автоматический деплой через GitHub Actions Lighthouse CI для каждого PR Codecov для отслеживания покрытия Автоматическое создание релизов • 100% Accessibility Клавиатурная навигация со Skip Links Focus Trap в модальных окнах Поддержка prefers-reduced-motion Тестирование с Axe-core и скринридерами • Performance-first подход LazyImage с Intersection Observer OptimizedVideo с WebM/MP4 fallback Code splitting и tree shaking Critical CSS инлайнинг • Тестирование на всех уровнях Unit тесты (Vitest + RTL) E2E тесты (Playwright) Accessibility тесты (jest-axe) Visual regression тесты • Developer Experience Pre-commit hooks с Husky Conventional Commits TypeScript strict mode Централизованная конфигурация анимаций',
      output:
        'Живой пример best practices: от архитектуры до документации. Каждый компонент протестирован, каждый коммит проверен, каждый деплой автоматизирован. Проект получил бейджи за качество и доступен как open source для изучения.',
    },
    codeHighlight: {
      title: 'Проект портфолио как демонстрация профессиональных практик',
      code: `
typescript// Performance Optimization Pattern
// src/components/common/LazyImage.tsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={className}
      onLoad={() => setIsLoaded(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

// Accessibility Pattern
// src/hooks/useFocusTrap.ts
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
};

// Testing Pattern
// accessibility.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('Header should not have violations', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle keyboard navigation', async () => {
    render(<ContactSection />);

    // Tab through form fields
    await userEvent.tab();
    expect(screen.getByLabelText(/name/i)).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByLabelText(/contact/i)).toHaveFocus();
  });
});

// CI/CD Pipeline Pattern
// .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e

  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse:ci

  deploy-production:
    needs: [lint-and-typecheck, unit-tests, e2e-tests, accessibility-tests]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      }
};
`,
      language: 'typescript',
    },
  },
  {
    id: 5,
    title: 'MovieCatalog',
    category: 'React SPA / Movie Discovery',
    description:
      'Разработать SPA-каталог фильмов с поиском по названию, фильтрацией по категориям и детальным просмотром. Требования: адаптивная верстка, семантическая разметка, обработка ошибок, оптимизация производительности, анимации. Тестовое задание для позиции Junior Frontend Developer.',
    tech: [
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
      'Vitest',
      '87% Test Coverage',
    ],
    image: '/images/cinemawhite.jpg',
    flow: {
      input:
        'Разработать SPA-каталог фильмов с поиском по названию, фильтрацией по категориям и детальным просмотром. Требования: адаптивная верстка, семантическая разметка, обработка ошибок, оптимизация производительности, анимации. Тестовое задание для позиции Junior Frontend Developer.',
      process:
        'Архитектура: Feature-based структура с разделением на layers (components/features/entities/shared). React 18 + TypeScript для type safety, React Router для навигации между страницами. UI/UX: Tailwind CSS для utility-first подхода, Framer Motion для плавных анимаций карточек и модальных окон. Реализована темная/светлая тема с переключателем и сохранением в localStorage. State & Performance: - Debounced search (300ms) через custom hook для оптимизации запросов - Lazy loading изображений с loading="lazy" - Code splitting через React.lazy для детальной страницы - Pagination с "Load More" вместо бесконечного скролла Type Safety: TypeScript strict mode + типизация всех props и state. Интерфейсы для Movie, FilterCategory, Theme. Testing & Quality: - Vitest + React Testing Library - 87% test coverage (unit + integration тесты) - Тесты для всех компонентов и hooks - ESLint + TypeScript для code quality',
      output:
        'Production-ready каталог фильмов с адаптивным дизайном, темной темой, поиском с debounce, категориальной фильтрацией и детальными страницами. Проект демонстрирует понимание React ecosystem, оптимизации производительности и best practices тестирования. Сверх нормы (+50%): - Модальное окно с деталями фильма - Детальная страница с роутингом - Dark/Light theme switcher - 87% test coverage (требования не было) - Skeleton loaders для UX - Scroll to top button',
    },
    codeHighlight: {
      title: 'Debounced Search Hook',
      code: `// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// components/features/SearchBar/SearchBar.tsx
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (/* ... */);
};
// Оптимизация: Поиск срабатывает только через 300мс после прекращения ввода, снижая нагрузку на фильтрацию в 10+ раз.`,
      language: 'typescript',
    },
  },
  {
    id: 6,
    title: 'Courses Catalog',
    category: 'Test Assignment / Catalog',
    description:
      'Мне было дано стандартное ТЗ: сверстать и "оживить" каталог курсов (поиск, фильтры, пагинация) на чистом стеке HTML/SCSS/Vanilla JS. Моя цель была превратить его из тестового задания в архитектурно надежный и готовый к продакшену проект.',
    tech: [
      'Vanilla JS / ES6',
      'BEM / SCSS / Fluid Grid',
      'WCAG 2.1 AA',
      'Jest Coverage (>70%)',
      'GitHub Actions',
      'Docker / Nginx',
    ],
    image: '/images/Course.jpg',
    flow: {
      input:
        'Мне было дано стандартное ТЗ: сверстать и "оживить" каталог курсов (поиск, фильтры, пагинация) на чистом стеке HTML/SCSS/Vanilla JS. Моя цель была превратить его из тестового задания в архитектурно надежный и готовый к продакшену проект.',
      process:
        'Frontend Architecture: Реализовал всю логику в виде чистого ES6-класса CourseCatalog с четким разделением ответственности (BEM-методология для стилей, cacheDOM, render, handleEvent для логики). Это обеспечивает чистый, тестируемый код. Производительность и UI: Добился Sub-50KB размера ассетов. Интегрировал Live Search с Debounce (300ms) и пагинацию с плавным появлением (CSS-каскадная анимация) для оптимального UX. Доступность (A11y): Полное соответствие WCAG 2.1 Level AA (ARIA, фокус-менеджмент, семантический HTML), что является критическим требованием для современных систем. Тестирование: Настроил Jest с покрытием >70% (Unit, E2E), гарантируя надежность всей бизнес-логики (фильтрация, поиск, пагинация). DevOps & Deployment: Внедрил GitHub Actions CI/CD для автоматического запуска линтеров/тестов и сборки. Проект контейнеризирован в Docker с Nginx для безопасного и оптимизированного развертывания.',
      output:
        'Я создал Production-Ready каталог с идеальным Lighthouse Score, надежной Vanilla JS архитектурой и полной автоматизацией. Этот проект демонстрирует, что я могу самостоятельно взять на себя ответственность за полный цикл разработки: от pixel-perfect верстки и архитектуры до тестирования, оптимизации и развертывания.',
    },
    codeHighlight: {
      title: 'Чистая Архитектура (Class-Based Vanilla JS)',
      code: `/**
 * Класс CourseCatalog: инкапсулирует всю логику приложения,
 * имитируя компонентный подход без использования фреймворков.
 */
class CourseCatalog {
    // Начальное состояние
    constructor() {
        this.courses = coursesData;
        this.filteredCourses = [...this.courses];
        this.itemsToShow = 9;
        this.searchQuery = '';
        this.activeCategory = 'all';
        this.debounceTimeout = null;

        this.init(); // Запуск инициализации
    }

    /**
     * Кэширование DOM-элементов:
     * Запрос к DOM происходит только один раз при инициализации.
     * Это повышает производительность и чистоту кода.
     */
    cacheDOM() {
        this.coursesGrid = document.getElementById('coursesGrid');
        this.loadMoreButton = document.getElementById('loadMoreButton');
        this.tabButtons = document.querySelectorAll('.tabs__item[data-category]');
        this.searchInput = document.getElementById('searchInput');
        this.courseCountElement = document.getElementById('courseCount');
    }

    /**
     * Настройка обработчиков событий:
     * Отдельный метод для привязки всех событий.
     * Включает дебаунс для поискового ввода.
     */
    bindEvents() {
        // Debounce для поискового ввода
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
                this.handleSearch(this.sanitizeInput(e.target.value));
            }, 300); // 300ms Debounce
        });

        // Клик по вкладкам
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleFilter(button.dataset.category);
            });
        });

        // Кнопка "Загрузить ещё"
        this.loadMoreButton.addEventListener('click', this.handleLoadMore.bind(this));
    }

    /**
     * Основной метод для применения фильтрации и поиска.
     */
    filterCourses() {
        let result = this.courses.filter(course => {
            // 1. Фильтрация по категории
            const categoryMatch = this.activeCategory === 'all' || course.category === this.activeCategory;

            // 2. Поиск по названию
            const searchMatch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase());

            return categoryMatch && searchMatch;
        });

        this.filteredCourses = result;
        this.itemsToShow = 9; // Сброс пагинации при каждом изменении фильтра/поиска
        this.renderCourses();
    }

    // ... прочие методы (renderCourses, updateCounts, handleLoadMore, sanitizeInput)
}`,
      language: 'javascript',
    },
  },
  {
    id: 7,
    title: 'SPARTSPRO',
    category: 'E-commerce / Corporate',
    description:
      'Разработать современный e-commerce сайт для компании, специализирующейся на продаже лифтовых канатов, ремней и комплектующих. Требования: точное соответствие дизайн-макету, полный рефакторинг legacy-верстки, адаптивность, кроссбраузерность и готовность к масштабированию.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/project-vangogh.jpg',
    flow: {
      input:
        'Разработать современный e-commerce сайт для компании, специализирующейся на продаже лифтовых канатов, ремней и комплектующих. Требования: точное соответствие дизайн-макету, полный рефакторинг legacy-верстки, адаптивность, кроссбраузерность и готовность к масштабированию.',
      process:
        'Проект реализован на React + TypeScript с упором на типобезопасность и переиспользуемость компонентов. Выполнена адаптивная верстка под все основные разрешения. Каталог и карточки товаров реализованы с учётом бизнес-логики (статусы наличия, CTA, навигация). Дополнительно внедрены: семантическая HTML-структура, полная a11y-поддержка (ARIA, клавиатурная навигация, фокус-стейты), кроссбраузерная совместимость, UI-паттерны: карточки товаров, табы, навигационные меню, CTA-блоки, unit-тесты для ключевых элементов (кнопки, карточки, вкладки, страницы, корзина)',
      output:
        'Полнофункциональный e-commerce интерфейс, готовый к продакшену: удобный каталог, понятная навигация, адаптивный дизайн, улучшенная доступность и стабильная работа в разных браузерах. Проект соответствует требованиям бизнеса и легко масштабируется под рост ассортимента.',
    },
    codeHighlight: {
      title: 'Product Catalog & Accessibility-Ready UI',
      code: `// src/components/ProductCard/ProductCard.tsx
interface ProductCardProps {
  title: string;
  status: 'in-stock' | 'on-order';
  quantity?: number;
  onDetails: () => void;
}

export const ProductCard = ({
  title,
  status,
  quantity,
  onDetails,
}: ProductCardProps) => {
  return (
    <article
      className="product-card"
      aria-label(\`Product: \${title}\`)
    >
      <h3>{title}</h3>

      <p aria-live="polite">
        {status === 'in-stock'
          ? \`В наличии \${quantity} м.\`
          : 'Под заказ'}
      </p>

      <button
        onClick={onDetails}
        aria-label="Подробнее о товаре"
      >
        Подробнее
      </button>
    </article>
  );
};`,
      language: 'typescript',
    },
  },
  {
    id: 8,
    title: 'DexFlow',
    category: 'Web3 / SocialFi / DEX',
    description:
      'Децентрализованная биржа с социальными функциями для трейдеров. Гибридная платформа, объединяющая торговлю криптовалютой (спот/фьючерсы/опционы) с социальной сетью: лента постов, профили, копи-трейдинг.',
    tech: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
    ],
    image: '/images/dexwhite.jpg',
    flow: {
      input:
        'Децентрализованная биржа с социальными функциями для трейдеров. Гибридная платформа, объединяющая торговлю криптовалютой (спот/фьючерсы/опционы) с социальной сетью: лента постов, профили, копи-трейдинг.',
      process:
        'React + TypeScript для типобезопасности. Tailwind CSS для utility-first стилизации с темизацией через CSS-переменные. Framer Motion для анимаций. React Router для SPA-навигации. Централизованные mock-данные в src/mock/ с единой системой категоризации контента (popular/hot/trending). Разделение компонентов по фичам (exchange/feed/profile/copytrading).',
      output:
        'Полнофункциональный прототип с 8 страницами: лендинг, торговый интерфейс с графиками, социальная лента (3 категории постов), профили с портфелем, 15 стратегий копи-трейдинга с метриками. Адаптивный дизайн, система тематизации dark/light, готовая структура для Web3-интеграции.',
    },
    codeHighlight: {
      title: 'Умная категоризация контента (единый источник для 3 лент)',
      code: `// src/mock/mock-api.js
const mockPosts = [
  {
    id: 1,
    type: 'popular',
    author: { name: 'CryptoBull', address: '0x123...abc' },
    timestamp: '2 часа назад',
    content: 'BTC готовится к новому рывку! 🚀',
    likes: 125,
    views: 1200,
  },
  {
    id: 4,
    type: 'hot',
    author: { name: 'Blockchain_Dev', address: '0xabc...jkl' },
    timestamp: '30 минут назад',
    content: 'Развернул новый смарт-контрaкт на Polygon.',
    likes: 50,
    views: 300,
  },
  {
    id: 6,
    type: 'trending',
    author: { name: 'Web3_Innovator', address: '0xfgh...pqr' },
    timestamp: '10 минут назад',
    content: 'Обсуждаем будущее DAO.',
    likes: 20,
    views: 150,
  },
];

export const getPosts = (type = 'popular') => {
  if (type === 'all') return mockPosts;
  return mockPosts.filter(post => post.type === type);
};

// Использование
const FeedPage = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const posts = getPosts(activeTab); // Автоматическая фильтрация!

  return posts.map(post => <PostCard key={post.id} {...post} />);
};`,
      language: 'javascript',
    },
  },
];

export const projects: Project[] = projectsData;

export const allProjects: Project[] = projectsData;

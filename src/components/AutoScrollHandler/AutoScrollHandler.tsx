import React, { useEffect, useRef, useState, useCallback } from 'react';

// Определение типа для NodeJS.Timeout
type TimeoutID = ReturnType<typeof setTimeout>;

interface AutoScrollHandlerProps {
  children: React.ReactNode;
}

const AutoScrollHandler: React.FC<AutoScrollHandlerProps> = ({ children }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const tickingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const sectionsRef = useRef<Element[]>([]);
  const currentIndexRef = useRef(0);
  const isMobileRef = useRef(false);
  const scrollThresholdRef = useRef(0); // Порог прокрутки для срабатывания автоскролла
  const scrollTimerRef = useRef<TimeoutID | null>(null); // Таймер для отслеживания времени прокрутки

  // Проверяем, является ли устройство мобильным
  useEffect(() => {
    const checkIfMobile = () => {
      isMobileRef.current = window.innerWidth <= 768;
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Получить индекс текущей видимой секции
  const getCurrentSectionIndex = (): number => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = 0; i < sectionsRef.current.length; i++) {
      const section = sectionsRef.current[i];
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.pageYOffset;
      const sectionBottom = sectionTop + section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return i;
      }
    }

    return -1;
  };

  // Прокрутка к секции
  const scrollToSection = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= sectionsRef.current.length ||
        isAutoScrolling ||
        isMobileRef.current
      )
        return;

      const section = sectionsRef.current[index];
      if (!section) return;

      setIsAutoScrolling(true);
      currentIndexRef.current = index;

      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Сброс состояния автопрокрутки после завершения анимации
      setTimeout(() => {
        setIsAutoScrolling(false);
      }, 1000); // Примерное время анимации
    },
    [isAutoScrolling]
  );

  // Обработка прокрутки
  const handleScroll = React.useCallback(() => {
    // Отключаем автоскролл на мобильных устройствах и во время автоскролла
    if (isAutoScrolling || isMobileRef.current) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
    lastScrollYRef.current = currentScrollY;

    // Увеличиваем порог прокрутки
    scrollThresholdRef.current += scrollDelta;

    // Если пользователь прокручивает слишком мало, не активируем автоскролл
    if (scrollThresholdRef.current < 50) {
      // Минимальный порог 50px
      // Сброс таймера, если он был
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      // Устанавливаем таймер для сброса порога через 100мс
      scrollTimerRef.current = setTimeout(() => {
        scrollThresholdRef.current = 0;
      }, 100);
      return;
    }

    if (!tickingRef.current) {
      tickingRef.current = true;

      // Оптимизируем вызов requestAnimationFrame
      requestAnimationFrame(() => {
        // Определяем направление прокрутки
        const scrollDirection =
          currentScrollY > lastScrollYRef.current ? 'down' : 'up';

        // Определяем целевую секцию в зависимости от направления прокрутки
        let targetIndex = currentIndexRef.current;

        if (scrollDirection === 'down') {
          targetIndex = Math.min(
            currentIndexRef.current + 1,
            sectionsRef.current.length - 1
          );
        } else {
          targetIndex = Math.max(currentIndexRef.current - 1, 0);
        }

        // Если индекс изменился, прокручиваем к новой секции
        if (targetIndex !== currentIndexRef.current) {
          scrollToSection(targetIndex);
          // Сбрасываем порог после автоскролла
          scrollThresholdRef.current = 0;
        }

        tickingRef.current = false;
      });
    }
  }, [isAutoScrolling, scrollToSection]);

  // Добавляем и удаляем обработчик прокрутки
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [handleScroll]);

  // Инициализация секций при монтировании
  useEffect(() => {
    // Найдем все секции на странице
    sectionsRef.current = Array.from(
      document.querySelectorAll('[data-auto-scroll-section]')
    );

    // Установим начальный индекс текущей секции
    const currentSectionIndex = getCurrentSectionIndex();
    if (currentSectionIndex !== -1) {
      currentIndexRef.current = currentSectionIndex;
    }

    lastScrollYRef.current = window.scrollY;
    scrollThresholdRef.current = 0; // Сброс порога при инициализации
  }, []);

  // Добавляем и удаляем обработчик прокрутки
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [handleScroll]);

  return <div>{children}</div>;
};

export default AutoScrollHandler;

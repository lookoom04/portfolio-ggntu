// scripts.js

// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');
  const contacts = document.querySelector('.contacts-section');
  const sections = document.querySelectorAll('section');

  // 1. Убираем прелоадер и включаем CSS-анимации
  window.addEventListener('load', () => {
    document.documentElement.classList.add('loaded');
  });

  // 2. Плавный скролл для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const offset = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  // 3. Меняем фон хедера при прокрутке
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // 4. Параллакс-эффекты
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // hero
    if (hero) {
      hero.style.backgroundPositionY = `${-scrollY * 0.3}px`;
    }
    // contacts
    if (contacts) {
      const top = contacts.offsetTop;
      if (scrollY + window.innerHeight > top) {
        const diff = scrollY + window.innerHeight - top;
        contacts.style.backgroundPositionY = `${-diff * 0.2}px`;
      }
    }
  });

  // 5. Intersection Observer для секций
  const ioOptions = {
    root: null,
    threshold: 0.1
  };

  const ioCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const section = entry.target;
      // добавляем видимость секции
      section.classList.add('is-visible');

      // staggered animation для прямых детей
      const items = section.querySelectorAll('h2, p, li, .admission__link, .about__list li');
      items.forEach((el, i) => {
        el.style.animation = `fadeInUp 0.6s ease-out forwards`;
        el.style.animationDelay = `${i * 0.15 + 0.2}s`;
      });

      observer.unobserve(section);
    });
  };

  const observer = new IntersectionObserver(ioCallback, ioOptions);
  sections.forEach(sec => observer.observe(sec));
});

// scripts.js (добавить в конец файла)
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });
});

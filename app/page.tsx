export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">

      {/* Навбар */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-widest">
            <span style={{color: '#F5A800'}}>DU</span>
            <span className="text-white">CANI</span>
          </span>
        </div>
        <div className="flex gap-8 text-sm text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Кроссовки</a>
          <a href="#" className="hover:text-white transition-colors">Одежда</a>
          <a href="#" className="hover:text-white transition-colors">Аксессуары</a>
          <a href="#" className="hover:text-white transition-colors">Бренды</a>
        </div>
        <div className="flex gap-3">
          <button className="text-zinc-400 hover:text-white text-sm transition-colors px-4 py-2">
            Войти
          </button>
          <button style={{backgroundColor: '#F5A800'}} className="text-black px-6 py-2 text-sm font-black hover:opacity-90 transition-opacity">
            ПРОДАТЬ
          </button>
        </div>
      </nav>

      {/* Герой секция */}
      <section className="relative px-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-black" />
        <div className="relative z-10 max-w-4xl">
          <p style={{color: '#F5A800'}} className="text-xs font-bold tracking-[0.3em] mb-6">
            ТОЛЬКО ОРИГИНАЛ • ГАРАНТИЯ ПОДЛИННОСТИ
          </p>
          <h2 className="text-7xl font-black leading-none tracking-tight mb-8">
            ПОКУПАЙ<br />
            <span style={{color: '#F5A800'}}>ОРИГИНАЛ.</span><br />
            ПРОДАВАЙ<br />
            УВЕРЕННО.
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-lg">
            Первый маркетплейс СНГ с верификацией подлинности. Кроссовки, одежда и аксессуары — только оригиналы.
          </p>
          <div className="flex gap-4">
            <button style={{backgroundColor: '#F5A800'}} className="text-black px-10 py-4 font-black text-sm tracking-widest hover:opacity-90 transition-opacity">
              КАТАЛОГ
            </button>
            <button className="border border-zinc-700 text-white px-10 py-4 text-sm tracking-widest hover:border-yellow-400 transition-colors">
              КАК ЭТО РАБОТАЕТ
            </button>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="border-y border-zinc-900 px-10 py-10 grid grid-cols-3 gap-0">
        <div className="border-r border-zinc-900 pr-10">
          <p style={{color: '#F5A800'}} className="text-4xl font-black">10K+</p>
          <p className="text-zinc-500 text-sm mt-1">Товаров в каталоге</p>
        </div>
        <div className="border-r border-zinc-900 px-10">
          <p style={{color: '#F5A800'}} className="text-4xl font-black">100%</p>
          <p className="text-zinc-500 text-sm mt-1">Гарантия подлинности</p>
        </div>
        <div className="pl-10">
          <p style={{color: '#F5A800'}} className="text-4xl font-black">3</p>
          <p className="text-zinc-500 text-sm mt-1">Страны СНГ</p>
        </div>
      </section>

      {/* Категории */}
      <section className="px-10 py-20">
        <div className="flex items-center justify-between mb-10">
          <p className="text-xs text-zinc-500 tracking-[0.3em]">КАТЕГОРИИ</p>
          <a href="#" style={{color: '#F5A800'}} className="text-xs tracking-widest hover:opacity-70">
            ВСЕ КАТЕГОРИИ →
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-zinc-900 p-10 hover:border-yellow-400 transition-all cursor-pointer group">
            <p className="text-4xl mb-6">👟</p>
            <p className="font-black text-xl mb-1 group-hover:text-yellow-400 transition-colors">КРОССОВКИ</p>
            <p className="text-zinc-600 text-sm">Nike · Adidas · Jordan · New Balance</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-10 hover:border-yellow-400 transition-all cursor-pointer group">
            <p className="text-4xl mb-6">👕</p>
            <p className="font-black text-xl mb-1 group-hover:text-yellow-400 transition-colors">ОДЕЖДА</p>
            <p className="text-zinc-600 text-sm">Supreme · Off-White · Stone Island</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-10 hover:border-yellow-400 transition-all cursor-pointer group">
            <p className="text-4xl mb-6">👜</p>
            <p className="font-black text-xl mb-1 group-hover:text-yellow-400 transition-colors">АКСЕССУАРЫ</p>
            <p className="text-zinc-600 text-sm">Сумки · Часы · Украшения</p>
          </div>
        </div>
      </section>

      {/* Как работает */}
      <section className="border-t border-zinc-900 px-10 py-20">
        <p className="text-xs text-zinc-500 tracking-[0.3em] mb-16">КАК РАБОТАЕТ DUCANI</p>
        <div className="grid grid-cols-3 gap-16">
          <div>
            <p style={{color: '#F5A800'}} className="text-6xl font-black mb-6">01</p>
            <p className="font-black text-lg mb-3">Продавец отправляет товар</p>
            <p className="text-zinc-500 text-sm leading-relaxed">Загружает фото и отправляет нам на проверку в верификационный центр</p>
          </div>
          <div>
            <p style={{color: '#F5A800'}} className="text-6xl font-black mb-6">02</p>
            <p className="font-black text-lg mb-3">Эксперты проверяют</p>
            <p className="text-zinc-500 text-sm leading-relaxed">Наши специалисты верифицируют подлинность каждого товара вручную</p>
          </div>
          <div>
            <p style={{color: '#F5A800'}} className="text-6xl font-black mb-6">03</p>
            <p className="font-black text-lg mb-3">Покупатель получает оригинал</p>
            <p className="text-zinc-500 text-sm leading-relaxed">Доставка с сертификатом подлинности DUCANI</p>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t border-zinc-900 px-10 py-8 flex justify-between items-center">
        <span className="font-black tracking-widest">
          <span style={{color: '#F5A800'}}>DU</span>CANI
        </span>
        <p className="text-zinc-700 text-sm">© 2025 DUCANI. Все права защищены.</p>
        <div className="flex gap-6 text-zinc-600 text-sm">
          <a href="#" className="hover:text-white">О нас</a>
          <a href="#" className="hover:text-white">Верификация</a>
          <a href="#" className="hover:text-white">Контакты</a>
        </div>
      </footer>

    </main>
  )
}
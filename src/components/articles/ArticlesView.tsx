import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  readTime: string;
  content?: string;
}

const initialArticles: Article[] = [
  {
    id: 1,
    title: 'Гастрономические туры по городу: лучшие рестораны с авторской кухней',
    excerpt: 'Discover the most unique and unexpected places that locals love...',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800',
    readTime: '5',
    content: 'Если вы цените не только вкус еды, но и творческий подход к её приготовлению, гастрономический тур по ресторанам с авторской кухней — это то, что вам нужно. В этой статье мы расскажем о нескольких ресторанах, которые предложат вам совершенно новый взгляд на гастрономию.\n\nВ последние годы авторская кухня стала настоящим трендом в кулинарном мире. Шеф-повара экспериментируют с текстурами, вкусами и подачей блюд, создавая настоящие произведения искусства. Мы посетили несколько таких заведений и готовы поделиться своими впечатлениями.\n\nПервым в нашем списке стоит ресторан "Гастроном". Здесь шеф-повар использует только локальные продукты, но готовит их с использованием современных техник молекулярной кухни. Особенно впечатляет десертное меню, где каждое блюдо — это маленький спектакль.\n\nСледующая остановка — "Корень". Этот ресторан специализируется на современной интерпретации традиционной русской кухни. Здесь вы найдете знакомые с детства вкусы в совершенно новом исполнении.\n\nЗавершает наш тур ресторан "Облако". Расположенный на верхнем этаже современного здания, он предлагает не только великолепные блюда, но и потрясающий вид на город. Меню обновляется каждый сезон, чтобы использовать самые свежие сезонные продукты.'
  },
  {
    id: 2,
    title: 'Food Festival Guide 2024',
    excerpt: 'Your complete guide to all the upcoming food festivals...',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    readTime: '7',
    content: 'Фестивали еды стали неотъемлемой частью городской культуры, и 2024 год обещает быть особенно насыщенным на такие события. В этом гиде мы расскажем о самых интересных фестивалях, которые пройдут в ближайшие месяцы.\n\nВесенний фестиваль уличной еды\nЭто первое крупное событие года, которое традиционно открывает сезон гастрономических фестивалей. В этом году организаторы обещают собрать более 50 фудтраков и поп-ап ресторанов со всей страны. Особое внимание будет уделено азиатской кухне и современным интерпретациям стритфуда.\n\nЛетний гастрономический фестиваль\nГлавное событие года для всех фуди. В течение недели лучшие рестораны города будут предлагать специальное меню по фиксированной цене. Это отличная возможность попробовать блюда высокой кухни по доступным ценам.\n\nФестиваль национальных кухонь\nОсенью нас ждет настоящее путешествие по кухням мира. Каждый день фестиваля будет посвящен определенной стране или региону. Помимо дегустаций, в программе мастер-классы от шеф-поваров и лекции о гастрономических традициях разных народов.\n\nРождественская ярмарка\nЗавершает год традиционная рождественская ярмарка с глинтвейном, имбирными пряниками и другими сезонными лакомствами. В этом году организаторы обещают расширить фуд-корт и добавить больше интерактивных активностей для посетителей.'
  }
];

const initialRegularArticles: Article[] = [
  {
    id: 3,
    title: 'Необычные кинотеатры, которые стоит посетить ради атмосферы',
    excerpt: '',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
    readTime: '8',
    content: 'В эпоху стриминговых сервисов поход в кинотеатр должен быть особенным событием. Мы нашли несколько уникальных кинотеатров, которые предлагают гораздо больше, чем просто просмотр фильма.\n\nАтмосферный кинотеатр "Ретро"\nРасположенный в историческом здании начала XX века, этот кинотеатр сохранил оригинальные архитектурные элементы и атмосферу золотой эпохи кинематографа. Здесь регулярно проводятся показы классических фильмов на пленке, а в фойе можно увидеть настоящие киноаппараты прошлого века.\n\nКинотеатр "Под звездами"\nУникальное место, где можно смотреть фильмы на крыше небоскреба. Летними вечерами здесь устраивают показы под открытым небом с потрясающим видом на ночной город. Зрителям предоставляются удобные кресла-мешки и пледы для прохладной погоды.\n\nАрт-кинотеатр "Новая волна"\nЭто место специализируется на показе авторского кино и независимых фильмов. Помимо кинопоказов, здесь проходят встречи с режиссерами, мастер-классы по кинопроизводству и тематические фестивали. Интерьер оформлен работами местных художников.\n\nКаждый из этих кинотеатров предлагает уникальный опыт, который сделает просмотр фильма незабываемым событием.'
  },
  {
    id: 4,
    title: 'Необычные кафе с живой музыкой: гастрономия и искусство в одном',
    excerpt: '',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    readTime: '5',
    content: 'Живая музыка может превратить обычный ужин в настоящее событие. Мы собрали список уникальных кафе, где можно насладиться не только отличной кухней, но и живыми выступлениями.\n\nДжаз-кафе "Синяя птица"\nЭто место, где джаз звучит каждый вечер. Здесь выступают как известные музыканты, так и начинающие таланты. Меню включает блюда американской и европейской кухни, а бар предлагает впечатляющую коллекцию виски.\n\nАкустическое кафе "Гитара"\nУютное пространство, где каждые выходные проходят акустические концерты. Музыканты выступают в непосредственной близости от гостей, создавая камерную атмосферу. Кухня специализируется на средиземноморских блюдах.\n\nЭтно-кафе "Мир"\nЗдесь можно услышать музыку со всего света. Каждый вечер посвящен определенной музыкальной культуре, а меню включает блюда соответствующей национальной кухни. Регулярно проводятся мастер-классы по игре на этнических инструментах.\n\nВсе эти места объединяет особая атмосфера, где музыка и гастрономия создают уникальный синтез искусств.'
  },
  {
    id: 5,
    title: '5 музеев современного искусства, которые удивляют экспозициями',
    excerpt: '',
    imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=800',
    readTime: '6',
    content: 'Современное искусство постоянно раздвигает границы возможного, и музеи становятся все более интерактивными и впечатляющими. Представляем вам пять музеев, где искусство выходит за рамки привычного.\n\nМузей цифрового искусства\nЭтот музей полностью посвящен цифровому искусству. Здесь можно увидеть масштабные инсталляции с использованием проекций, виртуальной и дополненной реальности. Многие экспонаты интерактивны и реагируют на действия посетителей.\n\nМузей иллюзий\nУникальное пространство, где искусство играет с восприятием зрителя. Каждый экспонат – это оптическая иллюзия, которая заставляет задуматься о природе реальности. Отличное место для необычных фотографий.\n\nЭкспериментариум\nЭтот музей стирает границу между искусством и наукой. Здесь представлены работы, созданные в сотрудничестве художников и ученых. Многие экспонаты демонстрируют взаимодействие искусства с физическими явлениями.\n\nМузей уличного искусства\nПространство, где стрит-арт получает официальное признание. Помимо постоянной экспозиции, здесь регулярно проходят фестивали и мастер-классы по граффити.\n\nМузей света\nВсе экспозиции построены на работе со светом. От неоновых инсталляций до сложных световых шоу – каждый зал предлагает новый взгляд на возможности светового искусства.'
  },
  {
    id: 6,
    title: 'Рестораны, где подают только десерты',
    excerpt: '',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
    readTime: '4',
    content: 'Если вы сладкоежка, то эти рестораны созданы специально для вас. Мы собрали список мест, где десерты являются основным меню.\n\nДесертный ресторан "Сладкая жизнь"\nЗдесь можно найти все виды десертов, от классических тортов до экзотических фруктовых салатов. Каждое блюдо приготовлено с любовью и заботой, чтобы удовлетворить ваш сладкий зуб.\n\nРесторан мороженого "Холодный рай"\nЭто место предлагает более 50 видов мороженого, приготовленных из натуральных ингредиентов. От классических вкусов до экзотических комбинаций – здесь найдется что-то для каждого.\n\nКондитерская "Волшебная палочка"\nЗдесь можно найти самые разные десерты, от тортов и пирожных до кексов и печенья. Все блюда приготовлены по старинным рецептам и украшены с любовью.\n\nВсе эти рестораны предлагают уникальный опыт, где десерты становятся главным героем.'
  }
];

const ArticleView: React.FC<{ article: Article; onBack: () => void }> = ({ article, onBack }) => {
  return (
    <div className="fixed inset-0 bg-white z-0">
      <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="flex items-center justify-center h-14 relative">
          <button onClick={onBack} className="absolute left-0 p-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">Статья</h1>
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-y-auto pt-14 pb-24">
        <div className="px-4 pt-6">
          <span className="text-[14px] leading-[16.77px] text-[#646466] font-[400] tracking-[-2%]">
            {article.readTime} минут на прочтение
          </span>
        </div>
        
        <div className="px-4 mt-2">
          <h2 className="text-[20px] leading-[23.96px] font-[500] tracking-[-2%] text-[#020203]">
            {article.title}
          </h2>
        </div>
        
        <div className="w-full px-4 mt-6">
          <div className="aspect-[2/1] w-full">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
        </div>
        
        <div className="px-4 mt-6">
          <div className="text-[16px] leading-[19.17px] font-[400] tracking-[-2%] text-[#020203] whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleCard: React.FC<{
  article: Article;
  isFeatured?: boolean;
  onClick: () => void;
}> = ({ article, isFeatured = false, onClick }) => {
  const { title, excerpt, imageUrl, readTime } = article;

  if (isFeatured) {
    return (
      <div 
        className="rounded-[20px] overflow-hidden relative cursor-pointer" 
        style={{ aspectRatio: '2/1', width: '100%' }}
        onClick={onClick}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-normal mb-2">{title}</h3>
          <div className="flex items-center text-sm font-light">
            <span>{readTime} минут на прочтение</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`overflow-hidden mb-4 mx-4 relative cursor-pointer rounded-[20px] bg-white`}
      onClick={onClick}
    >
      <div className="relative h-64">
        <div className="w-full h-full relative rounded-[20px] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Градиент для текста */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Метрики в левом верхнем углу */}
          <div className="absolute top-3 left-3 flex gap-2">
            <div 
              className="backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-2"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <span className="text-sm font-medium text-white">{readTime} минут</span>
            </div>
            <div 
              className="backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-2"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <FileText className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Статья</span>
            </div>
          </div>

          {/* Текст поверх градиента */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-medium text-lg text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-200">{excerpt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticlesView = () => {
  const [featuredArticles] = useState<Article[]>(initialArticles);
  const [regularArticles] = useState<Article[]>(initialRegularArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Управление видимостью основного хедера
  useEffect(() => {
    const mainHeader = document.querySelector('header');
    if (selectedArticle) {
      mainHeader?.classList.add('hidden');
    } else {
      mainHeader?.classList.remove('hidden');
    }
    
    return () => {
      mainHeader?.classList.remove('hidden');
    };
  }, [selectedArticle]);

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="pb-20 pt-16">
      {/* Featured Articles Section */}
      <div>
        <div className="px-4 mb-4">
          <h2 className="text-lg font-medium">Наши рекомендации</h2>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4 px-4">
            {featuredArticles.map((article) => (
              <div 
                key={article.id} 
                className="w-[85vw] flex-shrink-0"
              >
                <ArticleCard 
                  article={article} 
                  isFeatured 
                  onClick={() => setSelectedArticle(article)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regular Articles */}
      <div className="mt-8">
        <h2 className="px-4 text-lg font-medium mb-4">Общее</h2>
        <div>
          {regularArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article}
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesView;
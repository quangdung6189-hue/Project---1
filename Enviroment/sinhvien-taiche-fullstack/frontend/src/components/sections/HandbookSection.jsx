import { useState } from 'react';
import ArticleModal from '../ui/ArticleModal';
import { ARTICLES } from '../../utils/articles';
import { formatDate } from '../../utils/helpers';

export default function HandbookSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openArticle = (index) => {
    setSelectedArticle(index);
    setIsModalOpen(true);
  };

  const categoryColors = {
    'Hướng dẫn': 'bg-emerald-100 text-emerald-700',
    'Kiến thức': 'bg-ecoBlue-100 text-ecoBlue-700',
    'Sự kiện': 'bg-purple-100 text-purple-700',
    'Mẹo hay': 'bg-amber-100 text-amber-700',
  };

  const gridCategoryColors = {
    'Mẹo hay': 'bg-amber-500',
    'Kiến thức': 'bg-ecoBlue-500',
    'Sự kiện': 'bg-purple-500',
    'Hướng dẫn': 'bg-emerald-500',
  };

  return (
    <>
      <section id="handbook" className="py-20 bg-gradient-to-b from-white to-ecoGreen-50/30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-ecoGreen-600 text-sm font-bold uppercase tracking-wider bg-ecoGreen-100/50 px-3 py-1 rounded-full">
              <i className="fa-solid fa-newspaper mr-1.5"></i> Cẩm nang & Kiến thức
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Tin Tức Xanh & Hướng Dẫn</h2>
            <div className="h-1 w-20 bg-ecoGreen-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 text-base font-medium">Bài viết chuyên sâu về phân loại rác, tái chế và các hoạt động môi trường tại CMC.</p>
          </div>

          {/* Featured Article */}
          <div
            onClick={() => openArticle(0)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 mb-10 border border-gray-100 hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={ARTICLES[0].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={ARTICLES[0].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/40 lg:via-transparent lg:to-transparent"></div>
                <div className="absolute bottom-4 left-4 lg:hidden">
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Nổi bật</span>
                </div>
              </div>
              <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{ARTICLES[0].category}</span>
                  <span className="text-xs text-gray-400"><i className="fa-regular fa-calendar mr-1"></i>{formatDate(ARTICLES[0].date)}</span>
                  <span className="text-xs text-gray-400"><i className="fa-regular fa-clock mr-1"></i>{ARTICLES[0].readTime}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-ecoGreen-600 transition-colors">{ARTICLES[0].title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{ARTICLES[0].content.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ecoGreen-100 rounded-full flex items-center justify-center text-ecoGreen-600 text-xs font-bold">BM</div>
                    <span className="text-xs text-gray-500 font-medium">{ARTICLES[0].author}</span>
                  </div>
                  <span className="text-ecoGreen-600 text-sm font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Đọc tiếp <i className="fa-solid fa-arrow-right text-xs"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.slice(1).map((article, i) => (
              <div
                key={i}
                onClick={() => openArticle(i + 1)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={article.title} />
                  <div className="absolute top-3 left-3">
                    <span className={`${gridCategoryColors[article.category] || 'bg-emerald-500'} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span><i className="fa-regular fa-calendar mr-1"></i>{formatDate(article.date)}</span>
                    <span>•</span>
                    <span><i className="fa-regular fa-clock mr-1"></i>{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-ecoGreen-600 transition-colors">{article.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400"><i className="fa-regular fa-user mr-1"></i>{article.author}</span>
                    <span className="text-ecoGreen-600 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Đọc tiếp <i className="fa-solid fa-arrow-right text-xs"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={selectedArticle !== null ? ARTICLES[selectedArticle] : null}
      />
    </>
  );
}


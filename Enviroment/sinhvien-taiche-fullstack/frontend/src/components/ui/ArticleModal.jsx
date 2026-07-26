import { useEffect } from 'react';
import { formatDate } from '../../utils/helpers';

export default function ArticleModal({ isOpen, onClose, article }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const categoryColors = {
    'Hướng dẫn': 'bg-emerald-500',
    'Kiến thức': 'bg-ecoBlue-500',
    'Sự kiện': 'bg-purple-500',
    'Mẹo hay': 'bg-amber-500',
  };

  const categoryColor = categoryColors[article.category] || 'bg-emerald-500';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-200">
            <img className="w-full h-full object-cover" src={article.image} alt={article.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <button onClick={onClose} className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-sm z-10">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <div className="absolute bottom-6 left-6">
              <span className={`${categoryColor} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase`}>
                {article.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 max-w-2xl">{article.title}</h3>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-6 sm:px-10 py-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <span><i className="fa-regular fa-user mr-2"></i>{article.author}</span>
              <span><i className="fa-regular fa-calendar mr-2"></i>{formatDate(article.date)}</span>
              <span><i className="fa-regular fa-clock mr-2"></i>{article.readTime}</span>
            </div>
            
            <div className="prose prose-green max-w-none text-gray-700 leading-relaxed space-y-4"
                 dangerouslySetInnerHTML={{ __html: article.content }}>
            </div>
            
            {/* Share */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Chia sẻ:</span>
                <a href="#" className="w-9 h-9 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="w-9 h-9 bg-sky-50 hover:bg-sky-100 text-sky-500 rounded-full flex items-center justify-center transition-colors"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="w-9 h-9 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
              <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-2.5 rounded-full text-sm transition-all">
                <i className="fa-solid fa-xmark mr-1.5"></i>Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


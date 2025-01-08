import React from 'react';
import { Clock } from 'lucide-react';

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  readTime: string;
  isFeatured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  title, 
  excerpt, 
  imageUrl, 
  readTime,
  isFeatured = false 
}) => {
  if (isFeatured) {
    return (
      <div className="rounded-2xl overflow-hidden relative cursor-pointer" style={{ aspectRatio: '2/1', width: '100%' }}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-normal mb-2">{title}</h3>
          <div className="flex items-center text-sm font-light">
            <Clock className="w-4 h-4 mr-2" />
            <span>{readTime} минут на прочтение</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white rounded-2xl overflow-hidden mb-4 mx-4 shadow-sm cursor-pointer" style={{ height: 'calc(100vw / 5)', maxHeight: '160px' }}>
      <div className="w-1/4 h-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-normal mb-1 line-clamp-2">{title}</h3>
        </div>
        <div className="flex items-center text-xs text-gray-500 font-light">
          <Clock className="w-3 h-3 mr-1" />
          <span>{readTime} минут на прочтение</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { LearningResourceCard } from '@/components/LearningResourceCard';
import { BottomNavigation } from '@/components/BottomNavigation';

const mockArticles = [
  {
    id: '2',
    title: 'Questions to ask about drawing down',
    image: '/content-hub/woman-with-smile.webp'
  },
  {
    id: '3',
    title: 'The Secret to Growing Your Retirement Fund',
    image: '/content-hub/happy-couple.webp'
  },
  {
    id: '4',
    title: 'Should I Really Touch My Pension? A Guide for the Under-55s',
    image: '/content-hub/man-smiling.webp'
  }
];


const Learn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
					<h1 className="text-[28px] font-normal">Content hub</h1>
					<div className="flex gap-3">
						<button className="w-12 h-12 rounded-full bg-white dark:bg-[#1C1C1E] flex items-center justify-center">
							<Search className="w-5 h-5" />
						</button>
					</div>
				</div>
      
      <div className="grid grid-cols-2 gap-4 pb-4">
        {mockArticles.map((article) => (
          <LearningResourceCard
            key={article.id}
            title={article.title}
            image={article.image}
            onClick={() => navigate(`/learn/${article.id}`)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Learn;

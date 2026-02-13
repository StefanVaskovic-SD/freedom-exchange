import React from 'react';

interface LearningResourceCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

export const LearningResourceCard: React.FC<LearningResourceCardProps> = ({
  title,
  image,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col min-w-[160px] w-[160px] hover:opacity-90 transition-opacity"
    >
      <img
        src={image}
        alt={title}
        className="aspect-[16/10] w-full object-cover rounded-lg"
      />
      <h3 className="text-foreground leading-snug pt-3 text-left text-base">
        {title}
      </h3>
    </button>
  );
};

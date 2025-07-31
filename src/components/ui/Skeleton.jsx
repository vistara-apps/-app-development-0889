import React from 'react';

const Skeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  className = '',
  count = 1,
  animation = true 
}) => {
  const baseClasses = `skeleton ${animation ? '' : 'animate-none'}`;
  
  const variants = {
    text: 'skeleton-text',
    avatar: 'skeleton-avatar',
    button: 'skeleton-button',
    card: 'h-32 w-full',
    circle: 'rounded-full',
    rectangle: 'rounded-lg'
  };

  const skeletonClass = `${baseClasses} ${variants[variant]} ${className}`;
  
  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  if (count === 1) {
    return <div className={skeletonClass} style={style} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={skeletonClass} style={style} />
      ))}
    </div>
  );
};

// Predefined skeleton layouts
export const SkeletonCard = ({ showAvatar = true, lines = 3 }) => (
  <div className="card animate-fade-in">
    <div className="flex items-start gap-4">
      {showAvatar && <Skeleton variant="avatar" />}
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" count={lines} />
      </div>
    </div>
  </div>
);

export const SkeletonDiscussion = () => (
  <div className="discussion-post animate-fade-in">
    <div className="flex items-start gap-3 mb-3">
      <Skeleton variant="avatar" width="32px" height="32px" />
      <div className="flex-1">
        <Skeleton variant="text" width="120px" />
        <Skeleton variant="text" width="80px" />
      </div>
    </div>
    <Skeleton variant="text" count={2} />
    <div className="flex items-center gap-4 mt-3">
      <Skeleton variant="button" width="60px" height="24px" />
      <Skeleton variant="button" width="80px" height="24px" />
    </div>
  </div>
);

export const SkeletonPrediction = () => (
  <div className="prediction-card animate-fade-in">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="50%" />
      </div>
      <Skeleton variant="rectangle" width="80px" height="32px" />
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <Skeleton variant="text" width="60px" />
        <Skeleton variant="text" width="40px" />
      </div>
      <div>
        <Skeleton variant="text" width="60px" />
        <Skeleton variant="text" width="40px" />
      </div>
    </div>
    <div className="flex justify-between items-center">
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="button" width="100px" height="36px" />
    </div>
  </div>
);

export const SkeletonHeader = () => (
  <div className="header animate-fade-in">
    <div className="container">
      <div className="header-content">
        <Skeleton variant="text" width="150px" />
        <div className="flex items-center gap-6">
          <Skeleton variant="text" width="80px" />
          <Skeleton variant="text" width="80px" />
          <Skeleton variant="text" width="80px" />
          <Skeleton variant="button" width="100px" height="36px" />
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-2 md:grid-cols-4 gap-8 animate-fade-in">
    {Array.from({ length: 4 }, (_, index) => (
      <div key={index} className="text-center">
        <Skeleton variant="text" width="80px" className="mx-auto mb-2" />
        <Skeleton variant="text" width="100px" className="mx-auto" />
      </div>
    ))}
  </div>
);

export default Skeleton;

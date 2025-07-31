import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Star } from 'lucide-react';

const PointsDisplay = ({ 
  points, 
  previousPoints = 0, 
  showAnimation = false, 
  size = 'default',
  showLevel = true,
  showProgress = true 
}) => {
  const [displayPoints, setDisplayPoints] = useState(previousPoints);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate level and progress
  const getLevel = (points) => Math.floor(points / 100) + 1;
  const getLevelProgress = (points) => (points % 100) / 100;
  const getPointsToNextLevel = (points) => 100 - (points % 100);

  const level = getLevel(points);
  const progress = getLevelProgress(points);
  const pointsToNext = getPointsToNextLevel(points);

  useEffect(() => {
    if (showAnimation && points !== previousPoints) {
      setIsAnimating(true);
      
      // Animate points counting up
      const difference = points - previousPoints;
      const duration = Math.min(1000, Math.abs(difference) * 50); // Max 1 second
      const steps = Math.min(20, Math.abs(difference));
      const stepValue = difference / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setDisplayPoints(Math.round(previousPoints + (stepValue * currentStep)));
        } else {
          setDisplayPoints(points);
          setIsAnimating(false);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    } else {
      setDisplayPoints(points);
    }
  }, [points, previousPoints, showAnimation]);

  const sizeClasses = {
    small: 'text-sm px-3 py-1',
    default: 'text-sm px-4 py-2',
    large: 'text-base px-6 py-3'
  };

  const iconSizes = {
    small: 16,
    default: 18,
    large: 20
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Main Points Badge */}
      <div className={`points-badge ${sizeClasses[size]} ${isAnimating ? 'animate-pulse' : ''}`}>
        <Trophy size={iconSizes[size]} />
        <span className="font-semibold">
          {displayPoints.toLocaleString()}
        </span>
        <span className="opacity-80">Points</span>
      </div>

      {/* Level and Progress */}
      {showLevel && (
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 text-primary-600">
            <Star size={14} />
            <span className="font-medium">Level {level}</span>
          </div>
          
          {showProgress && (
            <div className="flex items-center gap-2">
              <div className="progress-bar w-20 h-2">
                <div 
                  className="progress-fill h-full transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {pointsToNext} to next
              </span>
            </div>
          )}
        </div>
      )}

      {/* Achievement Notification */}
      {isAnimating && points > previousPoints && (
        <div className="animate-slide-up text-xs text-success-600 font-medium flex items-center gap-1">
          <TrendingUp size={12} />
          +{points - previousPoints} points earned!
        </div>
      )}
    </div>
  );
};

export default PointsDisplay;

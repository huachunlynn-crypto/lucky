
import React from 'react';

interface MascotProps {
  reaction?: 'happy' | 'excited' | 'wink' | 'love' | 'loading';
  className?: string;
}

const Mascot: React.FC<MascotProps> = ({ reaction = 'happy', className = "" }) => {
  const isWinking = reaction === 'wink';
  const isExcited = reaction === 'excited' || reaction === 'loading';
  const isLoving = reaction === 'love';

  return (
    <div className={`relative ${className} ${isExcited ? 'animate-bounce' : 'animate-float'}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <circle cx="60" cy="70" r="45" fill="#FFD1DC" stroke="#FF9AA2" strokeWidth="4" />
        
        {/* Ears */}
        <ellipse cx="35" cy="35" rx="10" ry="20" fill="#FFD1DC" stroke="#FF9AA2" strokeWidth="3" transform="rotate(-20 35 35)" />
        <ellipse cx="85" cy="35" rx="10" ry="20" fill="#FFD1DC" stroke="#FF9AA2" strokeWidth="3" transform="rotate(20 85 35)" />
        
        {/* Eyes */}
        {isWinking ? (
          <>
            <path d="M45 65 Q50 60 55 65" stroke="#4A4A4A" strokeWidth="3" fill="none" />
            <circle cx="75" cy="65" r="4" fill="#4A4A4A" />
          </>
        ) : (
          <>
            <circle cx="45" cy="65" r="4" fill="#4A4A4A" className={isExcited ? 'animate-pulse' : ''} />
            <circle cx="75" cy="65" r="4" fill="#4A4A4A" className={isExcited ? 'animate-pulse' : ''} />
          </>
        )}

        {/* Mouth */}
        <path d="M55 80 Q60 85 65 80" stroke="#4A4A4A" strokeWidth="2" fill="none" />
        
        {/* Cheeks */}
        <circle cx="35" cy="75" r="5" fill="#FF9AA2" opacity="0.6" />
        <circle cx="85" cy="75" r="5" fill="#FF9AA2" opacity="0.6" />

        {/* Star on head */}
        <path d="M60 15 L63 21 L70 22 L65 26 L66 33 L60 30 L54 33 L55 26 L50 22 L57 21 Z" fill="#FFD700" stroke="#E6BE00" strokeWidth="1">
           <animateTransform attributeName="transform" type="rotate" from="0 60 24" to="360 60 24" dur="3s" repeatCount="indefinite" />
        </path>

        {/* Hearts for 'love' reaction */}
        {isLoving && (
          <g className="animate-pulse">
            <path d="M10 20 Q15 10 20 20 Q25 10 30 20 T20 30 T10 20" fill="#FF4D6D" transform="scale(0.5) translate(180, 20)" />
            <path d="M10 20 Q15 10 20 20 Q25 10 30 20 T20 30 T10 20" fill="#FF4D6D" transform="scale(0.3) translate(50, 100)" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default Mascot;

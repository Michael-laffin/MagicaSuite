import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  message = 'Loading...',
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-4 border-primary border-t-transparent`}
        role="status"
        aria-label="loading"
      />
      {message && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80">
        {content}
      </div>
    );
  }

  return content;
};

export const LoadingPage: React.FC<Omit<LoadingProps, 'fullScreen'>> = (props) => (
  <Loading {...props} fullScreen />
);

export default Loading;

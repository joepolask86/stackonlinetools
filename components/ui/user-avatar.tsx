import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  user: {
    name: string | null;
    image: string | null;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-lg',
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(user.name);

  if (user.image) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ${className}`}>
        <Image
          src={user.image}
          alt={user.name || 'User'}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : 64}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : 64}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold flex-shrink-0 ${className}`}>
      {initials}
    </div>
  );
}

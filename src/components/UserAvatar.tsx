import { useState, useRef, useEffect } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useStore } from '../store';
import { SettingsModal } from './SettingsModal';

export function UserAvatar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="relative flex items-center"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={user?.avatarUrl || '/default-avatar.png'}
            alt="Аватар"
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
} 
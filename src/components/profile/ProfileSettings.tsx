import { useStore } from '../../store';
import { Camera } from 'lucide-react';

export function ProfileSettings() {
  const theme = useStore((state) => state.theme);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setNotification = useStore((state) => state.setNotification);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (user) {
          const updatedUser = {
            ...user,
            avatar: reader.result as string
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setNotification({
            message: 'Фото профиля обновлено',
            type: 'success'
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <h2 className="text-2xl font-bold mb-6">Профиль</h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <label 
            htmlFor="avatar-input" 
            className="cursor-pointer block relative"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={user?.avatar || '/default-avatar.png'}
                alt="Фото профиля"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{user?.name || 'Пользователь'}</h3>
        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {user?.email || 'email@example.com'}
        </p>
      </div>
    </div>
  );
} 
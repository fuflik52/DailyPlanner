import { WelcomeSection } from '../components/home/WelcomeSection';
import { QuickActions } from '../components/home/QuickActions';
import { UserAvatar } from '../components/UserAvatar';
import { TaskProgress } from '../components/home/TaskProgress';

export function HomePage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 p-4">
        <UserAvatar />
      </div>
      <div className="pt-20 space-y-6">
        <WelcomeSection />
        <TaskProgress />
        <QuickActions />
      </div>
    </div>
  );
} 
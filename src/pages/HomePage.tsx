import { WelcomeSection } from '../components/home/WelcomeSection';
import { QuickActions } from '../components/home/QuickActions';
import { TasksSummary } from '../components/home/TasksSummary';

export function HomePage() {
  return (
    <>
      <WelcomeSection />
      <QuickActions />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TasksSummary />
      </div>
    </>
  );
} 
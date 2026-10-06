import React from 'react';
import { Compass, HeartHandshake, Users, Shield, LayoutDashboard } from 'lucide-react';
import { UserRole } from '../../types';

interface MobileNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeRole: UserRole;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  activeRole,
}) => {
  const getDashboardLabel = () => {
    if (activeRole === 'organizer') return 'Organizer';
    if (activeRole === 'admin') return 'Admin';
    return 'Hub';
  };

  const getDashboardTab = () => {
    if (activeRole === 'organizer') return 'organizer-dashboard';
    if (activeRole === 'admin') return 'admin-dashboard';
    return 'student-dashboard';
  };

  const items = [
    { id: 'explore', label: 'Home', icon: Compass },
    { id: 'seva', label: 'SEVA', icon: HeartHandshake },
    { id: 'safar', label: 'SAFAR', icon: Users },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: getDashboardTab(), label: getDashboardLabel(), icon: LayoutDashboard },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-2 py-1.5 flex items-center justify-around shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          currentTab === item.id ||
          (item.id.includes('dashboard') && currentTab.includes('dashboard'));

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-neutral-900 font-bold scale-105'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4] text-amber-600' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

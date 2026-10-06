import React, { useState } from 'react';
import { NotificationItem } from '../../types';
import { X, Check, Bell, Shield, HeartHandshake, Users, Sparkles } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification,
}) => {
  const [filter, setFilter] = useState<'all' | 'application' | 'safety' | 'match'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(
    (n) => filter === 'all' || n.type === filter
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-neutral-200 flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 font-display">
                Notifications
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllRead}
                className="text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                Mark all read
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                aria-label="Close notifications"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Bar (Segmented Controls) */}
          <div className="px-6 py-2.5 border-b border-neutral-100 flex items-center gap-1 bg-neutral-50/50">
            {[
              { id: 'all', label: 'All' },
              { id: 'safety', label: 'Safety' },
              { id: 'application', label: 'Seva' },
              { id: 'match', label: 'Safar' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  filter === f.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-200/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 text-xs">
                No notifications in this category.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectNotification(item)}
                  className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    item.read
                      ? 'bg-white border-neutral-200 text-neutral-600'
                      : 'bg-amber-50/50 border-amber-200 text-neutral-900 font-medium shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-neutral-900 font-display block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-neutral-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  {item.actionLabel && (
                    <div className="mt-2 text-[11px] font-bold text-amber-700 flex items-center gap-1">
                      <span>{item.actionLabel}</span>
                      <span>→</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

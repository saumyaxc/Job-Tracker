import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import BriefcaseIcon from '@heroicons/react/24/solid/BriefcaseIcon';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import BoltIcon from '@heroicons/react/24/solid/BoltIcon';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';

const StatCard = ({ label, value, sublabel, className }) => {
  // Count-up animation
  const spring = useSpring(0, { stiffness: 120, damping: 20 });
  React.useEffect(() => { spring.set(value); }, [value, spring]);
  const rounded = useTransform(spring, latest => Math.round(latest));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 16 }}
      className={`rounded-xl p-4 shadow-sm border ${className}`}
    >
      <div className="text-sm opacity-80">{label}</div>
      <div className="mt-1 text-3xl font-semibold">
        {/* framer-motion value to text */}
        <motion.span>{rounded}</motion.span>
      </div>
      {sublabel && <div className="text-xs mt-1 opacity-70">{sublabel}</div>}
    </motion.div>
  );
};

const StatsBar = ({ stats }) => {
  // Tailwind palettes for cute + dark mode
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <StatCard
        label={<span className="inline-flex items-center gap-1"><ChartBarIcon className="w-4 h-4" /> Total</span>}
        value={stats.total}
        className="bg-pink-50/80 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800"
      />
      <StatCard
        label={<span className="inline-flex items-center gap-1"><BriefcaseIcon className="w-4 h-4" /> Applied</span>}
        value={stats.Applied}
        className="bg-blue-50/80 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      />
      <StatCard
        label="Interview"
        value={stats.Interview}
        className="bg-indigo-50/80 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
      />
      <StatCard
        label="Assessment"
        value={stats.Assessment}
        sublabel={
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1"><ClockIcon className="w-3 h-3" /> due soon: {stats.dueSoon}</span>
            <span className="inline-flex items-center gap-1"><BoltIcon className="w-3 h-3" /> overdue: {stats.overdue}</span>
          </span>
        }
        className="bg-yellow-50/80 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      />
      <StatCard
        label={<span className="inline-flex items-center gap-1"><CheckCircleIcon className="w-4 h-4" /> Offer</span>}
        value={stats.Offer}
        className="bg-green-50/80 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      />
      <StatCard
        label={<span className="inline-flex items-center gap-1"><XCircleIcon className="w-4 h-4" /> Rejected</span>}
        value={stats.Rejected}
        sublabel={`completed assess: ${stats.completedAssessments}`}
        className="bg-gray-50/80 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800"
      />
    </div>
  );
};

export default StatsBar;

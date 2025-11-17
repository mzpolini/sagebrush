import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  colorScheme?: 'emerald' | 'cyan' | 'amber' | 'purple' | 'red';
  className?: string;
}

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-500/20',
    icon: 'text-emerald-400',
    value: 'text-emerald-400',
  },
  cyan: {
    bg: 'bg-cyan-500/20',
    icon: 'text-cyan-400',
    value: 'text-cyan-400',
  },
  amber: {
    bg: 'bg-amber-500/20',
    icon: 'text-amber-400',
    value: 'text-amber-400',
  },
  purple: {
    bg: 'bg-purple-500/20',
    icon: 'text-purple-400',
    value: 'text-purple-400',
  },
  red: {
    bg: 'bg-red-500/20',
    icon: 'text-red-400',
    value: 'text-red-400',
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = 'emerald',
  className,
}: StatCardProps) {
  const colors = colorClasses[colorScheme];

  return (
    <Card className={cn('bg-slate-900 border-slate-800 shadow-xl', className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn('h-12 w-12 rounded-full flex items-center justify-center', colors.bg)}>
            <Icon className={cn('h-6 w-6', colors.icon)} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
              {title}
            </div>
            {trend && (
              <div className={cn(
                'text-xs font-mono font-bold',
                trend.direction === 'up' ? 'text-emerald-400' : 'text-red-400'
              )}>
                {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
              </div>
            )}
          </div>
        </div>

        <div className={cn('text-4xl font-mono font-black mb-1', colors.value)}>
          {value}
        </div>

        {subtitle && (
          <div className="text-sm text-slate-400 font-mono">
            {subtitle}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

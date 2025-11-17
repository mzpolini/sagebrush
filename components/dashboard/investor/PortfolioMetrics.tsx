import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Briefcase, DollarSign, Award } from 'lucide-react';

interface PortfolioMetricsProps {
  totalInvested: number;
  activeDeals: number;
  avgROI: number;
  winRate: number;
}

export function PortfolioMetrics({
  totalInvested,
  activeDeals,
  avgROI,
  winRate,
}: PortfolioMetricsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
              Total Invested
            </div>
          </div>
          <div className="text-3xl font-mono font-black text-emerald-400">
            ${(totalInvested / 1000000).toFixed(1)}M
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
              Active Deals
            </div>
          </div>
          <div className="text-3xl font-mono font-black text-cyan-400">
            {activeDeals}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
              Avg ROI
            </div>
          </div>
          <div className="text-3xl font-mono font-black text-amber-400">
            {avgROI.toFixed(0)}%
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
              Win Rate
            </div>
          </div>
          <div className="text-3xl font-mono font-black text-purple-400">
            {winRate.toFixed(0)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

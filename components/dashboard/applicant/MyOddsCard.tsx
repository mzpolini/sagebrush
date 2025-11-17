import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp } from 'lucide-react';

interface MyOddsCardProps {
  topCounty: string;
  topProbability: number;
  averageProbability: number;
  isSeaEligible: boolean;
  seaBoost: number;
}

export function MyOddsCard({
  topCounty,
  topProbability,
  averageProbability,
  isSeaEligible,
  seaBoost,
}: MyOddsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-emerald-900/50 to-slate-900 border-2 border-emerald-700/50 shadow-2xl">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-10 w-10 text-emerald-400" />
          <div>
            <h3 className="text-2xl font-bold text-white">Your Best Opportunity</h3>
            <p className="text-slate-300">{topCounty} County</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-7xl font-mono font-black text-emerald-400 mb-2">
            {topProbability.toFixed(1)}%
          </div>
          <div className="text-lg text-slate-300 font-mono">Win Probability</div>
        </div>

        {isSeaEligible && (
          <div className="bg-emerald-950/50 border border-emerald-800/50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-500 text-white">SEA Eligible ✓</Badge>
              <span className="text-sm text-emerald-300 font-mono font-bold">
                {seaBoost.toFixed(1)}x Boost Applied
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Your Social Equity status significantly improves your odds
            </p>
          </div>
        )}

        <div className="flex items-center gap-6 pt-4 border-t border-slate-700">
          <div className="flex-1">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
              Portfolio Average
            </div>
            <div className="text-2xl font-mono font-bold text-cyan-400">
              {averageProbability.toFixed(1)}%
            </div>
          </div>
          <div className="flex-1 text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
              Trend
            </div>
            <div className="flex items-center justify-end gap-1 text-emerald-400">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xl font-bold">+12%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

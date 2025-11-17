import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Plus } from 'lucide-react';

interface TargetCountiesProps {
  counties: Array<{
    name: string;
    state: string;
    probability: number;
    status: 'tracking' | 'applied' | 'awarded';
  }>;
}

export function TargetCounties({ counties }: TargetCountiesProps) {
  const statusColors = {
    tracking: 'text-slate-400 border-slate-400/50 bg-slate-400/10',
    applied: 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10',
    awarded: 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10',
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">Target Counties</CardTitle>
            <CardDescription className="text-slate-300">
              {counties.length} counties tracked
            </CardDescription>
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-1" />
            Add County
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {counties.map((county) => (
            <div
              key={county.name}
              className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-emerald-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">{county.name}</div>
                  <div className="text-sm text-slate-400">{county.state}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-mono font-black text-emerald-400">
                    {county.probability.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500 font-mono">Win odds</div>
                </div>
                <Badge variant="outline" className={statusColors[county.status]}>
                  {county.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

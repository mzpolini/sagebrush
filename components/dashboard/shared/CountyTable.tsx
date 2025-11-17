'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { CountyMetrics } from '@/lib/types/dashboard';

interface CountyTableProps {
  data: CountyMetrics[];
  title?: string;
  description?: string;
}

type SortField = 'county' | 'probability' | 'expectedValue' | 'competition';
type SortDirection = 'asc' | 'desc';

export function CountyTable({
  data,
  title = 'County Comparison',
  description = 'Sort by any metric',
}: CountyTableProps) {
  const [sortField, setSortField] = useState<SortField>('probability');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const multiplier = sortDirection === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * multiplier;
    }
    return ((aVal as number) - (bVal as number)) * multiplier;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 text-slate-500" />;
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4 text-emerald-400" />
    ) : (
      <ArrowDown className="h-4 w-4 text-emerald-400" />
    );
  };

  return (
    <Card className="bg-slate-900 border-slate-800 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="text-slate-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th
                  className="text-left p-3 text-sm font-mono uppercase tracking-wider text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
                  onClick={() => handleSort('county')}
                >
                  <div className="flex items-center gap-2">
                    County
                    <SortIcon field="county" />
                  </div>
                </th>
                <th
                  className="text-right p-3 text-sm font-mono uppercase tracking-wider text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
                  onClick={() => handleSort('probability')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Win %
                    <SortIcon field="probability" />
                  </div>
                </th>
                <th
                  className="text-right p-3 text-sm font-mono uppercase tracking-wider text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
                  onClick={() => handleSort('expectedValue')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Value
                    <SortIcon field="expectedValue" />
                  </div>
                </th>
                <th
                  className="text-right p-3 text-sm font-mono uppercase tracking-wider text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors"
                  onClick={() => handleSort('competition')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Competition
                    <SortIcon field="competition" />
                  </div>
                </th>
                <th className="text-right p-3 text-sm font-mono uppercase tracking-wider text-slate-400">
                  SEA Boost
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((county, idx) => (
                <tr
                  key={county.county}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-white">{county.county}</div>
                      <div className="text-xs text-slate-500">{county.state}</div>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-2xl font-mono font-black text-emerald-400">
                      {county.probability.toFixed(1)}%
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-lg font-mono font-bold text-amber-400">
                      ${(county.expectedValue / 1000000).toFixed(1)}M
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <Badge
                      variant="outline"
                      className={
                        county.competition > 500
                          ? 'text-red-400 border-red-400/50 bg-red-400/10'
                          : county.competition > 200
                          ? 'text-amber-400 border-amber-400/50 bg-amber-400/10'
                          : 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10'
                      }
                    >
                      {county.competition}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-sm font-mono text-cyan-400">
                      {county.seaBoost.toFixed(1)}x
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

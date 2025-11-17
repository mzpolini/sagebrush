'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CompetitionBarProps {
  data: Array<{
    county: string;
    applicants: number;
    licenses: number;
  }>;
  title?: string;
  description?: string;
}

export function CompetitionBar({
  data,
  title = 'Competition Density',
  description = 'Applicants vs. Available Licenses',
}: CompetitionBarProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="text-slate-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="county"
              stroke="#94a3b8"
              style={{ fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold' }}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#020617',
                border: '2px solid #22c55e',
                borderRadius: '8px',
                padding: '12px',
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
              itemStyle={{ color: '#cbd5e1', fontFamily: 'monospace' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-slate-300 font-mono">{value}</span>
              )}
            />
            <Bar dataKey="applicants" fill="#22d3ee" name="Expected Applicants" radius={[8, 8, 0, 0]} />
            <Bar dataKey="licenses" fill="#22c55e" name="Available Licenses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

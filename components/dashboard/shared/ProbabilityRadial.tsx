'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

interface ProbabilityRadialProps {
  data: Array<{
    name: string;
    probability: number;
    fill: string;
  }>;
  title?: string;
  description?: string;
}

export function ProbabilityRadial({
  data,
  title = 'Win Probabilities',
  description = 'Top counties by odds',
}: ProbabilityRadialProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="text-slate-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="15%"
            outerRadius="95%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background={{ fill: '#1e293b' }}
              clockWise
              dataKey="probability"
              cornerRadius={12}
              label={{
                position: 'insideStart',
                fill: '#fff',
                fontSize: 14,
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            />
            <Legend
              iconSize={12}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ paddingLeft: '20px' }}
              formatter={(value, entry: any) => (
                <span className="text-sm font-mono text-slate-300 font-semibold">
                  {entry.payload.name}:{' '}
                  <span className="text-emerald-400">{entry.payload.probability.toFixed(1)}%</span>
                </span>
              )}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-950 border-2 border-emerald-500 p-4 rounded-lg shadow-2xl">
                      <p className="font-bold text-lg mb-1">{payload[0].payload.name} County</p>
                      <p className="text-emerald-400 font-mono text-2xl font-black">
                        {payload[0].value.toFixed(1)}%
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">Win Probability</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

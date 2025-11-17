'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

interface ScenarioSlidersProps {
  initialLicenses: number;
  initialApplications: number;
  state: string;
  county: string;
}

export function ScenarioSliders({
  initialLicenses,
  initialApplications,
  state,
  county,
}: ScenarioSlidersProps) {
  const [licensesForecast, setLicensesForecast] = useState([initialLicenses]);
  const [applicationsForecast, setApplicationsForecast] = useState([initialApplications]);

  const calculatedProbability = useMemo(() => {
    return (licensesForecast[0] / applicationsForecast[0]) * 100;
  }, [licensesForecast, applicationsForecast]);

  const probabilityChange = useMemo(() => {
    const original = (initialLicenses / initialApplications) * 100;
    return ((calculatedProbability - original) / original) * 100;
  }, [calculatedProbability, initialLicenses, initialApplications]);

  return (
    <Card className="bg-slate-900 border-slate-800 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              Scenario Modeling
            </CardTitle>
            <CardDescription className="text-slate-300">
              {county}, {state} - Adjust forecasts in real-time
            </CardDescription>
          </div>
          <Badge className="bg-purple-600 text-white">Pro Feature</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">

        {/* Calculated Probability Display */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-slate-950 border-2 border-cyan-700/50 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2 font-mono uppercase tracking-wider">
            Forecasted Win Probability
          </div>
          <div className="flex items-baseline gap-4">
            <div className="text-6xl font-mono font-black text-cyan-400">
              {calculatedProbability.toFixed(1)}%
            </div>
            <div
              className={`text-2xl font-mono font-bold ${
                probabilityChange > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {probabilityChange > 0 ? '+' : ''}
              {probabilityChange.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Licenses Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-mono uppercase tracking-wider text-slate-300">
              Expected Licenses
            </label>
            <div className="text-3xl font-mono font-black text-emerald-400">
              {licensesForecast[0]}
            </div>
          </div>
          <Slider
            value={licensesForecast}
            onValueChange={setLicensesForecast}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>1</span>
            <span>25</span>
            <span>50</span>
          </div>
        </div>

        {/* Applications Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-mono uppercase tracking-wider text-slate-300">
              Expected Applications
            </label>
            <div className="text-3xl font-mono font-black text-amber-400">
              {applicationsForecast[0]}
            </div>
          </div>
          <Slider
            value={applicationsForecast}
            onValueChange={setApplicationsForecast}
            min={50}
            max={2000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>50</span>
            <span>1000</span>
            <span>2000</span>
          </div>
        </div>

        {/* Ratio Display */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
              Ratio
            </div>
            <div className="text-xl font-mono font-bold text-white">
              1:{Math.floor(applicationsForecast[0] / licensesForecast[0])}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
              Competition
            </div>
            <div className="text-xl font-mono font-bold text-white">
              {applicationsForecast[0] > 500 ? 'Extreme' : applicationsForecast[0] > 200 ? 'High' : 'Medium'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
              Confidence
            </div>
            <div className="text-xl font-mono font-bold text-white">
              {calculatedProbability > 20 ? 'High' : calculatedProbability > 10 ? 'Medium' : 'Low'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

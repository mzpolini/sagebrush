'use client';

import { Leaf, User, Settings, LogOut, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  userName: string;
  userEmail: string;
  role: 'applicant' | 'investor';
  subscriptionTier: string;
}

export function DashboardHeader({ userName, userEmail, role, subscriptionTier }: DashboardHeaderProps) {
  const tierBadge = {
    free: { icon: '🆓', label: 'Free', color: 'text-slate-400 border-slate-400/50 bg-slate-400/10' },
    basic: { icon: '⭐', label: 'Basic', color: 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10' },
    pro: { icon: '💎', label: 'Pro', color: 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10' },
  }[subscriptionTier];

  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Leaf className="h-8 w-8 text-emerald-500" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-green-400 to-lime-500 text-transparent bg-clip-text">
              Sagebrush
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              {role === 'applicant' ? 'Applicant Portal' : 'Investor Portal'}
            </p>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={tierBadge.color}>
            {tierBadge.icon} {tierBadge.label}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-slate-200">{userName}</p>
                  <p className="text-xs text-slate-400">{userEmail}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 w-56">
              <DropdownMenuLabel className="text-slate-300">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="text-slate-300 cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-300 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="text-red-400 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

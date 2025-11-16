# Sagebrush Theme System

A comprehensive theming system built with Tailwind v4 best practices, featuring 8 unique themes designed specifically for the cannabis licensing intelligence platform.

## 🎨 Available Themes

### 1. Purple Haze 💜
**Cannabis Royalty Meets Wall Street**
- **Philosophy**: Legendary strains deserve legendary wealth. Purple = premium cannabis + prosperity.
- **Best For**: Premium tier positioning, sophisticated investors who know their strains
- **Colors**: Deep purple (#9333ea) with gold accents (#f59e0b)

### 2. Golden Hour 🌅
**Sunset, Harvest, Wealth**
- **Philosophy**: The magic hour when the sun hits the canopy. Warm, optimistic, profitable.
- **Best For**: Wide market appeal, growth mindset, optimistic brand positioning
- **Colors**: Amber/Gold (#f59e0b) with warm orange accents (#ea580c)

### 3. Trichome 💎
**Crystal Clear Data**
- **Philosophy**: Like examining premium flower under magnification. Clean, precise, valuable.
- **Best For**: Data-first investors, analytical decision-makers
- **Colors**: Clean indigo (#6366f1) with purple accents (#8b5cf6)

### 4. West Coast 🌊
**Ocean, Sky, Innovation**
- **Philosophy**: Where cannabis culture was born. Blue oceans, blue skies, blue-chip returns.
- **Best For**: Innovation-focused positioning, tech-forward brand
- **Colors**: Sky blue (#0ea5e9) with teal accents (#14b8a6)

### 5. Tropical 🌴
**Island Growth, Exotic Returns**
- **Philosophy**: Think dispensaries in Hawaii, Bali, Caribbean. Vibrant, lush, thriving.
- **Best For**: Global expansion story, growth markets
- **Colors**: Emerald green (#10b981) with mango orange accents (#f59e0b)

### 6. Laboratory ⚗️
**Precision Medicine, Precision Investing**
- **Philosophy**: Cannabis is medicine. Testing labs, white coats, data-driven decisions.
- **Best For**: Medical cannabis angle, institutional investors
- **Colors**: Clinical blue (#3b82f6) with medical green accents (#10b981)

### 7. Neon Nights ⚡
**Vegas Meets Amsterdam**
- **Philosophy**: Bold, unapologetic, high-energy. Where nightlife meets high finance.
- **Best For**: Disruptive positioning, making bold statements
- **Colors**: Dark background (#0a0a0a) with neon green (#10b981) and pink (#f0abfc)

### 8. Champagne 🍾
**Celebrating Success, Premium Everything**
- **Philosophy**: Popping bottles when licenses drop. Luxury, celebration, victory.
- **Best For**: Ultra-premium positioning, high-net-worth individuals
- **Colors**: Deep gold (#ca8a04) with royal purple accents (#7c3aed)

## 🚀 Quick Start

### 1. Choose Your Theme

Edit `.env.local`:

```bash
NEXT_PUBLIC_THEME=purplehaze
```

Available values: `purplehaze`, `goldenhour`, `trichome`, `westcoast`, `tropical`, `laboratory`, `neon`, `champagne`

### 2. Restart Development Server

```bash
npm run dev
# or
pnpm dev
```

The entire site will now use your chosen theme!

## 🎯 Using Theme Colors in Your Components

### Tailwind Classes

All theme colors are available as Tailwind utility classes:

```tsx
// Background colors
<div className="bg-bg">          {/* Main background */}
<div className="bg-card">         {/* Card background */}

// Text colors
<p className="text-text">         {/* Main text */}
<p className="text-text-muted">   {/* Muted text */}

// Primary colors
<button className="bg-primary">              {/* Main primary */}
<button className="bg-primary-light">        {/* Light variant */}
<button className="bg-primary-dark">         {/* Dark variant */}

// Accent colors
<div className="bg-accent">       {/* Accent color */}
<div className="bg-accent-light"> {/* Light accent */}

// Borders
<div className="border border-border">

// Gradients
<div className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to">

// Chart colors (for data visualization)
<div className="bg-chart-1">
<div className="bg-chart-2">
<div className="bg-chart-3">
<div className="bg-chart-4">
```

### With Opacity

Tailwind v4 supports opacity modifiers:

```tsx
<div className="bg-primary/10">       {/* 10% opacity */}
<div className="bg-primary/50">       {/* 50% opacity */}
<div className="text-text/75">        {/* 75% opacity */}
```

### Pre-built Component Classes

Use these for consistent styling:

```tsx
<input className="input" />
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-accent">Accent Action</button>
```

## 🔄 Runtime Theme Switching

### Using the Theme Switcher Component

Add the theme switcher to any page for easy testing:

```tsx
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Page() {
  return (
    <div>
      {/* Your content */}
      <ThemeSwitcher />
    </div>
  );
}
```

### Using the Theme Hook

Switch themes programmatically:

```tsx
'use client';

import { useTheme } from '@/components/theme-provider';

export function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme('goldenhour')}>
      Switch to Golden Hour
    </button>
  );
}
```

## 🏗️ Technical Architecture

### CSS Variables (Tailwind v4 Best Practices)

The theme system uses CSS custom properties with RGB values for maximum flexibility:

```css
:root {
  --color-primary: 147 51 234;  /* RGB values */
}
```

This allows for:
- Opacity modifiers: `bg-primary/50`
- Better performance
- Easy theming
- SSR compatibility

### File Structure

```
lib/
  ├── themes.ts              # Theme definitions and utilities
  └── get-server-theme.ts    # Server-side theme detection

components/
  ├── theme-provider.tsx     # Client-side theme provider
  └── theme-switcher.tsx     # UI for testing themes

app/
  ├── globals.css            # CSS variables and base styles
  └── layout.tsx             # Root layout with ThemeProvider

tailwind.config.js           # Tailwind configuration
```

### How It Works

1. **Build Time**: `getServerTheme()` reads `NEXT_PUBLIC_THEME` from environment
2. **Hydration**: `ThemeProvider` receives default theme and hydrates on client
3. **Runtime**: CSS variables are updated when theme changes
4. **Styling**: Tailwind classes reference CSS variables with opacity support

## 📝 Best Practices

### 1. Always Use Theme Variables

❌ **Don't** use hardcoded colors:
```tsx
<div className="bg-purple-600 text-gray-900">
```

✅ **Do** use theme variables:
```tsx
<div className="bg-primary text-text">
```

### 2. Use Semantic Color Names

- `bg` - Main background
- `card` - Card/surface background
- `text` - Main text color
- `text-muted` - Secondary text
- `primary` - Primary brand color
- `accent` - Accent/secondary brand color
- `warning` - Alerts, warnings, important actions
- `border` - Border colors

### 3. Leverage Opacity Modifiers

```tsx
{/* Subtle backgrounds */}
<div className="bg-primary/10">

{/* Hover states */}
<button className="bg-primary hover:bg-primary/90">

{/* Overlays */}
<div className="bg-text/50">
```

### 4. Use Chart Colors for Data Viz

When building charts or graphs:

```tsx
const chartData = [
  { value: 100, color: 'bg-chart-1' },
  { value: 80, color: 'bg-chart-2' },
  { value: 60, color: 'bg-chart-3' },
  { value: 40, color: 'bg-chart-4' },
];
```

## 🎨 Customizing Themes

### Adding a New Theme

1. Edit `lib/themes.ts`:

```typescript
export const themes: Record<ThemeName, ThemeConfig> = {
  // ... existing themes
  mytheme: {
    name: 'My Theme',
    subtitle: 'Your subtitle',
    philosophy: 'Your philosophy',
    icon: '🌟',
    colors: {
      bg: '#ffffff',
      card: '#f9fafb',
      // ... all other colors
    },
  },
};
```

2. Update the `ThemeName` type to include your new theme

3. Set in `.env.local`:
```bash
NEXT_PUBLIC_THEME=mytheme
```

### Modifying Existing Themes

Simply edit the color values in `lib/themes.ts`. All components will automatically use the new colors.

## 🐛 Troubleshooting

### Theme not changing?
- Restart the dev server after changing `.env.local`
- Make sure `NEXT_PUBLIC_THEME` has the `NEXT_PUBLIC_` prefix
- Check the console for any theme validation errors

### Colors not applying?
- Ensure you're using the theme color classes (`bg-primary`, not `bg-purple-600`)
- Check that your component is inside the `<ThemeProvider>`
- Verify Tailwind is processing your files (check `content` in `tailwind.config.js`)

### Build errors?
- Make sure all theme names in `.env` match exactly (case-sensitive)
- Verify all required color values are defined in your theme

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

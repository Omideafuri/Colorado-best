import {
  Home,
  TrendingUp,
  Wallet,
  ArrowLeftRight,
  User,
  ShoppingCart,
  BarChart3,
  Settings,
  Shield,
  Users,
  FileText,
  Bell,
  Package,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  titleFa: string;
  titleEn: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const publicNavItems: NavItem[] = [
  { titleFa: 'خانه', titleEn: 'Home', href: '/', icon: Home },
  { titleFa: 'قیمت طلا', titleEn: 'Prices', href: '/prices', icon: TrendingUp },
  { titleFa: 'درباره ما', titleEn: 'About', href: '/about', icon: FileText },
  { titleFa: 'سوالات متداول', titleEn: 'FAQ', href: '/faq', icon: FileText },
];

export const dashboardNavItems: NavItem[] = [
  { titleFa: 'داشبورد', titleEn: 'Dashboard', href: '/dashboard', icon: Home },
  { titleFa: 'خرید طلا', titleEn: 'Buy Gold', href: '/buy', icon: ShoppingCart },
  { titleFa: 'فروش طلا', titleEn: 'Sell Gold', href: '/sell', icon: TrendingUp },
  { titleFa: 'کیف پول', titleEn: 'Wallet', href: '/wallet', icon: Wallet },
  { titleFa: 'تراکنش‌ها', titleEn: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { titleFa: 'فروشگاه فیزیکی', titleEn: 'Store', href: '/store', icon: ShoppingCart },
  { titleFa: 'انتقال طلا', titleEn: 'Transfer', href: '/transfer', icon: ArrowLeftRight },
  { titleFa: 'پسانداز', titleEn: 'Savings', href: '/savings', icon: BarChart3 },
  { titleFa: 'هشدار قیمت', titleEn: 'Alerts', href: '/alerts', icon: Bell },
  { titleFa: 'تحویل فیزیکی', titleEn: 'Delivery', href: '/delivery', icon: Package },
  { titleFa: 'پروفایل', titleEn: 'Profile', href: '/profile', icon: User },
  { titleFa: 'تنظیمات', titleEn: 'Settings', href: '/settings', icon: Settings },
];

export const mobileNavItems: NavItem[] = [
  { titleFa: 'خانه', titleEn: 'Home', href: '/dashboard', icon: Home },
  { titleFa: 'بازار', titleEn: 'Market', href: '/buy', icon: TrendingUp },
  { titleFa: 'کیف پول', titleEn: 'Wallet', href: '/wallet', icon: Wallet },
  { titleFa: 'تراکنشها', titleEn: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { titleFa: 'پروفایل', titleEn: 'Profile', href: '/profile', icon: User },
];

export const adminNavItems: NavItem[] = [
  { titleFa: 'داشبورد', titleEn: 'Dashboard', href: '/admin', icon: Home },
  { titleFa: 'کاربران', titleEn: 'Users', href: '/admin/users', icon: Users },
  { titleFa: 'احراز هویت', titleEn: 'KYC', href: '/admin/kyc', icon: Shield },
  { titleFa: 'قیمتگذاری', titleEn: 'Pricing', href: '/admin/prices', icon: TrendingUp },
  { titleFa: 'تراکنشها', titleEn: 'Transactions', href: '/admin/transactions', icon: ArrowLeftRight },
  { titleFa: 'تحویل', titleEn: 'Delivery', href: '/admin/delivery', icon: Package },
  { titleFa: 'گزارشات', titleEn: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { titleFa: 'لاگها', titleEn: 'Audit', href: '/admin/audit', icon: FileText },
  { titleFa: 'تنظیمات', titleEn: 'Settings', href: '/admin/settings', icon: Settings },
];

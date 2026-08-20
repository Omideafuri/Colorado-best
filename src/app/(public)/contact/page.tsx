import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">تماس با ما</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-surface p-8 space-y-6">
          <h2 className="text-xl font-bold text-text-primary">اطلاعات تماس</h2>
          <div className="space-y-4 text-text-secondary">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gold-500" />
              <span>۰۲۱-XXXXXXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gold-500" />
              <span>info@zaravi.gold</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold-500" />
              <span>تهران، خیابان ...، پلاک ...</span>
            </div>
          </div>
        </div>
        <div className="card-surface p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">نام شما</label>
              <input type="text" className="w-full rounded-lg border border-border bg-surface px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">پیام</label>
              <textarea rows={4} className="w-full rounded-lg border border-border bg-surface px-4 py-2"></textarea>
            </div>
            <Button variant="primary" className="w-full">ارسال پیام</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
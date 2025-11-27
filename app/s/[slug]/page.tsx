import { createClient } from '@supabase/supabase-js';
import { redirect, notFound } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 1. Update type definition to be a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ShortRedirectPage({ params }: Props) {
  
  // 2. Await the params before using them
  const { slug } = await params;

  // 3. Look up the original URL
  const { data } = await supabase
    .from('short_links')
    .select('original_url')
    .eq('slug', slug) // Use the awaited slug variable
    .single();

  // 4. If not found, show 404
  if (!data || !data.original_url) {
    return notFound();
  }

  // 5. Redirect
  redirect(data.original_url);
}
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const normalizeBrandSlug = (brandName: string) => {
  const base = brandName.trim().toLowerCase();
  const slug = base.replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return slug;
};

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        error:
          'Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server environment.',
      },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as null | {
    brandName?: string;
    managerName?: string;
    contact?: string;
  };

  const brandName = (body?.brandName ?? '').trim();
  if (!brandName) {
    return NextResponse.json({ error: 'brandName is required' }, { status: 400 });
  }

  const slug = normalizeBrandSlug(brandName);
  if (!slug) {
    return NextResponse.json(
      { error: 'brandName must contain at least one ASCII letter/number for ID generation.' },
      { status: 400 }
    );
  }

  const email = `${slug}@areum.com`;
  const password = `${slug}2026`;

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role: 'brand',
      brand_name: brandName,
      manager_name: body?.managerName ?? null,
      contact: body?.contact ?? null,
    },
  });

  if (createError || !created.user) {
    const msg = createError?.message ?? 'Failed to create user';
    const lower = msg.toLowerCase();
    const existed =
      lower.includes('already') ||
      lower.includes('registered') ||
      lower.includes('exists') ||
      lower.includes('duplicate');

    if (existed) {
      return NextResponse.json({ email, existed: true }, { status: 200 });
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const userId = created.user.id;

  const profilePayload = {
    user_id: userId,
    email,
    brand_name: brandName,
    owner_name: body?.managerName ?? null,
    phone: body?.contact ?? null,
    role: 'brand' as const,
  };

  // Try brands first, fallback profiles
  const insertTo = async (table: 'brands' | 'profiles') => {
    const { error } = await admin.from(table).insert(profilePayload);
    if (error) throw error;
  };

  try {
    await insertTo('brands');
  } catch (_err) {
    try {
      await insertTo('profiles');
    } catch (_err2) {
      // ignore: auth user created is still valid
    }
  }

  return NextResponse.json({ email, password, existed: false }, { status: 201 });
}

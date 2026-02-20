const SUPABASE_URL = (process.env.SUPABASE_URL || "").trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
const BUCKET = "ops-data";

export function hasRemoteStore() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

async function ensureBucket() {
  if (!hasRemoteStore()) return;
  await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      apikey: SUPABASE_SERVICE_ROLE_KEY,
    },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: false }),
  }).catch(() => null);
}

export async function readRemoteJson<T>(key: string): Promise<T[]> {
  if (!hasRemoteStore()) return [];
  await ensureBucket();

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURIComponent(key)}`, {
    headers: {
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      apikey: SUPABASE_SERVICE_ROLE_KEY,
    },
  });

  if (!res.ok) return [];
  const txt = await res.text();
  try {
    const parsed = JSON.parse(txt);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export async function writeRemoteJson<T>(key: string, rows: T[]) {
  if (!hasRemoteStore()) return;
  await ensureBucket();

  await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      "x-upsert": "true",
    },
    body: JSON.stringify(rows, null, 2),
  });
}

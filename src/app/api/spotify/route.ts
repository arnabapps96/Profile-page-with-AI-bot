import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const song = await getNowPlaying();

    if (!song) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json(song);
  } catch (error) {
    console.error('Spotify API Error:', error);
    return NextResponse.json({ isPlaying: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

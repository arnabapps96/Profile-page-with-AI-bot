import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const song = await getNowPlaying();

    if (!song) {
      // This happens if getNowPlaying returns null (error or no tracks)
      return NextResponse.json({ isPlaying: false, status: 'No song found or error' });
    }

    return NextResponse.json(song);
  } catch (error: any) {
    console.error('Spotify API Route Error:', error);
    return NextResponse.json({ 
      isPlaying: false, 
      error: 'Failed to fetch',
      message: error.message 
    }, { status: 500 });
  }
}

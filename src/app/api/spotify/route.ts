import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getNowPlaying();

    if (!data) {
      return NextResponse.json({ isPlaying: false, status: 'No data returned from getNowPlaying' });
    }

    if ((data as any).error) {
      return NextResponse.json({ isPlaying: false, status: 'Error', message: (data as any).message });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Spotify API Route Error:', error);
    return NextResponse.json({ 
      isPlaying: false, 
      status: 'Exception in Route',
      message: error.message 
    }, { status: 500 });
  }
}

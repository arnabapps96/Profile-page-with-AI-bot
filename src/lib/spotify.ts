const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const CURRENTLY_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=15`;

const getAccessToken = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Spotify environment variables are missing');
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to get access token: ${JSON.stringify(errorData)}`);
  }

  return response.json();
};

export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    let songData = null;
    if (response.status === 200) {
      songData = await response.json();
    }

    // If nothing is playing (204), error, or paused (!is_playing), fetch recently played
    if (response.status === 204 || response.status > 400 || !songData || !songData.is_playing) {
      const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!recentResponse.ok) {
        return null;
      }
      
      const recentData = await recentResponse.json();
      if (!recentData.items || recentData.items.length === 0) return null;
      
      // De-duplicate by track ID
      const uniqueTracks: any[] = [];
      const seenIds = new Set();
      
      for (const item of recentData.items) {
        if (!seenIds.has(item.track.id)) {
          seenIds.add(item.track.id);
          uniqueTracks.push({
            title: item.track.name,
            artist: item.track.artists.map((_artist: any) => _artist.name).join(', '),
            album: item.track.album.name,
            albumImageUrl: item.track.album.images[0].url,
            songUrl: item.track.external_urls.spotify,
          });
        }
        if (uniqueTracks.length === 5) break;
      }
      
      return {
        isPlaying: false,
        recentTracks: uniqueTracks
      };
    }

    return {
      isPlaying: songData.is_playing,
      title: songData.item.name,
      artist: songData.item.artists.map((_artist: any) => _artist.name).join(', '),
      album: songData.item.album.name,
      albumImageUrl: songData.item.album.images[0].url,
      songUrl: songData.item.external_urls.spotify,
    };
  } catch (error) {
    console.error('getNowPlaying Error:', error);
    return null;
  }
};

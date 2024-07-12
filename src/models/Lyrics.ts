export interface HitResponse {
  highlights: [];
  index: string;
  type: string;
  result: {
    url: string;
    path: string;
    lyrics_state: 'complete' | 'incomplete';
    title: string;
    primary_artist_names: string;
  };
}
export interface LyricsResponse {
  meta: { status: number };
  response?: { hits: HitResponse[] };
}

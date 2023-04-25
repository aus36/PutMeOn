import useAuth from '../hooks/useAuth';

const { spotify } = useAuth();

// db reference
// const deck = {
//   id: "",
//   name: "",
//   likedTrackIDs: [] as string[],
//   dislikedTrackIDs: [] as string[],
// }

class DeckManager {
  tracks: SpotifyApi.TrackObjectFull[];

  constructor(tracks: SpotifyApi.TrackObjectFull[] = []) {
    this.tracks = tracks;
  }

  /**
   * Initializes the deck with a given size
   * @param finalSize the size of the deck after filtering
   * @param responseSize the size of the response from the spotify api
   */
  public async initializeDeck(seed_tracks: string[], seed_genres: string[], seed_artists: string[], finalSize: number = 20, responseSize: number = 50) {
    spotify.getRecommendations({
      seed_tracks: seed_tracks,
      seed_genres: seed_genres,
      seed_artists: seed_artists,
      limit: responseSize,
    }).then((response) => {
      var tracks = response.tracks as SpotifyApi.TrackObjectFull[];
      tracks = tracks.filter((track) => track.preview_url != null);
      tracks = tracks.slice(0, finalSize);
      this.tracks = tracks;
      return tracks;
    });
  }

  public setTracks(tracks: SpotifyApi.TrackObjectFull[]) {
    this.tracks = tracks;
  }

  public getTracks() {
    return this.tracks;
  }
}

export default DeckManager;
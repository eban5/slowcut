export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
}

export interface WatchProviders {
  link?: string;
  buy?: any[];
  rent?: any[];
  flatrate?: any[];
}

export interface JustWatchMethod {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface JustWatchResults {
  link?: string;
  rent?: JustWatchMethod[];
  buy?: JustWatchMethod[];
  flatrate?: JustWatchMethod[];
}

export interface ContentProviders {
  apple_itunes?: string[];
  google_play?: string[];
  amazon_video?: string[];
  youtube?: string[];
}

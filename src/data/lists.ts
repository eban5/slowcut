interface Movie {
  poster: string;
}

export interface List {
  title: string;
  username: string; // TODO: create User type
  timestamp?: string;
  // items: Movie[];
}

// TODO remove when we get more real data
export const randomSearchTerms: string[] = [
  "batman",
  "war",
  "superman",
  "spiderman",
  "space",
  "volcano",
  "music",
];

export const lists = (): List[] => {
  return [
    {
      title: "Top 10 Action Movies",
      username: "User A. Person",
    },
    {
      title: "Top 10 Drama Movies",
      username: "User B. Person",
    },
    {
      title: "Top 10 SciFi Movies",
      username: "User C. Person",
    },
  ];
};

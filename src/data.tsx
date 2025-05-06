export type Difficulty = {
  levelName: string;
  value: number;
  faceValue: string;
}

export type rhythmGameSong = {
  id: number;
  songName: string;
  artist: string;
  difficultyList: Difficulty[];
  songLink: string;
  chartLink: string;
  category: string;
  version: string;
  omnimix: boolean;
};

// TODO: Change links and add expert chart links
// TODO: Add version that songs originated from
// TODO: Omnimix or not
// TODO: Add category for each song
export const rhythmGameSongs: rhythmGameSong[] = [
  {
    id: 0,
    songName: "Rabbit Hole",
    artist: "DECO*27",
    difficultyList: [
      { levelName: "Basic", value: 3.0, faceValue: "3" },
      { levelName: "Advanced", value: 7.0, faceValue: "7" },
      { levelName: "Expert", value: 11.0, faceValue: "11" },
      { levelName: "Master", value: 13.7, faceValue: "13+" },
    ],
    songLink: "https://www.youtube.com/watch?v=eSW2LVbPThw&pp=ygULcmFiYml0IGhvbGU%3D",
    chartLink: "https://www.youtube.com/watch?v=09EtW7gFEVM&pp=ygUUcmFiYml0IGhvbGUgY2h1bml0aG0%3D",
    category: "P&A",
    version: "verse",
    omnimix: false,
  },
  {
    id: 1,
    songName: "Goodbye Innocence",
    artist: "She is Legend「ヘブンバーンズレッド」",
    difficultyList: [
      { levelName: "Basic", value: 3.0, faceValue: "3" },
      { levelName: "Advanced", value: 6.0, faceValue: "6" },
      { levelName: "Expert", value: 10.0, faceValue: "10" },
      { levelName: "Master", value: 12.7, faceValue: "12+" },
    ],
    songLink: "https://www.youtube.com/watch?v=z5htbwxjhlw&pp=ygURZ29vZGJ5ZSBpbm5vY2VuY2XSBwkJhAkBhyohjO8%3D",
    chartLink: "https://www.youtube.com/watch?v=nrzv5q3uc1c&pp=ygUaZ29vZGJ5ZSBpbm5vY2VuY2UgY2h1bml0aG3SBwkJhAkBhyohjO8%3D",
    category: "P&A",
    version: "sunPlus",
    omnimix: false,
  },
  {
    id: 3,
    songName: "Sad Creature",
    artist: "She is Legend「ヘブンバーンズレッド」",
    difficultyList: [
      { levelName: "Basic", value: 3.0, faceValue: "3" },
      { levelName: "Advanced", value: 6.0, faceValue: "6" },
      { levelName: "Expert", value: 9.5, faceValue: "9+" },
      { levelName: "Master", value: 12.9, faceValue: "12+" },
    ],
    songLink: "https://www.youtube.com/watch?v=z5htbwxjhlw&pp=ygURZ29vZGJ5ZSBpbm5vY2VuY2XSBwkJhAkBhyohjO8%3D",
    chartLink: "https://www.youtube.com/watch?v=nrzv5q3uc1c&pp=ygUaZ29vZGJ5ZSBpbm5vY2VuY2UgY2h1bml0aG3SBwkJhAkBhyohjO8%3D",
    category: "P&A",
    version: "sunPlus",
    omnimix: false,
  },
  {
    id: 4,
    songName: "Burn My Soul",
    artist: "She is Legend「ヘブンバーンズレッド」",
    difficultyList: [
      { levelName: "Basic", value: 3.0, faceValue: "3" },
      { levelName: "Advanced", value: 5.0, faceValue: "5" },
      { levelName: "Expert", value: 9.0, faceValue: "9" },
      { levelName: "Master", value: 12.8, faceValue: "12+" },
    ],
    songLink: "https://www.youtube.com/watch?v=z5htbwxjhlw&pp=ygURZ29vZGJ5ZSBpbm5vY2VuY2XSBwkJhAkBhyohjO8%3D",
    chartLink: "https://www.youtube.com/watch?v=nrzv5q3uc1c&pp=ygUaZ29vZGJ5ZSBpbm5vY2VuY2UgY2h1bml0aG3SBwkJhAkBhyohjO8%3D",
    category: "P&A",
    version: "sun",
    omnimix: false,
  },
  {
    id: 5,
    songName: "Before I Rise",
    artist: "麻枝 准×やなぎなぎ「ヘブンバーンズレッド」",
    difficultyList: [
      { levelName: "Basic", value: 2.0, faceValue: "2" },
      { levelName: "Advanced", value: 5.0, faceValue: "5" },
      { levelName: "Expert", value: 8.5, faceValue: "8+" },
      { levelName: "Master", value: 11.9, faceValue: "11+" },
    ],
    songLink: "https://www.youtube.com/watch?v=z5htbwxjhlw&pp=ygURZ29vZGJ5ZSBpbm5vY2VuY2XSBwkJhAkBhyohjO8%3D",
    chartLink: "https://www.youtube.com/watch?v=nrzv5q3uc1c&pp=ygUaZ29vZGJ5ZSBpbm5vY2VuY2UgY2h1bml0aG3SBwkJhAkBhyohjO8%3D",
    category: "P&A",
    version: "sun",
    omnimix: false,
  },
  {
    id: 6,
    songName: "Hibana",
    artist: "DECO*27",
    difficultyList: [
      { levelName: "Basic", value: 3.0, faceValue: "3" },
      { levelName: "Advanced", value: 6.0, faceValue: "6" },
      { levelName: "Expert", value: 9.5, faceValue: "9+" },
      { levelName: "Master", value: 13.7, faceValue: "13+" },
      { levelName: "Ultima", value: 14.0, faceValue: "14" },
    ],
    songLink: "https://www.youtube.com/watch?v=z5htbwxjhlw&pp=ygURZ29vZGJ5ZSBpbm5vY2VuY2XSBwkJhAkBhyohjO8%3D",
    chartLink: "https://www.youtube.com/watch?v=nrzv5q3uc1c&pp=ygUaZ29vZGJ5ZSBpbm5vY2VuY2UgY2h1bml0aG3SBwkJhAkBhyohjO8%3D",
    category: "P&A",
    version: "crystal",
    omnimix: false,
  },
  {
    id: 7,
    songName: "Territory Battle",
    artist: "Tuyu",
    difficultyList: [
      { levelName: "Basic", value: 2.0, faceValue: "2" },
      { levelName: "Advanced", value: 5.0, faceValue: "5" },
      { levelName: "Expert", value: 9.0, faceValue: "9" },
      { levelName: "Master", value: 12.4, faceValue: "12" },
    ],
    songLink: "https://www.youtube.com/watch?v=z5htbwxjhlw&pp=ygURZ29vZGJ5ZSBpbm5vY2VuY2XSBwkJhAkBhyohjO8%3D",
    chartLink: "https://www.youtube.com/watch?v=nrzv5q3uc1c&pp=ygUaZ29vZGJ5ZSBpbm5vY2VuY2UgY2h1bml0aG3SBwkJhAkBhyohjO8%3D",
    category: "Original",
    version: "paradiseLost",
    omnimix: true,
  },
];



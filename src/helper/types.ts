export interface Difficulty {
  levelName: string;
  value: number;
  faceValue: string;
}

export interface RhythmGameSong {
  id: number;
  songName: string;
  artist: string;
  image: string;
  difficultyList: Difficulty[];
  songLink: string;
  ultimaChartLink: string;
  masterChartLink: string;
  expertChartLink: string;
  category: string;
  version: string;
  omnimix: boolean;
}

// Legacy type for backward compatibility
export type rhythmGameSong = RhythmGameSong;
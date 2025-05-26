# Rhythm Game Info

This is a test Vite + React + TypeScript project for looking through songs from Chunithm, a japanese rhythm game

# Installing dependencies

After cloning the project, use `npm install` to instal dependencies

# Hooking up to a database

Create a .env.local file and fill in the required information

This project uses supabase and has the following schema:

```
export type Difficulty = {
  levelName: string;
  value: number;
  faceValue: string;
};

rhythmGameSong = {
  id: number;
  songName: string;
  artist: string;
  difficultyList: Difficulty[];
  songLink: string;
  ultimaChartLink: string;
  masterChartLink: string;
  expertChartLink: string;
  category: string;
  version: string;
  omnimix: boolean;
};
```

An example entry would be:

```
 {
    "id": 3,
    "songName": "Gate of Fate",
    "artist": "Godspeed",
    "difficultyList": [
      {
        "value": 3,
        "faceValue": "3",
        "levelName": "Basic"
      },
      {
        "value": 5,
        "faceValue": "5",
        "levelName": "Advanced"
      },
      {
        "value": 9.5,
        "faceValue": "9+",
        "levelName": "Expert"
      },
      {
        "value": 12,
        "faceValue": "12",
        "levelName": "Master"
      },
      {
        "value": 14.1,
        "faceValue": "14",
        "levelName": "Ultima"
      }
    ],
    "songLink": "https://www.youtube.com/watch?v=pPjVxvlcKdU&pp=ygUaY2h1bml0aG0gZ2F0ZSBvZiBmYXRlIHNvbmc%3D",
    "masterChartLink": "https://www.youtube.com/watch?v=-ipxGf6aLVs&pp=ygUVY2h1bml0aG0gZ2F0ZSBvZiBmYXRl",
    "expertChartLink": "https://www.youtube.com/watch?v=ZGw-DjQxt-E&pp=ygUVY2h1bml0aG0gZ2F0ZSBvZiBmYXRl",
    "category": "Original",
    "version": "chunithm",
    "omnimix": false,
    "ultimaChartLink": "https://www.youtube.com/watch?v=_KKTmBiHbWk&pp=ygUVY2h1bml0aG0gZ2F0ZSBvZiBmYXRl0gcJCYYJAYcqIYzv"
  }
```

# Running the project

Use the following command to run the project: `npm run dev`

# TODO

1. ~~Add more filters when searching~~
2. ~~Add randomizer option to select any amount of songs~~ Changed to align with course mode
3. ~~Put data into database and call it rather than using data.tsx~~
4. ~~Add images to the data~~
5. Make it mobile friendly (only works well in desktop right now)
6. Possibly add more songs on different games
7. ~~Try to make all the song titles to English (yay....)~~ This one is on the database side anyways
8. Allow songs to be searched with aliases (Change to backend, but should make songs easier to look for)
9. Make admin panel for adding songs (This will make life a lot easier when going back to the top part)

# Credits

https://wikiwiki.jp/chunithmwiki/: General list of Songs and images
https://irodorimidori.fandom.com/wiki/Irodorimidori_Wiki: List of Irodorimidori songs
https://vocaloidlyrics.fandom.com/wiki/Vocaloid_Lyrics_Wiki: List of Vocaloid songs in romaji
https://docs.google.com/spreadsheets/d/1xP1huTSA-XWKZaDfmyNh-viRbUE777d2Rg54j5-2VAU/edit?gid=86796591#gid=86796591: Codex for confirming chart constants

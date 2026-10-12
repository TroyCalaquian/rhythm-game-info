# Rhythm Game Info

A searchable database of songs and charts from [Chunithm](https://chunithm.sega.jp/), a Japanese rhythm game. Look up a song, see every difficulty and its chart constant, and jump straight to the song and chart videos.

**Live site:** [https://warm-mooncake-33e06b.netlify.app/](https://warm-mooncake-33e06b.netlify.app)

> Unofficial fan project. Not affiliated with or endorsed by SEGA.

## Features

- Search songs by name or artist
- Per-song difficulty breakdown (Basic through Ultima) with chart constants
- Links to the song and to Master, Expert, and Ultima chart videos
- Song metadata: category, version, and omnimix flag

## Tech Stack

- **Framework:** React, TypeScript, Vite
- **Styling/UI:** HeroUI, Tailwind CSS
- **Animation:** GSAP
- **Database:** Supabase
- **Hosting:** Netlify

## Getting Started

1. Clone the repository and install dependencies:

   ```
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your Supabase credentials (see [Database Setup](#database-setup)).

3. Start the development server:

   ```
   npm run dev
   ```

To test a production build locally:

```
npm run build
npm run preview
```

## Database Setup

This project reads songs from a Supabase table. Create a project at [supabase.com](https://supabase.com), then add your credentials to `.env.local`:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Create a songs table matching the schema below, then insert entries in the same shape as the example.

### Schema

```ts
type Difficulty = {
  levelName: string; // e.g. "Master"
  value: number; // numeric chart constant, e.g. 9.5 (used for sorting/rating)
  faceValue: string; // level as shown in-game, e.g. "9+"
};

type RhythmGameSong = {
  id: number;
  songName: string;
  artist: string;
  difficultyList: Difficulty[];
  songLink: string; // video of the song
  ultimaChartLink: string; // chart videos
  masterChartLink: string;
  expertChartLink: string;
  category: string; // e.g. "Original"
  version: string; // game version the song was added in
  omnimix: boolean; // true if the song only exists in Omnimix
};
```

<details>
<summary>Example entry</summary>

```json
{
  "id": 3,
  "songName": "Gate of Fate",
  "artist": "Godspeed",
  "difficultyList": [
    { "levelName": "Basic", "value": 3, "faceValue": "3" },
    { "levelName": "Advanced", "value": 5, "faceValue": "5" },
    { "levelName": "Expert", "value": 9.5, "faceValue": "9+" },
    { "levelName": "Master", "value": 12, "faceValue": "12" },
    { "levelName": "Ultima", "value": 14.1, "faceValue": "14" }
  ],
  "songLink": "https://www.youtube.com/watch?v=pPjVxvlcKdU",
  "masterChartLink": "https://www.youtube.com/watch?v=-ipxGf6aLVs",
  "expertChartLink": "https://www.youtube.com/watch?v=ZGw-DjQxt-E",
  "ultimaChartLink": "https://www.youtube.com/watch?v=_KKTmBiHbWk",
  "category": "Original",
  "version": "chunithm",
  "omnimix": false
}
```

</details>

# TODO

1. Make it mobile friendly (only works well in desktop right now)
2. Possibly add more songs on different games
3. Add BPM to all songs
4. Allow songs to be searched with aliases (Change to backend, but should make songs easier to look for)
5. Add Worlds End option to all songs (Website's focus is more on charts that provide rating)
6. Put front facing text into localization document (Possibly support multiple languages?)
7. Link to topdown view of chart.
8. Link/refer to codex entry (VERY UNLIKELY)
9. Change styling to be closer to Chunithm
10. Convert from Supabase auth to Clerk

## Credits

All songs, videos, and images belong to their respective owners.

- [Chunithm Wiki](https://wikiwiki.jp/chunithmwiki/): general song list and images
- [Irodorimidori Wiki](https://irodorimidori.fandom.com/wiki/Irodorimidori_Wiki): Irodorimidori song list
- [Vocaloid Lyrics Wiki](https://vocaloidlyrics.fandom.com/wiki/Vocaloid_Lyrics_Wiki): Vocaloid songs in romaji
- [Chart constants codex](https://docs.google.com/spreadsheets/d/1xP1huTSA-XWKZaDfmyNh-viRbUE777d2Rg54j5-2VAU/edit?gid=86796591#gid=86796591): used to confirm chart constants

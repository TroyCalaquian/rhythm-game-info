import Modal from "react-modal";
import { rhythmGameSong } from "../types";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  rhythmGameSongs: rhythmGameSong[];
}

function RandomizerModal({
  isModalOpen,
  setIsModalOpen,
  selectedClass,
  setSelectedClass,
  rhythmGameSongs,
}: Props) {
  const classFaceValues: { [key: string]: string[] } = {
    "1": ["10", "10+", "11"],
    "2": ["11+", "12", "12+"],
    "3": ["12+", "13", "13+"],
    "4": ["13+", "14", "14+"],
    "5": ["14", "14+", "15"],
    "6": ["14+", "15", "15+"],
  };

  const [pickedSongs, setPickedSongs] = useState<rhythmGameSong[]>([]);
  const [includeOmnimix, setIncludeOmnimix] = useState(false);

  useEffect(() => {
    console.log("pickedSongs updated:", pickedSongs);
  }, [pickedSongs]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Randomizer Modal"
        className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl max-h-[90vh] overflow-auto p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <h2 className="text-2xl font-bold mb-4">Randomize Songs</h2>

        {/* Class Selector */}
        <div className="mt-4">
          <p className="font-semibold mb-2">Select Class:</p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "i", value: "1" },
              { label: "ii", value: "2" },
              { label: "iii", value: "3" },
              { label: "iv", value: "4" },
              { label: "v", value: "5" },
              { label: "INF", value: "6" },
            ].map((item) => (
              <label key={item.value} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="courseClass"
                  value={item.value}
                  checked={selectedClass === item.value}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="accent-blue-600"
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Omnimix Toggle */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="randomOmnimixFilter"
            className="accent-blue-600"
            checked={includeOmnimix}
            onChange={(e) => setIncludeOmnimix(e.target.checked)}
          />
          <label htmlFor="randomOmnimixFilter" className="text-sm">
            Include Omnimix Songs
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded text-sm"
          >
            Close
          </button>
          <button
            onClick={() => {
              const classLevels = classFaceValues[selectedClass];
              const songsByLevel: { [level: string]: rhythmGameSong[] } = {};
              classLevels.forEach((level) => {
                songsByLevel[level] = [];
              });

              rhythmGameSongs.forEach((song) => {
                const shouldIncludeSong = includeOmnimix || !song.omnimix;
                if (shouldIncludeSong) {
                  song.difficultyList.forEach((difficulty) => {
                    if (classLevels.includes(difficulty.faceValue)) {
                      songsByLevel[difficulty.faceValue].push(song);
                    }
                  });
                }
              });

              const selectedSongs: rhythmGameSong[] = [];
              classLevels.forEach((level) => {
                const songs = songsByLevel[level];
                if (songs.length > 0) {
                  const randomSong =
                    songs[Math.floor(Math.random() * songs.length)];
                  selectedSongs.push(randomSong);
                }
              });

              setPickedSongs(selectedSongs);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            Randomize
          </button>
        </div>

        {/* Picked Songs */}
        {pickedSongs.length > 0 && (
          <div className="mt-6">
            <h5 className="text-lg font-semibold mb-3">Picked Songs:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pickedSongs.map((item, index) => (
                <GameCard
                  key={index}
                  songName={item.songName}
                  artist={item.artist}
                  image={item.image}
                  difficultyList={item.difficultyList}
                  songLink={item.songLink}
                  ultimaChartLink={item.ultimaChartLink}
                  masterChartLink={item.masterChartLink}
                  expertChartLink={item.expertChartLink}
                />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default RandomizerModal;

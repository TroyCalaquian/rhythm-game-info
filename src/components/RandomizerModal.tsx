import Modal from "react-modal";
import { rhythmGameSong } from "../data";
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
    "1": ["10", "10+", "11"], // Class "i"
    "2": ["11+", "12", "12+"], // Class "ii"
    "3": ["12+", "13", "13+"], // Class "iii"
    "4": ["13+", "14", "14+"], // Class "iv"
    "5": ["14", "14+", "15"], // Class "v"
    "6": ["14+", "15", "15+"], // Class "INF"
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
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            width: "80%", // Adjust this to control the width
            maxWidth: "1000px", // Optionally set a max width
            maxHeight: "90vh", // Limit max height
            overflow: "auto", // Enable scroll when needed
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2>Randomize Songs</h2>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Select Class:</strong>
          </p>
          <div>
            {[
              { label: "i", value: "1" },
              { label: "ii", value: "2" },
              { label: "iii", value: "3" },
              { label: "iv", value: "4" },
              { label: "v", value: "5" },
              { label: "INF", value: "6" },
            ].map((item) => (
              <label key={item.value} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  name="courseClass"
                  value={item.value}
                  checked={selectedClass === item.value}
                  onChange={(e) => setSelectedClass(e.target.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="randomOmnimixFilter"
            checked={includeOmnimix} // This is the state controlling the toggle
            onChange={(e) => setIncludeOmnimix(e.target.checked)} // Updates the state on toggle change
          />
          <label
            className="form-check-label"
            htmlFor="randomOmnimixFilter"
            style={{ marginLeft: "8px" }}
          >
            Include Omnimix Songs
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <a
            className="btn btn-secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </a>
          <a
            className="btn btn-primary"
            onClick={() => {
              console.log("Randomizing with class:", selectedClass);
              const classLevels = classFaceValues[selectedClass];
              console.log(classLevels);

              const songsByLevel: { [level: string]: rhythmGameSong[] } = {};

              // Initialize empty arrays for each level
              classLevels.forEach((level) => {
                songsByLevel[level] = [];
              });

              // For each song, check which levels it matches and push into that bucket
              rhythmGameSongs.forEach((song) => {
                // Always include non-Omnimix songs
                if (!song.omnimix) {
                  song.difficultyList.forEach((difficulty) => {
                    if (classLevels.includes(difficulty.faceValue)) {
                      songsByLevel[difficulty.faceValue].push(song);
                    }
                  });
                }

                // If Omnimix filter is on, include Omnimix songs
                if (includeOmnimix && song.omnimix) {
                  song.difficultyList.forEach((difficulty) => {
                    if (classLevels.includes(difficulty.faceValue)) {
                      songsByLevel[difficulty.faceValue].push(song);
                    }
                  });
                }
              });

              console.log("Songs by level:", songsByLevel);

              const selectedSongs: rhythmGameSong[] = [];

              // Pick one random song for each level
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
          >
            Randomize
          </a>
        </div>

        {pickedSongs.length > 0 && (
          <div className="mt-4">
            <h5>Picked Songs:</h5>
            <div className="row">
              {" "}
              {pickedSongs.map((item, index) => (
                <div key={index} className="col">
                  <GameCard
                    songName={item.songName}
                    artist={item.artist}
                    difficultyList={item.difficultyList}
                    songLink={item.songLink}
                    chartLink={item.chartLink}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default RandomizerModal;

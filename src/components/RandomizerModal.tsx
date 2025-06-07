import { rhythmGameSong } from "../types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Switch,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";

interface Props {
  isModalOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  rhythmGameSongs: rhythmGameSong[];
}

function RandomizerModal({
  isModalOpen,
  selectedClass,
  onOpenChange,
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
      <Modal isOpen={isModalOpen} size={"5xl"} onOpenChange={onOpenChange}>
        <ModalContent className="max-h-[90vh] overflow-y-auto">
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-2xl font-bold mb-4">Randomize Songs</h2>
              </ModalHeader>
              <ModalBody>
                {" "}
                <div className="mt-4">
                  <RadioGroup label="Select Class:" orientation="horizontal" defaultValue={selectedClass}>
                    {[
                      { label: "i", value: "1" },
                      { label: "ii", value: "2" },
                      { label: "iii", value: "3" },
                      { label: "iv", value: "4" },
                      { label: "v", value: "5" },
                      { label: "INF", value: "6" },
                    ].map((option) => (
                      <Radio
                        key={option.value}
                        value={option.value}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="accent-blue-600"
                      >
                        {option.label}
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Switch
                    isSelected={includeOmnimix}
                    onChange={(e) => setIncludeOmnimix(e.target.checked)}
                  >
                    Include Omnimix Songs
                  </Switch>
                </div>
                {pickedSongs.length > 0 && (
                  <div className="mt-6">
                    <h5 className="text-lg font-semibold mb-3">
                      Picked Songs:
                    </h5>
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
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded text-sm"
                >
                  Close
                </Button>
                <Button
                  onPress={() => {
                    const classLevels = classFaceValues[selectedClass];
                    const songsByLevel: { [level: string]: rhythmGameSong[] } =
                      {};
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
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RandomizerModal;

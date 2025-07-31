import { RhythmGameSong } from "../helper/types";
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
  Card,
  CardBody,
  Chip,
  Divider,
} from "@heroui/react";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";

interface Props {
  isModalOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  rhythmGameSongs: RhythmGameSong[];
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

  const [pickedSongs, setPickedSongs] = useState<RhythmGameSong[]>([]);
  const [includeOmnimix, setIncludeOmnimix] = useState(false);

  useEffect(() => {
    console.log("pickedSongs updated:", pickedSongs);
  }, [pickedSongs]);

  const handleRandomize = () => {
    const classLevels = classFaceValues[selectedClass];
    const songsByLevel: { [level: string]: RhythmGameSong[] } = {};
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

    const selectedSongs: RhythmGameSong[] = [];
    classLevels.forEach((level) => {
      const songs = songsByLevel[level];
      if (songs.length > 0) {
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        selectedSongs.push(randomSong);
      }
    });

    setPickedSongs(selectedSongs);
  };

  return (
    <Modal isOpen={isModalOpen} size="5xl" onOpenChange={onOpenChange}>
      <ModalContent className="max-h-[90vh] overflow-y-auto">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Song Randomizer</h2>
                  <p className="text-gray-600">Generate random songs based on difficulty class</p>
                </div>
              </div>
            </ModalHeader>
            
            <ModalBody className="space-y-6">
              <Card className="border border-gray-200">
                <CardBody className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Class</h3>
                      <RadioGroup 
                        label="Select your difficulty class:" 
                        orientation="horizontal" 
                        defaultValue={selectedClass}
                        classNames={{
                          wrapper: "gap-4",
                        }}
                      >
                        {[
                          { label: "Class i", value: "1", description: "10-11" },
                          { label: "Class ii", value: "2", description: "11+-12+" },
                          { label: "Class iii", value: "3", description: "12+-13+" },
                          { label: "Class iv", value: "4", description: "13+-14+" },
                          { label: "Class v", value: "5", description: "14-15" },
                          { label: "Class INF", value: "6", description: "14+-15+" },
                        ].map((option) => (
                          <Radio
                            key={option.value}
                            value={option.value}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            classNames={{
                              base: "flex items-center gap-2",
                              label: "text-sm font-medium",
                            }}
                          >
                            <div>
                              <div className="font-semibold">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.description}</div>
                            </div>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </div>

                    <Divider />

                    <div className="flex items-center gap-3">
                      <Switch
                        isSelected={includeOmnimix}
                        onValueChange={setIncludeOmnimix}
                        size="lg"
                        color="primary"
                      />
                      <div>
                        <div className="text-sm font-medium">Include Omnimix Songs</div>
                        <div className="text-xs text-gray-500">Include songs from Omnimix versions</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {pickedSongs.length > 0 && (
                <Card className="border border-gray-200">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Chip color="success" variant="flat" size="sm">
                        {pickedSongs.length} songs selected
                      </Chip>
                      <h3 className="text-lg font-semibold text-gray-900">Randomized Songs</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pickedSongs.map((item, index) => (
                        <div key={index} className="transform transition-all duration-200 hover:scale-105">
                          <GameCard song={item} />
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}
            </ModalBody>
            
            <ModalFooter>
              <Button 
                color="danger" 
                variant="flat" 
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleRandomize}
                className="font-semibold"
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              >
                Randomize Songs
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default RandomizerModal;

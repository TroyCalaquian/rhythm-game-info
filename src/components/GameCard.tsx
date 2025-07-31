import { Difficulty, RhythmGameSong } from "../helper/types";
import DifficultyListDisplay from "./DifficultyListDisplay";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@heroui/react";
import { useState } from "react";

interface GameCardProps {
  song: RhythmGameSong;
}

function GameCard({ song }: GameCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-56">
      <Card>
        <CardHeader className="flex-col items-start">
          <h5 className="text-base font-semibold">{song.songName}</h5>
          <p className="text-sm text-gray-600">{song.artist}</p>
        </CardHeader>
        <CardBody>
          <div className="relative">
            {!imageLoaded && (
              <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
              </div>
            )}
            {imageError ? (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div>Image not available</div>
                </div>
              </div>
            ) : (
              <Image 
                alt={song.songName} 
                src={song.image} 
                width={275}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={imageLoaded ? 'block' : 'hidden'}
              />
            )}
          </div>
          <DifficultyListDisplay difficultyList={song.difficultyList} />
        </CardBody>
        <CardFooter>
          <div className="flex flex-col gap-2 mt-2 mx-auto w-full">
            {song.songLink ? (
              <Button
                onPress={() => window.open(song.songLink, "_blank", "noopener,noreferrer")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded text-center w-full"
              >
                View Song
              </Button>
            ) : (
              <Button
                disabled
                className="bg-gray-400 text-white text-sm py-1 rounded cursor-not-allowed w-full"
              >
                No Link Available
              </Button>
            )}

            {/* Ultima on its own line - only show if link exists */}
            {song.ultimaChartLink && (
              <Button
                onPress={() => window.open(song.ultimaChartLink, "_blank", "noopener,noreferrer")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded w-full text-center"
              >
                Ultima
              </Button>
            )}

            {/* Master + Expert side by side */}
            <div className="flex gap-1 w-full">
              {song.masterChartLink ? (
                <Button
                  onPress={() => window.open(song.masterChartLink, "_blank", "noopener,noreferrer")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-2 py-1 rounded flex-1 text-center"
                >
                  Master
                </Button>
              ) : (
                <button
                  disabled
                  className="border border-cyan-600 text-cyan-600 text-xs px-2 py-1 rounded flex-1 cursor-not-allowed"
                >
                  No Master
                </button>
              )}

              {song.expertChartLink ? (
                <Button
                  onPress={() => window.open(song.expertChartLink, "_blank", "noopener,noreferrer")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded flex-1 text-center"
                >
                  Expert
                </Button>
              ) : (
                <button
                  disabled
                  className="border border-red-600 text-red-600 text-xs px-2 py-1 rounded flex-1 cursor-not-allowed"
                >
                  No Expert
                </button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default GameCard;

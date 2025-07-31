import { Difficulty, RhythmGameSong } from "../helper/types";
import DifficultyListDisplay from "./DifficultyListDisplay";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Chip,
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
    <Card className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h5 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {song.songName}
          </h5>
          <p className="text-sm text-gray-600 font-medium">
            {song.artist}
          </p>
          <div className="flex gap-2">
            <Chip 
              color="primary" 
              variant="flat" 
              size="sm"
              className="text-xs"
            >
              {song.category}
            </Chip>
            <Chip 
              color="secondary" 
              variant="flat" 
              size="sm"
              className="text-xs"
            >
              {song.version}
            </Chip>
            {song.omnimix && (
              <Chip 
                color="success" 
                variant="flat" 
                size="sm"
                className="text-xs"
              >
                Omnimix
              </Chip>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardBody className="py-3">
        <div className="relative mb-4">
          {!imageLoaded && (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-sm">Loading...</div>
            </div>
          )}
          {imageError ? (
            <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-gray-400 text-sm">No Image</div>
              </div>
            </div>
          ) : (
            <Image 
              alt={song.songName} 
              src={song.image} 
              className={`w-full h-48 object-cover rounded-lg ${imageLoaded ? 'block' : 'hidden'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
        
        <div className="mb-4">
          <DifficultyListDisplay difficultyList={song.difficultyList} />
        </div>
      </CardBody>
      
      <CardFooter className="pt-0">
        <div className="flex flex-col gap-2 w-full">
          {song.songLink ? (
            <Button
              onPress={() => window.open(song.songLink, "_blank", "noopener,noreferrer")}
              color="primary"
              variant="flat"
              size="sm"
              className="w-full font-semibold"
              startContent={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              }
            >
              View Song
            </Button>
          ) : (
            <Button
              disabled
              variant="flat"
              size="sm"
              className="w-full"
            >
              No Link Available
            </Button>
          )}

          {/* Chart Links */}
          <div className="space-y-2">
            {song.ultimaChartLink && (
              <Button
                onPress={() => window.open(song.ultimaChartLink, "_blank", "noopener,noreferrer")}
                color="warning"
                variant="flat"
                size="sm"
                className="w-full font-semibold"
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Ultima Chart
              </Button>
            )}

            <div className="flex gap-2">
              {song.masterChartLink ? (
                <Button
                  onPress={() => window.open(song.masterChartLink, "_blank", "noopener,noreferrer")}
                  color="secondary"
                  variant="flat"
                  size="sm"
                  className="flex-1 font-semibold"
                >
                  Master
                </Button>
              ) : (
                <Button
                  disabled
                  variant="flat"
                  size="sm"
                  className="flex-1"
                >
                  No Master
                </Button>
              )}

              {song.expertChartLink ? (
                <Button
                  onPress={() => window.open(song.expertChartLink, "_blank", "noopener,noreferrer")}
                  color="danger"
                  variant="flat"
                  size="sm"
                  className="flex-1 font-semibold"
                >
                  Expert
                </Button>
              ) : (
                <Button
                  disabled
                  variant="flat"
                  size="sm"
                  className="flex-1"
                >
                  No Expert
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default GameCard;

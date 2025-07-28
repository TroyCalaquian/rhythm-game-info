import { Difficulty } from "../helper/types";
import DifficultyListDisplay from "./DifficultyListDisplay";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@heroui/react";

interface Props {
  songName: string;
  artist: string;
  image: string;
  difficultyList: Difficulty[];
  songLink: string;
  ultimaChartLink: string;
  masterChartLink: string;
  expertChartLink: string;
}

function GameCard({
  songName,
  artist,
  image,
  difficultyList,
  songLink,
  ultimaChartLink,
  masterChartLink,
  expertChartLink,
}: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-56">
      <Card>
        <CardHeader className="flex-col items-start">
          <h5 className="text-base font-semibold">{songName}</h5>
          <p className="text-sm text-gray-600">{artist}</p>
        </CardHeader>
        <CardBody>
          <Image alt={songName} src={image} width={275} />
          <DifficultyListDisplay difficultyList={difficultyList} />
        </CardBody>
        <CardFooter>
          <div className="flex flex-col gap-2 mt-2 mx-auto w-full">
            {songLink ? (
              <Button
                onPress={() => window.open(songLink, "_blank", "noopener,noreferrer")}
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

            {/* Ultima on its own line */}
            {ultimaChartLink && (
              <Button
                onPress={() => window.open(ultimaChartLink, "_blank", "noopener,noreferrer")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded w-full text-center"
              >
                Ultima
              </Button>
            )}

            {/* Master + Expert side by side */}
            <div className="flex gap-1 w-full">
              {masterChartLink ? (
                <Button
                  onPress={() => window.open(masterChartLink, "_blank", "noopener,noreferrer")}
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

              {expertChartLink ? (
                <Button
                  onPress={() => window.open(expertChartLink, "_blank", "noopener,noreferrer")}
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

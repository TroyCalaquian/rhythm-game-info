import { Difficulty } from "../types";
import DifficultyListDisplay from "./DifficultyListDisplay";

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
      <img
        src={image}
        alt={songName}
        className="w-full h-[150px] object-contain"
      />
      <div className="p-2">
        <h5 className="text-base font-semibold">{songName}</h5>
        <p className="text-sm text-gray-600">{artist}</p>
        <h6 className="text-xs font-medium mt-1 text-gray-700">Difficulties</h6>
        <DifficultyListDisplay difficultyList={difficultyList} />

        <div className="flex flex-col gap-1 mt-2">
          {songLink ? (
            <a
              href={songLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded text-center"
            >
              View Song
            </a>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-white text-sm py-1 rounded cursor-not-allowed"
            >
              No Link Available
            </button>
          )}

          <div className="flex gap-1">
            {ultimaChartLink && (
              <a
                href={ultimaChartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded flex-1 text-center"
              >
                Ultima
              </a>
            )}
            {masterChartLink ? (
              <a
                href={masterChartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-2 py-1 rounded flex-1 text-center"
              >
                Master
              </a>
            ) : (
              <button
                disabled
                className="border border-cyan-600 text-cyan-600 text-xs px-2 py-1 rounded flex-1 cursor-not-allowed"
              >
                No Master
              </button>
            )}
            {expertChartLink ? (
              <a
                href={expertChartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded flex-1 text-center"
              >
                Expert
              </a>
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
      </div>
    </div>
  );
}

export default GameCard;

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
    <div className="card" style={{ width: "14rem", height: "auto" }}>
      <img
        src={image}
        className="card-img-top"
        alt={songName}
        style={{
          height: "150px",
          width: "100%", // Ensure the image takes full width of the card
          objectFit: "contain", // This ensures the whole image fits within the container without cutting off
        }}
      />
      <div className="card-body" style={{ padding: "0.5rem" }}>
        <h5 className="card-title" style={{ fontSize: "1rem" }}>
          {songName}
        </h5>
        <p className="card-text" style={{ fontSize: "0.9rem" }}>
          {artist}
        </p>
        <h6 className="card-text" style={{ fontSize: "0.8rem" }}>
          Difficulties
        </h6>
        <DifficultyListDisplay difficultyList={difficultyList} />
        <div className="d-flex flex-column gap-1">
          <a
            href={songLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-100 btn-sm"
          >
            View Song
          </a>
          <div className="d-flex gap-1">
            {ultimaChartLink && (
              <a
                href={ultimaChartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-warning flex-fill btn-sm"
              >
                Ultima
              </a>
            )}
            <a
              href={masterChartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info flex-fill btn-sm"
            >
              Master
            </a>
            <a
              href={expertChartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger flex-fill btn-sm"
            >
              Expert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;

import { Difficulty } from "../types";
import DifficultyListDisplay from "./DifficultyListDisplay";

interface Props {
  songName: string;
  artist: string;
  difficultyList: Difficulty[];
  songLink: string;
  ultimaChartLink: string;
  masterChartLink: string;
  expertChartLink: string;
}
function GameCard({
  songName,
  artist,
  difficultyList,
  songLink,
  ultimaChartLink,
  masterChartLink,
  expertChartLink,
}: Props) {
  return (
    <div className="card" style={{ width: "22rem" }}>
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <h2 className="card-title">{songName}</h2>
        <h5 className="card-text">{artist}</h5>
        <h6 className="card-text">Difficulties</h6>
        <DifficultyListDisplay difficultyList={difficultyList} />
        <div className="d-flex flex-column gap-2">
          <a
            href={songLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-100"
          >
            View Song
          </a>
          <div className="d-flex gap-2">
            {ultimaChartLink && (
              <a
                href={ultimaChartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-warning flex-fill"
              >
                Ultima
              </a>
            )}
            <a
              href={masterChartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info flex-fill"
            >
              Master
            </a>
            <a
              href={expertChartLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger flex-fill"
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

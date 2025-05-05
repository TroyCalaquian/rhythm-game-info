import DifficultyListDisplay from "./DifficultyListDisplay";

interface Props {
  songName: string;
  artist: string;
  difficultyList: string[];
  songLink: string;
  chartLink: string;
}
function GameCard({
  songName,
  artist,
  difficultyList,
  songLink,
  chartLink,
}: Props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      {/* <img src="..." className="card-img-top" alt="..." /> */}
      <div className="card-body">
        <h2 className="card-title">{songName}</h2>
        <h5 className="card-text">{artist}</h5>
        <h6 className="card-text">Difficulties</h6>
        <DifficultyListDisplay difficultyList={difficultyList}/>
        <div className="d-flex gap-2">
          {/* Possible component? */}
          <a
            href={songLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View Song
          </a>
          <a
            href={chartLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info"
          >
            View Master Chart
          </a>
        </div>
      </div>
    </div>
  );
}

export default GameCard;

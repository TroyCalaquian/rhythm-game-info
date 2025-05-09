import { Difficulty } from "../types";

interface Props {
  difficultyList: Difficulty[];
}

function DifficultyListDisplay({ difficultyList }: Props) {
  return (
    <>
      {difficultyList.map((difficulty) => {
        let colorStyle = {};
        if (difficulty.levelName === "Basic") {
          colorStyle = { color: "green" };
        } else if (difficulty.levelName === "Advanced") {
          colorStyle = { color: "orange" };
        } else if (difficulty.levelName === "Expert") {
          colorStyle = { color: "red" };
        } else if (difficulty.levelName === "Master") {
          colorStyle = { color: "purple" };
        } else if (difficulty.levelName === "Ultima") {
          colorStyle = { color: "black" };
        }

        return (
          <p
            key={difficulty.levelName}
            className="card-text"
            style={colorStyle}
          >
            {difficulty.levelName}: {difficulty.faceValue} (
            {difficulty.value.toFixed(1)})
          </p>
        );
      })}
    </>
  );
}

export default DifficultyListDisplay;

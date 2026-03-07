import { Difficulty } from "../helper/types";
import { Chip } from "@heroui/react";

interface Props {
  difficultyList: Difficulty[];
  selectedDifficulty?: string;
}

function DifficultyListDisplay({ difficultyList, selectedDifficulty }: Props) {
  const getDifficultyColor = (levelName: string) => {
    const colors = {
      Basic: "success",
      Advanced: "warning", 
      Expert: "danger",
      Master: "secondary",
      Ultima: "default"
    };
    return colors[levelName as keyof typeof colors] || "default";
  };

  return (
    <div className="space-y-2">
      <h6 className="text-sm font-semibold text-gray-700 mb-2">Difficulties</h6>
      <div className="flex flex-wrap gap-1">
        {difficultyList.map((difficulty) => {
          const isSelected = selectedDifficulty === difficulty.faceValue;
          return (
            <Chip
              key={difficulty.levelName}
              color={getDifficultyColor(difficulty.levelName) as any}
              variant={isSelected ? "solid" : "flat"}
              size="sm"
              className={`text-xs font-medium ${
                isSelected 
                  ? "ring-2 ring-blue-500 ring-offset-1 shadow-lg" 
                  : ""
              }`}
            >
              {difficulty.levelName}: {difficulty.faceValue}
              <span className="text-gray-500 ml-1">
                ({difficulty.value.toFixed(1)})
              </span>
              {isSelected && (
                <span className="ml-1 text-blue-600">★</span>
              )}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}

export default DifficultyListDisplay;

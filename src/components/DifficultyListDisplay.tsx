interface Props {
    difficultyList: string[];
}

function DifficultyListDisplay({difficultyList} : Props ) {
    return (
        <>
          {difficultyList.map((difficulty) => {
            let colorStyle = {};
            if (difficulty.startsWith("Basic")) {
              colorStyle = { color: "green" };
            } else if (difficulty.startsWith("Advanced")) {
              colorStyle = { color: "orange" };
            } else if (difficulty.startsWith("Expert")) {
              colorStyle = { color: "red" };
            } else if (difficulty.startsWith("Master")) {
              colorStyle = { color: "purple" };
            } else if (difficulty.startsWith("Ultima")) {
              colorStyle = { color: "black" };
            }
    
            return (
              <p key={difficulty} className="card-text" style={colorStyle}>
                {difficulty}
              </p>
            );
          })}
        </>
    );
}

export default DifficultyListDisplay;
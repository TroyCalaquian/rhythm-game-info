import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";
import { rhythmGameSongs } from "./data";
import { useState } from "react";

function App() {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterVersion, setVersionCategory] = useState("");
  const [filterOmnimix, setfilterOmnimix] = useState(false);

  const filteredSongs = rhythmGameSongs.filter((item) =>
    item.songName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <div className="container d-flex justify-content-center pt-3">
        <SearchBar
          filterText={filterText}
          onFilterTextChange={setFilterText}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          filterVersion={filterVersion}
          onVersionChange={setVersionCategory}
          filterOmnimix={filterOmnimix}
          onOmnimixChange={setfilterOmnimix}
        />
      </div>
      <div className="container mt-4">
        <div className="row">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((item, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <GameCard
                  songName={item.songName}
                  artist={item.artist}
                  difficultyList={item.difficultyList}
                  songLink={item.songLink}
                  chartLink={item.chartLink}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No results found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

import GameCard from "./components/GameCard";
import RandomizerModal from "./components/RandomizerModal";
import SearchBar from "./components/SearchBar";
import Modal from "react-modal";
import { rhythmGameSong } from "./types";
import { useEffect, useState } from "react";
import supabase from "./components/supabaseClient";

Modal.setAppElement("#root");

function App() {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterVersion, setVersionCategory] = useState("");
  const [filterOmnimix, setfilterOmnimix] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1");
  const [rhythmGameSongData, setRhythmGameSongData] = useState<
    rhythmGameSong[]
  >([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data, error } = await supabase
      .from("rhythmGameSongData")
      .select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setRhythmGameSongData(data);
    }
  }

  const filteredSongs = rhythmGameSongData.filter(
    (item) =>
      item.songName.toLowerCase().includes(filterText.toLowerCase()) &&
      (!filterCategory || item.category === filterCategory) &&
      (!filterVersion || item.version === filterVersion) &&
      (filterOmnimix || !item.omnimix)
  );

  console.log("Songs:", rhythmGameSongData);

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
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <div className="container mt-4">
        <div className="row">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((item) => (
              <div key={item.id} className="col-6 col-md-3 mb-4">
                <GameCard
                  songName={item.songName}
                  artist={item.artist}
                  image={item.image}
                  difficultyList={item.difficultyList}
                  songLink={item.songLink}
                  ultimaChartLink={item.ultimaChartLink}
                  masterChartLink={item.masterChartLink}
                  expertChartLink={item.expertChartLink}
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
      <div>
        <RandomizerModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          rhythmGameSongs={rhythmGameSongData}
        />
      </div>
    </>
  );
}

export default App;

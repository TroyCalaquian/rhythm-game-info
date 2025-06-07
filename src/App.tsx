import GameCard from "./components/GameCard";
import RandomizerModal from "./components/RandomizerModal";
import SearchBar from "./components/SearchBar";
import { rhythmGameSong } from "./types";
import { useEffect, useState } from "react";
import supabase from "./components/supabaseClient";
import { Pagination, useDisclosure } from "@heroui/react";

function App() {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterVersion, setVersionCategory] = useState("");
  const [filterOmnimix, setfilterOmnimix] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedClass, setSelectedClass] = useState("1");
  const [rhythmGameSongData, setRhythmGameSongData] = useState<rhythmGameSong[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 12;

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [filterText, filterCategory, filterVersion]);

  async function getData() {
    const { data, error } = await supabase
      .from("rhythmGameSongData")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setRhythmGameSongData(data);
    }
  }

  const filteredSongs = rhythmGameSongData.filter((item) => {
    const searchText = filterText.toLowerCase();
    const matchesSearch =
      item.songName.toLowerCase().includes(searchText) ||
      item.artist.toLowerCase().includes(searchText);

    return (
      matchesSearch &&
      (!filterCategory || item.category === filterCategory) &&
      (!filterVersion || item.version === filterVersion) &&
      (filterOmnimix || !item.omnimix)
    );
  });

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-3 flex justify-center">
        <SearchBar
          filterText={filterText}
          onFilterTextChange={setFilterText}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
          filterVersion={filterVersion}
          onVersionChange={setVersionCategory}
          filterOmnimix={filterOmnimix}
          onOmnimixChange={setfilterOmnimix}
          setIsModalOpen={onOpen}
        />
      </div>

      <div className="flex justify-center mt-3">
        <nav>
          <Pagination
            showControls
            total={totalPages}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
            siblings={1}
            boundaries={1}
          />
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {currentSongs.length > 0 ? (
            currentSongs.map((item) => (
              <div key={item.id}>
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
            <div className="col-span-full text-center">
              <p>No results found.</p>
            </div>
          )}
        </div>
      </div>

      <RandomizerModal
        isModalOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        rhythmGameSongs={rhythmGameSongData}
      />
    </>
  );
}

export default App;

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

  const filteredSongs = rhythmGameSongData.filter(
    (item) =>
      item.songName.toLowerCase().includes(filterText.toLowerCase()) &&
      (!filterCategory || item.category === filterCategory) &&
      (!filterVersion || item.version === filterVersion) &&
      (filterOmnimix || !item.omnimix)
  );

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

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
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              >
                &laquo; Prev
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isFirst = page === 1;
              const isLast = page === totalPages;
              const isNearCurrent = Math.abs(page - currentPage) <= 1;

              if (isFirst || isLast || isNearCurrent) {
                return (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                );
              }

              // Render ellipsis if not already rendered
              const shouldShowStartEllipsis =
                page === currentPage - 2 && page > 1;
              const shouldShowEndEllipsis =
                page === currentPage + 2 && page < totalPages;

              if (shouldShowStartEllipsis || shouldShowEndEllipsis) {
                return (
                  <li key={`ellipsis-${page}`} className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                );
              }

              return null;
            })}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
              >
                Next &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container mt-4">
        <div className="row">
          {currentSongs.length > 0 ? (
            currentSongs.map((item) => (
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

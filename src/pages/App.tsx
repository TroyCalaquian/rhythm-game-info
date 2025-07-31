import GameCard from "../components/GameCard";
import RandomizerModal from "../components/RandomizerModal";
import SearchBar from "../components/SearchBar";
import { RhythmGameSong } from "../helper/types";
import { useEffect, useRef, useState, useMemo } from "react";
import supabase from "../helper/supabaseClient";
import {
  Pagination,
  useDisclosure,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Filters {
  text: string;
  category: string;
  version: string;
  omnimix: boolean;
}

function App() {
  const [filters, setFilters] = useState<Filters>({
    text: "",
    category: "",
    version: "",
    omnimix: false
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState("1");
  const [rhythmGameSongData, setRhythmGameSongData] = useState<
    RhythmGameSong[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 12;

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.text, filters.category, filters.version]);

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

  const filteredSongs = useMemo(() => {
    return rhythmGameSongData.filter((item) => {
      const searchText = filters.text.toLowerCase();
      const matchesSearch =
        item.songName.toLowerCase().includes(searchText) ||
        item.artist.toLowerCase().includes(searchText);

      return (
        matchesSearch &&
        (!filters.category || item.category === filters.category) &&
        (!filters.version || item.version === filters.version) &&
        (filters.omnimix || !item.omnimix)
      );
    });
  }, [rhythmGameSongData, filters]);

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  const updateFilter = (key: keyof Filters, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p>Chunithm</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Link to="/register">Register</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/login">Login</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="max-w-7xl mx-auto px-4 pt-3 flex justify-center">
        <SearchBar
          filterText={filters.text}
          onFilterTextChange={(value) => updateFilter('text', value)}
          filterCategory={filters.category}
          onCategoryChange={(value) => updateFilter('category', value)}
          filterVersion={filters.version}
          onVersionChange={(value) => updateFilter('version', value)}
          filterOmnimix={filters.omnimix}
          onOmnimixChange={(value) => updateFilter('omnimix', value)}
          setIsModalOpen={onOpen}
        />
      </div>

      <div className="flex justify-center mt-3">
        <nav>
          <Pagination
            showControls
            total={totalPages}
            initialPage={currentPage}
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
                <GameCard song={item} />
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

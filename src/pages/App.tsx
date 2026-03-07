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
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    text: "",
    category: "",
    version: "",
    omnimix: false
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState("1");
  const [rhythmGameSongData, setRhythmGameSongData] = useState<
    RhythmGameSong[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 12;

  useEffect(() => {
    getData();
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.text, filters.category, filters.version]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <NavbarBrand>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chunithm Database
            </p>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          {isAuthenticated ? (
            <>
              <NavbarItem>
                <Button 
                  color="primary" 
                  variant="flat" 
                  onPress={() => navigate("/Dashboard")}
                  className="font-semibold"
                >
                  Admin Dashboard
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button 
                  color="danger" 
                  variant="flat" 
                  onPress={handleLogout}
                >
                  Logout
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <Button 
                as={Link} 
                to="/login" 
                color="primary" 
                variant="flat"
                className="font-semibold"
              >
                Admin Login
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Rhythm Game Song Database
          </h1>
          <p className="text-gray-600 text-center">
            Browse and discover songs from the Chunithm rhythm game
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
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

        {filteredSongs.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <Pagination
                showControls
                total={totalPages}
                initialPage={currentPage}
                onChange={(page) => setCurrentPage(page)}
                siblings={1}
                boundaries={1}
                classNames={{
                  wrapper: "gap-2",
                  item: "w-8 h-8 text-sm",
                  cursor: "bg-blue-500 text-white font-semibold",
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentSongs.length > 0 ? (
            currentSongs.map((item) => (
              <div key={item.id} className="transform transition-all duration-200 hover:scale-105">
                <GameCard song={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No songs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            </div>
          )}
        </div>

        {filteredSongs.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstSong + 1}-{Math.min(indexOfLastSong, filteredSongs.length)} of {filteredSongs.length} songs
            </p>
          </div>
        )}
      </div>

      <RandomizerModal
        isModalOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        rhythmGameSongs={rhythmGameSongData}
      />
    </div>
  );
}

export default App;

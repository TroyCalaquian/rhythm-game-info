import supabase from "../helper/supabaseClient";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Pagination,
} from "@heroui/react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RhythmGameSong } from "../helper/types";

function Dashboard() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [rhythmGameSongData, setRhythmGameSongData] = useState<
    RhythmGameSong[]
  >([]);
  const [columns, setColumns] = useState<{ key: string; label: string }[]>([]);
  const [selectedSong, setSelectedSong] = useState<RhythmGameSong | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (rhythmGameSongData.length > 0) {
      const keys = Object.keys(rhythmGameSongData[0]);
      const formatted = keys.map((key) => ({
        key,
        label: key.toUpperCase(), // or format as needed
      }));
      setColumns(formatted);
    }
  }, [rhythmGameSongData]);

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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/");
  };

  const handleViewSong = (song: RhythmGameSong) => {
    setSelectedSong(song);
    onOpen();
  };

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

  // Filter songs based on search query
  const filteredSongs = useMemo(() => {
    if (!searchQuery) return rhythmGameSongData;
    
    const query = searchQuery.toLowerCase();
    return rhythmGameSongData.filter(song => 
      song.songName.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.category.toLowerCase().includes(query) ||
      song.version.toLowerCase().includes(query)
    );
  }, [rhythmGameSongData, searchQuery]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSongs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentSongs = filteredSongs.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your rhythm game song database</p>
          </div>
          <div className="flex gap-3">
            <Button 
              color="primary" 
              onPress={() => navigate("/CreateSong")}
              className="font-semibold"
            >
              Add New Song
            </Button>
            <Button 
              color="danger" 
              variant="flat" 
              onPress={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-sm">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Songs</p>
                  <p className="text-2xl font-bold text-gray-900">{rhythmGameSongData.length}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(rhythmGameSongData.map(song => song.category)).size}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Versions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(rhythmGameSongData.map(song => song.version)).size}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm">
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Omnimix Songs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {rhythmGameSongData.filter(song => song.omnimix).length}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Search and Controls */}
        <Card className="border-none shadow-sm mb-6">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search songs by name, artist, category, or version..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredSongs.length)} of {filteredSongs.length} songs
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Rows per page:</span>
                  <select 
                    value={rowsPerPage} 
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Songs Table */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Song Database</h2>
              <Chip color="primary" variant="flat">
                {filteredSongs.length} songs
              </Chip>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <Table 
              aria-label="Songs table"
              classNames={{
                wrapper: "min-h-[400px]",
                table: "min-w-full",
              }}
            >
              <TableHeader>
                <TableColumn className="w-16">ID</TableColumn>
                <TableColumn>SONG</TableColumn>
                <TableColumn>ARTIST</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>VERSION</TableColumn>
                <TableColumn>OMNIMIX</TableColumn>
                <TableColumn>DIFFICULTIES</TableColumn>
                <TableColumn className="w-20">ACTIONS</TableColumn>
              </TableHeader>
              <TableBody items={currentSongs}>
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <span className="text-sm text-gray-500">#{item.id}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.songName}
                              className="w-8 h-8 rounded object-cover"
                            />
                          ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.songName}</p>
                          <p className="text-xs text-gray-500">ID: {item.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-gray-900">{item.artist}</p>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        color="primary" 
                        variant="flat" 
                        size="sm"
                      >
                        {item.category}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        color="secondary" 
                        variant="flat" 
                        size="sm"
                      >
                        {item.version}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        color={item.omnimix ? "success" : "default"}
                        variant="flat" 
                        size="sm"
                      >
                        {item.omnimix ? "Yes" : "No"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-48">
                        {item.difficultyList.map((difficulty) => (
                          <Chip
                            key={difficulty.levelName}
                            color={getDifficultyColor(difficulty.levelName) as any}
                            variant="flat"
                            size="sm"
                          >
                            {difficulty.levelName}: {difficulty.faceValue}
                          </Chip>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button 
                            isIconOnly 
                            size="sm" 
                            variant="light"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Actions">
                          <DropdownItem 
                            key="view" 
                            onPress={() => handleViewSong(item)}
                          >
                            View Details
                          </DropdownItem>
                          <DropdownItem 
                            key="edit" 
                            onPress={() => navigate(`/UpdateSong/${item.id}`)}
                          >
                            Edit Song
                          </DropdownItem>
                          <DropdownItem 
                            key="delete" 
                            className="text-danger" 
                            color="danger"
                            onPress={() => navigate(`/DeleteSong/${item.id}`)}
                          >
                            Delete Song
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
              siblings={1}
              boundaries={1}
            />
          </div>
        )}
      </div>

      {/* Song Details Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Song Details
              </ModalHeader>
              <ModalBody>
                {selectedSong && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      {selectedSong.image && (
                        <img 
                          src={selectedSong.image} 
                          alt={selectedSong.songName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold">{selectedSong.songName}</h3>
                        <p className="text-gray-600">{selectedSong.artist}</p>
                      </div>
                    </div>
                    
                    <Divider />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Category</p>
                        <Chip color="primary" variant="flat" size="sm">
                          {selectedSong.category}
                        </Chip>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Version</p>
                        <Chip color="secondary" variant="flat" size="sm">
                          {selectedSong.version}
                        </Chip>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Omnimix</p>
                        <Chip 
                          color={selectedSong.omnimix ? "success" : "default"} 
                          variant="flat" 
                          size="sm"
                        >
                          {selectedSong.omnimix ? "Yes" : "No"}
                        </Chip>
                      </div>
                    </div>

                    <Divider />

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-3">Difficulties</p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedSong.difficultyList.map((difficulty) => (
                          <div key={difficulty.levelName} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium">{difficulty.levelName}</span>
                            <div className="flex items-center gap-2">
                              <Chip 
                                color={getDifficultyColor(difficulty.levelName) as any}
                                variant="flat" 
                                size="sm"
                              >
                                {difficulty.faceValue}
                              </Chip>
                              <span className="text-sm text-gray-500">
                                ({difficulty.value.toFixed(1)})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {(selectedSong.songLink || selectedSong.ultimaChartLink || selectedSong.masterChartLink || selectedSong.expertChartLink) && (
                      <>
                        <Divider />
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-3">Links</p>
                          <div className="space-y-2">
                            {selectedSong.songLink && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Song:</span>
                                <a 
                                  href={selectedSong.songLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline text-sm"
                                >
                                  View Song
                                </a>
                              </div>
                            )}
                            {selectedSong.ultimaChartLink && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Ultima:</span>
                                <a 
                                  href={selectedSong.ultimaChartLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-yellow-600 hover:underline text-sm"
                                >
                                  View Chart
                                </a>
                              </div>
                            )}
                            {selectedSong.masterChartLink && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Master:</span>
                                <a 
                                  href={selectedSong.masterChartLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-cyan-600 hover:underline text-sm"
                                >
                                  View Chart
                                </a>
                              </div>
                            )}
                            {selectedSong.expertChartLink && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Expert:</span>
                                <a 
                                  href={selectedSong.expertChartLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-red-600 hover:underline text-sm"
                                >
                                  View Chart
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  onClose();
                  if (selectedSong) {
                    navigate(`/UpdateSong/${selectedSong.id}`);
                  }
                }}>
                  Edit Song
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Dashboard;

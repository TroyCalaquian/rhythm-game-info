import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../helper/supabaseClient";
import { 
  Button, 
  Input, 
  Checkbox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import categories from "../helper/categories";
import versions from "../helper/versions";

type DifficultyFormValue = {
  value: string;
  faceValue: string;
};

type LevelName = "Basic" | "Advanced" | "Expert" | "Master" | "Ultima";

type DifficultyMap = {
  [key in LevelName]: DifficultyFormValue;
};

const levelNames: LevelName[] = [
  "Basic",
  "Advanced",
  "Expert",
  "Master",
  "Ultima",
];

function DeleteSong() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [songLink, setSongLink] = useState("");
  const [ultimaLink, setUltimaLink] = useState("");
  const [masterLink, setMasterLink] = useState("");
  const [expertLink, setExpertLink] = useState("");
  const [category, setCategory] = useState("");
  const [version, setVersion] = useState("");
  const [omnimix, setOmnimix] = useState(false);

  const [difficulties, setDifficulties] = useState<DifficultyMap>({
    Basic: { value: "", faceValue: "" },
    Advanced: { value: "", faceValue: "" },
    Expert: { value: "", faceValue: "" },
    Master: { value: "", faceValue: "" },
    Ultima: { value: "", faceValue: "" },
  });

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

  useEffect(() => {
    if (!id) {
      setError("Missing song ID");
      navigate("/dashboard");
      return;
    }
    getData();
  }, [id]);

  async function getData() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("rhythmGameSongData")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load song data");
        return;
      }

      if (!data) {
        setError("Song not found");
        return;
      }

      setSongName(data.songName);
      setArtist(data.artist);
      setSongLink(data.songLink || "");
      setUltimaLink(data.ultimaChartLink || "");
      setMasterLink(data.masterChartLink || "");
      setExpertLink(data.expertChartLink || "");
      setCategory(data.category);
      setVersion(data.version);
      setOmnimix(data.omnimix);

      const parsedDifficulties: DifficultyMap = { ...difficulties };
      data.difficultyList.forEach((diff: any) => {
        const level = diff.levelName as LevelName;
        if (parsedDifficulties[level]) {
          parsedDifficulties[level] = {
            value: diff.value.toString(),
            faceValue: diff.faceValue,
          };
        }
      });
      setDifficulties(parsedDifficulties);
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("rhythmGameSongData")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete error:", error);
        setError("Failed to delete song. Please try again.");
      } else {
        onOpen(); // Show success modal
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-gray-600">Loading song data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardBody className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button color="primary" onPress={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delete Song</h1>
            <p className="text-gray-600 mt-2">Confirm deletion of this song from the database</p>
          </div>
          <div className="flex gap-3">
            <Button 
              color="danger" 
              variant="flat" 
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{songName}</h2>
                <p className="text-gray-600">{artist}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-6">
              {/* Song Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  isReadOnly
                  label="Song name"
                  value={songName}
                  variant="bordered"
                />
                <Input
                  isReadOnly
                  label="Artist"
                  value={artist}
                  variant="bordered"
                />
              </div>

              {/* Category and Version */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <Chip color="primary" variant="flat" className="mt-1">
                    {category}
                  </Chip>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Version</label>
                  <Chip color="secondary" variant="flat" className="mt-1">
                    {version}
                  </Chip>
                </div>
              </div>

              {/* Difficulty Display */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Settings</h3>
                <div className="space-y-4">
                  {levelNames.map((levelName) => (
                    <Card key={levelName} className="border border-gray-200">
                      <CardBody className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Chip 
                            color={getDifficultyColor(levelName) as any}
                            variant="flat"
                            size="sm"
                          >
                            {levelName}
                          </Chip>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            isReadOnly
                            label={`${levelName} Value`}
                            value={difficulties[levelName].value}
                            variant="bordered"
                          />
                          <Input
                            isReadOnly
                            label={`${levelName} Face Value`}
                            value={difficulties[levelName].faceValue}
                            variant="bordered"
                          />
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">External Links</h3>
                <div className="space-y-4">
                  <Input
                    isReadOnly
                    label="Song link"
                    value={songLink}
                    variant="bordered"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      isReadOnly
                      label="Ultima link"
                      value={ultimaLink}
                      variant="bordered"
                    />
                    <Input
                      isReadOnly
                      label="Master link"
                      value={masterLink}
                      variant="bordered"
                    />
                    <Input
                      isReadOnly
                      label="Expert link"
                      value={expertLink}
                      variant="bordered"
                    />
                  </div>
                </div>
              </div>

              <Divider />

              {/* Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
                <Checkbox isSelected={omnimix} isReadOnly>
                  Include in Omnimix
                </Checkbox>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
          </CardBody>

          <CardFooter className="flex justify-between">
            <Button 
              color="danger" 
              variant="flat" 
              onPress={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              color="danger"
              onPress={handleDelete}
              isLoading={deleting}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Song"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Song Deleted Successfully!
              </ModalHeader>
              <ModalBody>
                <p>The song "{songName}" has been permanently deleted from the database.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => {
                  onClose();
                  navigate("/dashboard");
                }}>
                  Back to Dashboard
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DeleteSong;

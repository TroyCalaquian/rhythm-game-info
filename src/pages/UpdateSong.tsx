import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../helper/supabaseClient";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
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

function UpdateSong() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  // Difficulty values
  const [difficulties, setDifficulties] = useState<DifficultyMap>({
    Basic: { value: "", faceValue: "" },
    Advanced: { value: "", faceValue: "" },
    Expert: { value: "", faceValue: "" },
    Master: { value: "", faceValue: "" },
    Ultima: { value: "", faceValue: "" }, // optional
  });

  // Handle field change for difficulty
  const handleDifficultyChange = (
    levelName: LevelName,
    field: "value" | "faceValue",
    value: string
  ) => {
    setDifficulties((prev) => ({
      ...prev,
      [levelName]: {
        ...prev[levelName],
        [field]: value,
      },
    }));
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

      const parsedDifficulties: DifficultyMap = {
        Basic: { value: "", faceValue: "" },
        Advanced: { value: "", faceValue: "" },
        Expert: { value: "", faceValue: "" },
        Master: { value: "", faceValue: "" },
        Ultima: { value: "", faceValue: "" },
      };

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

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);

    try {
      // Validate required levels
      for (const level of levelNames) {
        if (level === "Ultima") continue;
        const { value, faceValue } = difficulties[level];
        if (!value || !faceValue) {
          setError(`Missing value for ${level}`);
          setSaving(false);
          return;
        }
      }

      const difficultyList = levelNames
        .map((levelName) => {
          const { value, faceValue } = difficulties[levelName];
          if (!value || !faceValue) return null;
          return {
            levelName,
            value: parseFloat(value),
            faceValue,
          };
        })
        .filter(Boolean); // remove nulls

      const { error } = await supabase
        .from("rhythmGameSongData")
        .update([
          {
            songName: songName,
            artist: artist,
            difficultyList,
            songLink,
            ultimaChartLink: ultimaLink,
            masterChartLink: masterLink,
            expertChartLink: expertLink,
            category: category,
            version: version,
            omnimix: omnimix,
          },
        ])
        .eq("id", id);

      if (error) {
        console.error("Update error:", error);
        setError("Failed to update song. Please try again.");
      } else {
        onOpen(); // Show success modal
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setSaving(false);
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Song</h1>
            <p className="text-gray-600 mt-2">Update song information in the database</p>
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
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{songName}</h2>
                <p className="text-gray-600">{artist}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardBody>
            <Form onSubmit={handleSubmit} className="space-y-6">
              {/* Song Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  isRequired
                  label="Song name"
                  name="songName"
                  type="text"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  placeholder="Enter song name"
                />
                <Input
                  isRequired
                  label="Artist"
                  name="artist"
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Enter artist name"
                />
              </div>

              {/* Category and Version */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Category"
                  isRequired
                  placeholder="Select a category"
                  selectedKeys={[category]}
                >
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} onClick={() => setCategory(cat.value)}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  label="Version"
                  isRequired
                  placeholder="Select a version"
                  selectedKeys={[version]}
                >
                  {versions.map((ver) => (
                    <SelectItem key={ver.value} onClick={() => setVersion(ver.value)}>
                      {ver.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Difficulty Inputs */}
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
                          {levelName !== "Ultima" && (
                            <Chip color="danger" variant="flat" size="sm">
                              Required
                            </Chip>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label={`${levelName} Value`}
                            type="number"
                            placeholder="e.g. 9.5"
                            step="0.1"
                            value={difficulties[levelName].value}
                            onChange={(e) =>
                              handleDifficultyChange(levelName, "value", e.target.value)
                            }
                            required={levelName !== "Ultima"}
                          />
                          <Input
                            label={`${levelName} Face Value`}
                            type="text"
                            placeholder="e.g. 9+"
                            value={difficulties[levelName].faceValue}
                            onChange={(e) =>
                              handleDifficultyChange(levelName, "faceValue", e.target.value)
                            }
                            required={levelName !== "Ultima"}
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
                    label="Song link"
                    name="songLink"
                    type="url"
                    value={songLink}
                    onChange={(e) => setSongLink(e.target.value)}
                    placeholder="https://..."
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Ultima link"
                      name="ultimaLink"
                      type="url"
                      value={ultimaLink}
                      onChange={(e) => setUltimaLink(e.target.value)}
                      placeholder="https://..."
                    />
                    <Input
                      label="Master link"
                      name="masterLink"
                      type="url"
                      value={masterLink}
                      onChange={(e) => setMasterLink(e.target.value)}
                      placeholder="https://..."
                    />
                    <Input
                      label="Expert link"
                      name="expertLink"
                      type="url"
                      value={expertLink}
                      onChange={(e) => setExpertLink(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <Divider />

              {/* Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
                <Checkbox isSelected={omnimix} onValueChange={setOmnimix}>
                  Include in Omnimix
                </Checkbox>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-between pt-4">
                <Button 
                  color="danger" 
                  variant="flat" 
                  onPress={handleCancel}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  color="primary"
                  isLoading={saving}
                  disabled={saving}
                >
                  {saving ? "Updating..." : "Update Song"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Song Updated Successfully!
              </ModalHeader>
              <ModalBody>
                <p>The song "{songName}" has been updated in the database.</p>
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

export default UpdateSong;

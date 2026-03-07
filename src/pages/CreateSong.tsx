import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

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

function AddSong() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Song metadata
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [songLink, setSongLink] = useState("");
  const [ultimaLink, setUltimaLink] = useState("");
  const [masterLink, setMasterLink] = useState("");
  const [expertLink, setExpertLink] = useState("");
  const [category, setCategory] = useState("");
  const [version, setVersion] = useState("");
  const [omnimix, setOmnimix] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = imageFile.name;
        const { error: uploadError } = await supabase.storage
          .from("song-images")
          .upload(fileName, imageFile);

        if (uploadError) {
          console.error("Image upload failed:", uploadError);
          setError("Image upload failed. Please try again.");
          setSaving(false);
          return;
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from("song-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

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

      const { error } = await supabase.from("rhythmGameSongData").insert([
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
          image: imageUrl,
        },
      ]);

      if (error) {
        console.error("Insert error:", error);
        setError("Failed to add song. Please try again.");
      } else {
        onOpen(); // Show success modal
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Song</h1>
            <p className="text-gray-600 mt-2">Add a new song to the rhythm game database</p>
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Song Information</h2>
                <p className="text-gray-600">Enter the details for the new song</p>
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
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Artist"
                  name="artist"
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Enter artist name"
                  variant="bordered"
                />
              </div>

              {/* Category and Version */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Category"
                  isRequired
                  placeholder="Select a category"
                  selectedKeys={[category]}
                  variant="bordered"
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
                  variant="bordered"
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
                            variant="bordered"
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
                    label="Song link"
                    name="songLink"
                    type="url"
                    value={songLink}
                    onChange={(e) => setSongLink(e.target.value)}
                    placeholder="https://..."
                    variant="bordered"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Ultima link"
                      name="ultimaLink"
                      type="url"
                      value={ultimaLink}
                      onChange={(e) => setUltimaLink(e.target.value)}
                      placeholder="https://..."
                      variant="bordered"
                    />
                    <Input
                      label="Master link"
                      name="masterLink"
                      type="url"
                      value={masterLink}
                      onChange={(e) => setMasterLink(e.target.value)}
                      placeholder="https://..."
                      variant="bordered"
                    />
                    <Input
                      label="Expert link"
                      name="expertLink"
                      type="url"
                      value={expertLink}
                      onChange={(e) => setExpertLink(e.target.value)}
                      placeholder="https://..."
                      variant="bordered"
                    />
                  </div>
                </div>
              </div>

              <Divider />

              {/* Image Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Song Image</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-600">
                        {imageFile ? imageFile.name : "Click to upload song image (optional)"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
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
                  {saving ? "Adding Song..." : "Add Song"}
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
                Song Added Successfully!
              </ModalHeader>
              <ModalBody>
                <p>The song "{songName}" has been added to the database.</p>
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

export default AddSong;

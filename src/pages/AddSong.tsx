import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Checkbox,
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

function AddSong() {
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("song-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Image upload failed:", uploadError);
        alert("Image upload failed");
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
        alert(`Missing value for ${level}`);
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

    // Create an object with all form values except imageFile
    const formData = {
      songName,
      artist,
      difficultyList,
      songLink,
      ultimaLink,
      masterLink,
      expertLink,
      category,
      version,
      omnimix,
    };

    console.log("Form data (without image):", formData);

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
      alert("Something went wrong while saving the song.");
    } else {
      alert("Song successfully added!");
      // Reset form if needed
      setSongName("");
      setArtist("");
      setDifficulties({
        Basic: { value: "", faceValue: "" },
        Advanced: { value: "", faceValue: "" },
        Expert: { value: "", faceValue: "" },
        Master: { value: "", faceValue: "" },
        Ultima: { value: "", faceValue: "" },
      });
      setSongLink("");
      setUltimaLink("");
      setMasterLink("");
      setExpertLink("");
      // setCategory(new Set([]));
      // setVersion(new Set([]));
      setOmnimix(false);
      setImageFile(null);
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Add Song to Database</h1>
      <Form onSubmit={handleSubmit} className="space-y-6">
        {/* Song Info */}
        <Input
          isRequired
          label="Song name"
          name="songName"
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <Input
          isRequired
          label="Artist"
          name="artist"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        {/* Difficulty Inputs */}
        <div className="space-y-4">
          {levelNames.map((levelName) => (
            <div key={levelName} className="grid grid-cols-2 gap-4">
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
          ))}
        </div>

        <Input
          label="Song link"
          name="songLink"
          type="text"
          value={songLink}
          onChange={(e) => setSongLink(e.target.value)}
        />

        <Input
          label="Ultima link"
          name="ultimaLink"
          type="text"
          value={ultimaLink}
          onChange={(e) => setUltimaLink(e.target.value)}
        />

        <Input
          label="Master link"
          name="masterLink"
          type="text"
          value={masterLink}
          onChange={(e) => setMasterLink(e.target.value)}
        />

        <Input
          label="Expert link"
          name="expertLink"
          type="text"
          value={expertLink}
          onChange={(e) => setExpertLink(e.target.value)}
        />

        <Select
          label="Category"
          isRequired
          placeholder="Select a category"
        >
          {categories.map((cat) => (
            <SelectItem key={cat.value} onClick={() => setCategory(cat.value)}>{cat.label}</SelectItem>
          ))}
        </Select>

        <Select
          label="Version"
          isRequired
          placeholder="Select a version"
        >
          {versions.map((ver) => (
            <SelectItem key={ver.value} onClick={() => setVersion(ver.value)}>{ver.label}</SelectItem>
          ))}
        </Select>

        <Checkbox isSelected={omnimix} onValueChange={setOmnimix}>
          Omnimix
        </Checkbox>

        <label className="block text-sm font-medium text-gray-700">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            className="mt-2 block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border file:border-gray-300
               file:text-sm file:font-semibold
               file:bg-gray-50 file:text-gray-700
               hover:file:bg-gray-100
               focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Submit Button */}
        <Button type="submit" color="primary">
          Submit Song
        </Button>
      </Form>
    </>
  );
}

export default AddSong;

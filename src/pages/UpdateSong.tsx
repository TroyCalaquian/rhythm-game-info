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

  useEffect(() => {
    if (!id) {
      alert("Missing song ID");
      navigate("/dashboard");
      return;
    }
    getData();
  }, [id]);

  async function getData() {
    const { data, error } = await supabase
      .from("rhythmGameSongData")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setSongName(data.songName);
      setArtist(data.artist);
      setSongLink(data.songLink);
      setUltimaLink(data.ultimaChartLink);
      setMasterLink(data.masterChartLink);
      setExpertLink(data.expertChartLink);
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
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

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
      alert("Something went wrong while updating the song.");
    } else {
      alert("Song successfully updated!");
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
      navigate("/dashboard");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Edit Song in Database</h1>
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

        <Checkbox isSelected={omnimix} onValueChange={setOmnimix}>
          Omnimix
        </Checkbox>

        {/* Submit Button */}
        <Button type="submit" color="primary">
          Submit Song
        </Button>
      </Form>
    </>
  );
}

export default UpdateSong;

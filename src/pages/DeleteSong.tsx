import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../helper/supabaseClient";
import { Button, Input, Checkbox } from "@heroui/react";
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
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this song?"
    );
    if (!confirm) return;

    const { error } = await supabase
      .from("rhythmGameSongData")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete the song.");
    } else {
      alert("Song deleted.");
      navigate("/dashboard");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Delete Song Confirmation</h1>
      <div className="space-y-6">
        <Input isReadOnly label="Song name" value={songName} />
        <Input isReadOnly label="Artist" value={artist} />
        <div className="space-y-2">
          {levelNames.map((level) => (
            <div key={level} className="flex gap-4">
              <Input
                isReadOnly
                label={`${level} Value`}
                value={difficulties[level].value}
              />
              <Input
                isReadOnly
                label={`${level} Face Value`}
                value={difficulties[level].faceValue}
              />
            </div>
          ))}
        </div>
        <Input isReadOnly label="Song Link" value={songLink} />
        <Input isReadOnly label="Ultima Chart Link" value={ultimaLink} />
        <Input isReadOnly label="Master Chart Link" value={masterLink} />
        <Input isReadOnly label="Expert Chart Link" value={expertLink} />
        <Input isReadOnly label="Category" value={category} />
        <Input isReadOnly label="Version" value={version} />
        <Checkbox isSelected={omnimix} isReadOnly>
          Omnimix
        </Checkbox>

        <div className="flex gap-4 mt-6">
          <Button color="danger" onPress={handleDelete}>
            Confirm Delete
          </Button>
          <Button onPress={() => navigate("/dashboard")}>Cancel</Button>
        </div>
      </div>
    </>
  );
}

export default DeleteSong;

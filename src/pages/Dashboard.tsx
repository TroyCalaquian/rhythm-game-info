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
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rhythmGameSong } from "../helper/types";

function Dashboard() {
  const navigate = useNavigate();

  const [rhythmGameSongData, setRhythmGameSongData] = useState<
    rhythmGameSong[]
  >([]);
  const [columns, setColumns] = useState<{ key: string; label: string }[]>([]);

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

  return (
    <>
      <div>
        <h1>Hello, you are logged in.</h1>
        <Button color="primary" onPress={() => navigate("/CreateSong")}>
          Add song
        </Button>
        <Button onPress={() => signOut()}>Sign out</Button>
      </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rhythmGameSongData}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                const cellValue = getKeyValue(item, columnKey);

                return (
                  <TableCell className={columnKey === "difficultyList" ? "min-w-[300px]" : ""}>
                    {columnKey === "difficultyList" &&
                    Array.isArray(cellValue) ? (
                      <div className="space-y-1">
                        {cellValue.map((d: any) => (
                          <div key={d.levelName}>
                            <strong>{d.levelName}</strong>: {d.faceValue} (
                            {parseFloat(d.value).toFixed(1)})
                          </div>
                        ))}
                      </div>
                    ) : typeof cellValue === "object" ? (
                      JSON.stringify(cellValue)
                    ) : (
                      String(cellValue)
                    )}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default Dashboard;

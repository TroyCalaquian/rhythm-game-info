import {Input, Button, Switch, Select, SelectItem } from "@heroui/react";

interface Props {
  filterText: string;
  onFilterTextChange: (song: string) => void;
  filterCategory: string;
  onCategoryChange: (category: string) => void;
  filterVersion: string;
  onVersionChange: (version: string) => void;
  filterOmnimix: boolean;
  onOmnimixChange: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
}

const categories = [
  { value: "P&A", label: "Pops and Anime" },
  { value: "NN", label: "niconico" },
  { value: "TP", label: "Touhou Project" },
  { value: "Variety", label: "Variety" },
  { value: "GekiMai", label: "GekiMai" },
  { value: "Irodorimidori", label: "Irodorimidori" },
  { value: "Original", label: "Original" },
];

const versions = [
  { value: "Chunithm", label: "Chunithm" },
  { value: "Chunithm Plus", label: "Chunithm Plus" },
  { value: "Air", label: "Air" },
  { value: "Air Plus", label: "Air Plus" },
  { value: "Star", label: "Star" },
  { value: "Star Plus", label: "Star Plus" },
  { value: "Amazon", label: "Amazon" },
  { value: "Amazon Plus", label: "Amazon Plus" },
  { value: "Crystal", label: "Crystal" },
  { value: "Crystal Plus", label: "Crystal Plus" },
  { value: "Paradise", label: "Paradise" },
  { value: "Paradise Lost", label: "Paradise Lost" },
  { value: "New", label: "New" },
  { value: "New Plus", label: "New Plus" },
  { value: "Sun", label: "Sun" },
  { value: "Sun Plus", label: "Sun Plus" },
  { value: "Luminous", label: "Luminous" },
  { value: "Luminous Plus", label: "Luminous Plus" },
  { value: "Verse", label: "Verse" },
];

function SearchBar({
  onFilterTextChange,
  filterCategory,
  onCategoryChange,
  filterVersion,
  onVersionChange,
  filterOmnimix,
  onOmnimixChange,
  setIsModalOpen,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      {/* Search input and Randomizer button */}
      <div className="col-span-2">
        <Input
          label="Search for a song or artist"
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </div>

      <div>
        <Button onPress={() => setIsModalOpen(true)} color="primary">
          Open Randomizer
        </Button>
      </div>

      {/* Filters */}
      {/* TODO: Use onSelectionChange and selectedKeys */}
      <div>
        <Select label="Category">
          {categories.map((option) => (
            <SelectItem
              key={option.value}
              onClick={() =>
                onCategoryChange(
                  filterCategory === option.value ? "" : option.value
                )
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Select label="Version">
          {versions.map((option) => (
            <SelectItem
              key={option.value}
              onClick={() =>
                onVersionChange(
                  filterVersion === option.value ? "" : option.value
                )
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Switch
          isSelected={filterOmnimix}
          onChange={(e) => onOmnimixChange(e.target.checked)}
        >
          Include Omnimix Songs
        </Switch>
      </div>
    </div>
  );
}

export default SearchBar;

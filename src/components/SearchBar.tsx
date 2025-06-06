// import Select from "react-select";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  SelectSection,
  SelectItem,
} from "@heroui/react";

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
  { value: "", label: "Category" },
  { value: "P&A", label: "Pops and Anime" },
  { value: "NN", label: "niconico" },
  { value: "TP", label: "Touhou Project" },
  { value: "Variety", label: "Variety" },
  { value: "GekiMai", label: "GekiMai" },
  { value: "Irodorimidori", label: "Irodorimidori" },
  { value: "Original", label: "Original" },
];

const versions = [
  { value: "", label: "Version" },
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
  filterText,
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
    <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      {/* Search input and Randomizer button */}
      <div className="flex gap-3 items-center">
        <Input
          type="text"
          value={filterText}
          placeholder="Search for a song or artist"
          onChange={(e) => onFilterTextChange(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setIsModalOpen(true)}>Open Randomizer</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="min-w-[180px]">
          <Select label="Category" placeholder="Category" className="max-w-xs">
            {categories.map((option) => (
              <SelectItem
                key={option.value}
                onClick={() => onCategoryChange(option.value)}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="min-w-[180px]">
          <Select label="Version" placeholder="Version" className="max-w-xs">
            {versions.map((option) => (
              <SelectItem
                key={option.value}
                onClick={() => onVersionChange(option.value)}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Omnimix Toggle */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={filterOmnimix}
            onChange={(e) => onOmnimixChange(e.target.checked)}
          >
            Include Omnimix Songs
          </Checkbox>
        </div>
      </div>
    </Form>
  );
}

export default SearchBar;

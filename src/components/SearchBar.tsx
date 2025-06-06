import Select from "react-select";

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
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      {/* Search input and Randomizer button */}
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={filterText}
          placeholder="Search for a song or artist"
          onChange={(e) => onFilterTextChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Open Randomizer
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="min-w-[180px]">
          <Select
            options={categories}
            placeholder="Category"
            value={categories.find((option) => option.value === filterCategory)}
            onChange={(selectedOption) =>
              onCategoryChange(selectedOption ? selectedOption.value : "")
            }
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 200,
              }),
            }}
            isClearable
          />
        </div>

        <div className="min-w-[180px]">
          <Select
            options={versions}
            placeholder="Version"
            value={versions.find((option) => option.value === filterVersion)}
            onChange={(selectedOption) =>
              onVersionChange(selectedOption ? selectedOption.value : "")
            }
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 200,
              }),
            }}
            isClearable
          />
        </div>

        {/* Omnimix Toggle */}
        <div className="flex items-center gap-2">
          <input
            id="checkmarkFilter"
            type="checkbox"
            className="accent-blue-600 w-4 h-4"
            checked={filterOmnimix}
            onChange={(e) => onOmnimixChange(e.target.checked)}
          />
          <label htmlFor="checkmarkFilter" className="text-sm">
            Include Omnimix Songs
          </label>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;

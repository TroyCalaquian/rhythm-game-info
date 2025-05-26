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

const options = [
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
  {
    /* Filter by Category, Version, Omnimix */
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Search bar - stays on its own line */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          value={filterText}
          placeholder="Search for a song or artist"
          onChange={(e) => onFilterTextChange(e.target.value)}
          style={{ flex: 1 }}
        />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
          onClick={() => setIsModalOpen(true)}
        >
          Open Randomizer
        </button>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Possible Component? */}
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
          isClearable={true}
        />

        <Select
          options={options}
          placeholder="Version"
          value={options.find((option) => option.value === filterVersion)}
          onChange={(selectedOption) =>
            onVersionChange(selectedOption ? selectedOption.value : "")
          }
          styles={{
            menuList: (provided) => ({
              ...provided,
              maxHeight: 200,
            }),
          }}
          isClearable={true}
        />

        <div style={{ display: "flex", alignItems: "center" }} className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkmarkFilter"
            checked={filterOmnimix}
            onChange={(e) => onOmnimixChange(e.target.checked)}
          />
          <label htmlFor="checkmarkFilter" style={{ marginLeft: "8px" }}>
            Include Omnimix Songs
          </label>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;

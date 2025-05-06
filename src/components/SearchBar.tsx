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
}

const categories = [
  { value: "", label: "Category" },
  { value: "P&A", label: "Pops and Anime" },
  { value: "TP", label: "Touhou Project" },
  { value: "Variety", label: "Variety" },
  { value: "GekiMai", label: "GekiMai" },
  { value: "Irodorimidori", label: "Irodorimidori" },
  { value: "Original", label: "Original" },
];

const options = [
  { value: "", label: "Version" },
  { value: "chunithm", label: "Chunithm" },
  { value: "chunithmPlus", label: "Chunithm Plus" },
  { value: "air", label: "Air" },
  { value: "airPlus", label: "Air Plus" },
  { value: "star", label: "Star" },
  { value: "starPlus", label: "Star Plus" },
  { value: "amazon", label: "Amazon" },
  { value: "amazonPlus", label: "Amazon Plus" },
  { value: "crystal", label: "Crystal" },
  { value: "crystalPlus", label: "Crystal Plus" },
  { value: "paradise", label: "Paradise" },
  { value: "paradiseLost", label: "Paradise Lost" },
  { value: "new", label: "New" },
  { value: "newPlus", label: "New Plus" },
  { value: "sun", label: "Sun" },
  { value: "sunPlus", label: "Sun Plus" },
  { value: "luminous", label: "Luminous" },
  { value: "luminousPlus", label: "Luminous Plus" },
  { value: "verse", label: "Verse" },
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
}: Props) {
  {
    /* Filter by Category, Version, Omnimix */
  }
  return (
    <form>
      {/* Search bar - stays on its own line */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          value={filterText}
          placeholder="Search for a song"
          onChange={(e) => onFilterTextChange(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
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

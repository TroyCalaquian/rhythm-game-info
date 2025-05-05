import Select from "react-select";

interface Props {
  filterText: string;
  onFilterTextChange: (song: string) => void;
}

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

function SearchBar({ filterText, onFilterTextChange }: Props) {
  {
    /* Filter by Category, Version, Omnimix */
  }
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search for a song"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />

      <Select
        options={options}
        placeholder="Select a version"
        styles={{
          menuList: (provided) => ({
            ...provided,
            maxHeight: 200, // limits the dropdown height
          }),
        }}
      />

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <input type="checkbox" id="checkmarkFilter" />
        <label htmlFor="checkmarkFilter" style={{ marginLeft: "8px" }}>
          Include Omnimix Songs
        </label>
      </div>
    </form>
  );
}

export default SearchBar;

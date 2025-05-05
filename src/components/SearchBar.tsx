interface Props {
  filterText: string;
  onFilterTextChange: (song: string) => void;
}

function SearchBar({ filterText, onFilterTextChange }: Props) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search for a song"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;

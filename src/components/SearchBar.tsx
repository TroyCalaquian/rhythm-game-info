import {Input, Button, Switch, Select, SelectItem } from "@heroui/react";
import categories from "../helper/categories";
import versions from "../helper/versions";


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
          isClearable
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

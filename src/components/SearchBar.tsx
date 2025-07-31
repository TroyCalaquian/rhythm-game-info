import {Input, Button, Switch, Select, SelectItem, Chip } from "@heroui/react";
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
    <div className="space-y-6">
      {/* Search and Randomizer */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            isClearable
            label="Search for a song or artist"
            placeholder="Enter song name or artist..."
            value={filterText}
            onChange={(e) => onFilterTextChange(e.target.value)}
            variant="bordered"
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <div className="flex-shrink-0">
          <Button 
            onPress={() => setIsModalOpen(true)} 
            color="primary"
            className="w-full sm:w-auto font-semibold"
            startContent={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }
          >
            Randomizer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Select 
            label="Category" 
            placeholder="All Categories"
            selectedKeys={filterCategory ? [filterCategory] : []}
            variant="bordered"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              onCategoryChange(selected || "");
            }}
          >
            {categories.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <Select 
            label="Version" 
            placeholder="All Versions"
            selectedKeys={filterVersion ? [filterVersion] : []}
            variant="bordered"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              onVersionChange(selected || "");
            }}
          >
            {versions.map((option) => (
              <SelectItem key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex items-end">
          <Switch
            isSelected={filterOmnimix}
            onValueChange={onOmnimixChange}
            size="lg"
            color="primary"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">Include Omnimix</span>
              <span className="text-xs text-gray-500">Show Omnimix songs</span>
            </div>
          </Switch>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filterCategory || filterVersion || filterOmnimix) && (
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-sm text-gray-500 mr-2">Active filters:</span>
          {filterCategory && (
            <Chip 
              color="primary" 
              variant="flat" 
              size="sm"
              onClose={() => onCategoryChange("")}
            >
              Category: {categories.find(c => c.value === filterCategory)?.label}
            </Chip>
          )}
          {filterVersion && (
            <Chip 
              color="secondary" 
              variant="flat" 
              size="sm"
              onClose={() => onVersionChange("")}
            >
              Version: {versions.find(v => v.value === filterVersion)?.label}
            </Chip>
          )}
          {filterOmnimix && (
            <Chip 
              color="success" 
              variant="flat" 
              size="sm"
              onClose={() => onOmnimixChange(false)}
            >
              Omnimix Only
            </Chip>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

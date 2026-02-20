import Select from "react-select";

type CategoryOption = { value: string; label: string };
const categoryOptions: CategoryOption[] = [
  { value: "Fiction", label: "Fiction" },
  { value: "Non-Fiction", label: "Non-Fiction" },
  { value: "Technology", label: "Technology" },
  { value: "Self-Help", label: "Self-Help" },
  { value: "Biography", label: "Biography" },
  { value: "History", label: "History" },
];
type ReactselectProps = {
    categories: CategoryOption[];
      setCategories: (newCategories: CategoryOption[]) => void;
};

export default function Reactselect({
    categories,
    setCategories,
}: ReactselectProps) {
    return (
        <Select
            isMulti
            options={categoryOptions}
            value={categories}
            onChange={(selected) => setCategories(selected as CategoryOption[])}
        />
    );
}
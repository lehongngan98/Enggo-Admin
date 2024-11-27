import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem
} from "@/components/ui/command";
import { CollectionType } from "@/lib/types";
import { X } from "lucide-react";
import React, { useState } from "react";

interface MultiSelectProps {
    placeholder: string;
    collections: CollectionType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    placeholder,
    collections,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    let selectedCollections: CollectionType[];

    if (value.length === 0) {
        selectedCollections = [];
    } else {
        selectedCollections = value.map((id) =>
            collections.find((collections) => collections._id === id)
        ) as CollectionType[];
    }

    const selectTable = collections.filter(
        (collection) => !selectedCollections.includes(collection)
    );

    return (
        <Command className="overflow-visible bg-white">
            {/* show selected collections */}
            <div className="flex flex-wrap gap-1">
                {selectedCollections.map((collection) => (
                    <div
                        key={collection._id}
                        className="flex items-center gap-1 px-2 py-1 bg-grey-1 rounded-md text-white"
                    >
                        <span>{collection.title}</span>
                        <button
                            type="button"
                            onClick={() => onRemove(collection._id)}
                            className="ml-1 rounded-full outline-none hover:bg-red-1"
                        >
                            <X className="h-3 w-3" />
                        </button>

                    </div>
                ))}
            </div>

            <CommandInput
                placeholder={placeholder}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
            />

            <div className="mt-2 relative">
                {open && (
                    <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
                        {selectTable.map((collection) => (
                            <CommandItem
                                key={collection._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onSelect={() => {
                                    onChange(collection._id);
                                    setInputValue("");
                                }}
                                className="hover:bg-grey-2 cursor-pointer"
                            >
                                {collection.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </div>
        </Command>
    );
};

export default MultiSelect;

import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem
} from "@/components/ui/command";
import { TypeOfNewsType } from "@/lib/types";
import { X } from "lucide-react";
import React, { useState } from "react";

interface SelectTypeOfNewsProps {
    placeholder: string;
    typeOfNews: TypeOfNewsType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const SelectTypeOfNews: React.FC<SelectTypeOfNewsProps> = ({
    placeholder,
    typeOfNews,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    let selectedTypeOfNews: TypeOfNewsType[];

    if (value.length === 0) {
        selectedTypeOfNews = [];
    } else {
        selectedTypeOfNews = value.map((id) =>
            typeOfNews.find((typeOfNews) => typeOfNews._id === id)
        ) as TypeOfNewsType[];
    }

    const selectTable = typeOfNews.filter(
        (collection) => !selectedTypeOfNews.includes(collection)
    );

    return (
        <Command className="overflow-visible bg-white">
            {/* show selected typeOfNews */}
            <div className="flex flex-wrap gap-1">
                {selectedTypeOfNews.map((typeofnew) => (
                    <div
                        key={typeofnew._id}
                        className="flex items-center gap-1 px-2 py-1 bg-grey-1 rounded-md text-white"
                    >
                        <span>{typeofnew.title}</span>
                        <button
                            type="button"
                            onClick={() => onRemove(typeofnew._id)}
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
                        {selectTable.map((typeofnew) => (
                            <CommandItem
                                key={typeofnew._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onSelect={() => {
                                    onChange(typeofnew._id);
                                    setInputValue("");
                                }}
                                className="hover:bg-grey-2 cursor-pointer"
                            >
                                {typeofnew.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </div>
        </Command>
    );
};

export default SelectTypeOfNews;

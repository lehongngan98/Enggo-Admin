import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { set } from "mongoose";

interface DeleteProps {
    id: string;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
    const [loading, setLoading] = React.useState(false);

    const onDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/collections/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setLoading(false);
                window.location.reload();
                toast.success("Collection deleted successfully");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Failed to delete collection");
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className="bg-red-1 text-white">
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-grey-1">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-1">
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-1 text-white"
                        onClick={onDelete}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Delete;

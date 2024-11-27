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
import { Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

interface DeleteProps {
    id: string;
    item: string;
}

const Delete: React.FC<DeleteProps> = ({ id,item }) => {
    const [loading, setLoading] = React.useState(false);

    const onDelete = async () => {
        const itemType = item;
        try {
            setLoading(true);            
            const res = await fetch(`/api/${itemType}/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setLoading(false);
                window.location.href = `/${itemType}`;
                toast.success(`${itemType} deleted successfully`);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(`Failed to delete ${itemType}`);
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
                        Bạn có chắc chắn muốn xóa {item} này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể hoàn tác
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Huỷ
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-1 text-white"
                        onClick={onDelete}
                    >
                        Tiếp tục
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Delete;

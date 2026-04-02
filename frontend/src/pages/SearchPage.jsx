import SearchHeroSection from "@/components/ui/searchHeroSection";
import Searchbar from "@/components/ui/searchbar";
import Button from "@/components/ui/button";
import { MoreHorizontalIcon, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SearchPage(){
    return (
        <div className="flex flex-col gap-6 items-center">
            <SearchHeroSection></SearchHeroSection>
            <div className="flex justify-center gap-2">
                <Searchbar></Searchbar>
                <Button className="cursor-pointer">Search</Button>
            </div>
            <div className="min-w-[80%] flex justify-center rounded-md border border-oklch(87.2% 0.01 258.338) shadow-md">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Problem Title</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Link to Problem</TableHead>
                    <TableHead>Solving Status</TableHead>
                    <TableHead>Revision Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">2 Sum</TableCell>
                    <TableCell>Leetcode</TableCell>
                    <TableCell>link</TableCell>
                    <TableCell><Check className="text-green-500"/></TableCell>
                    <TableCell><X className="text-red-500"/></TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
                            <MoreHorizontalIcon />
                            <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                            Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>

        </div>
    );
}
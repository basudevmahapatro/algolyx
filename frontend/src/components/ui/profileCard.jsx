import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import  Button from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfileCard() {
  return (
    <Card className="w-[350px] mx-auto mt-10 shadow-md p-6">
      
      {/* Avatar + Name */}
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/user.png" />
          <AvatarFallback>BM</AvatarFallback>
        </Avatar>

        <h2 className="text-lg font-semibold">Basudev</h2>
      </div>

      <Separator className="my-4" />

      {/* Details */}
      <CardContent className="space-y-2 text-sm">
        <p><span className="font-medium">User ID:</span> 12345</p>
        <p><span className="font-medium">Email:</span> basu@email.com</p>
      </CardContent>

      {/* Actions */}
      <div className="mt-4 space-y-2">
        
        {/* Edit Profile Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full cursor-pointer">Edit Profile</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            {/* You can replace this with a form */}
            <div className="space-y-3 mt-2">
              <input
                className="w-full border p-2 rounded"
                placeholder="Name"
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
              <Button className="w-full cursor-pointer">Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Sign Out */}
        <Button variant="destructive" className="w-full cursor-pointer">
          Sign Out
        </Button>
      </div>

    </Card>
  );
}
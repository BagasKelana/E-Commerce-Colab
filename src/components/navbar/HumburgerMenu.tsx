import { Menu } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function HumburgerMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <li className="ml-2 lg:ml-4 relative inline-block md:hidden">
                    <Menu className="w-10 h-10 p-2 text-slate-100" />
                </li>
            </SheetTrigger>
            <SheetContent className="overflow-auto no-scrollbar">
                <SheetHeader>
                    <SheetTitle>Menu Utama</SheetTitle>
                </SheetHeader>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

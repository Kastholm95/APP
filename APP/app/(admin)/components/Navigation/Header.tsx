import Link from 'next/link'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../shadcn/ui/sheet'
import { Button } from '../shadcn/ui/button'
import { Menu, Package2 } from 'lucide-react'

export default function Header() {
  return (
     <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background bg-black px-4 md:px-6">
     <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
       <Link
         href="#"
         className="text-muted-foreground transition-colors hover:text-foreground"
       >
         Orders
       </Link>
       <Link
         href="#"
         className="text-muted-foreground transition-colors hover:text-foreground"
       >
         Products
       </Link>
       <Link
         href="#"
         className="text-muted-foreground transition-colors hover:text-foreground"
       >
         Customers
       </Link>
       <Link
         href="#"
         className="text-muted-foreground transition-colors hover:text-foreground"
       >
         Analytics
       </Link>
     </nav>
     <Sheet>
       <SheetTrigger asChild>
         <Button
           variant="outline"
           size="icon"
           className="shrink-0 md:hidden"
         >
           <Menu className="h-5 w-5" />
           <span className="sr-only">Toggle navigation menu</span>
         </Button>
       </SheetTrigger>
       <SheetContent side="left">
         <nav className="grid gap-6 text-lg font-medium">
           <Link
             href="#"
             className="flex items-center gap-2 text-lg font-semibold"
           >
             <Package2 className="h-6 w-6" />
             <span className="sr-only">Acme Inc</span>
           </Link>
           <Link href="#" className="hover:text-foreground">
             Dashboard
           </Link>
           <Link
             href="#"
             className="text-muted-foreground hover:text-foreground"
           >
             Orders
           </Link>
           <Link
             href="#"
             className="text-muted-foreground hover:text-foreground"
           >
             Products
           </Link>
           <Link
             href="#"
             className="text-muted-foreground hover:text-foreground"
           >
             Customers
           </Link>
           <Link
             href="#"
             className="text-muted-foreground hover:text-foreground"
           >
             Analytics
           </Link>
         </nav>
       </SheetContent>
     </Sheet>
   </header>
  )
}
import { PUBLIC_NAV_ITEMS } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/system/mode-toggle";

export function PublicNavigationMobile({
  open,
  onOpenChange,
}: Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-2 flex flex-col gap-6">
          {/* Navigation Links */}
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col gap-4">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <NavigationMenuLink
                  key={item.name}
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                  onClick={() => onOpenChange(false)}
                >
                  {item.name}
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="border-t p-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/signup" onClick={() => onOpenChange(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
        <SheetFooter>
          <ModeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

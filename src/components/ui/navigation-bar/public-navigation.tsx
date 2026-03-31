import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/system/mode-toggle";
import { PUBLIC_NAV_ITEMS } from "@/lib/landing-constants";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function PublicNavigation() {
  return (
    <>
      <NavigationMenu className="hidden items-center md:flex">
        <NavigationMenuList className="gap-6">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <NavigationMenuItem key={item.name}>
              {item.type === "dropdown" ? (
                <>
                  <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.subItems?.map((child) => (
                        <ListItem
                          key={child.title}
                          title={child.title}
                          href={child.href}
                          icon={child.icon}
                          status={child.status}
                        >
                          {child.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.name}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Desktop Action Buttons - Hidden on mobile */}
      <div className="hidden items-center gap-2 md:flex">
        <Button>
          <Link href="/signup">Get Started</Link>
          <ChevronRight />
        </Button>
        <ModeToggle />
      </div>
    </>
  );
}

export default PublicNavigation;

function ListItem({
  title,
  children,
  href,
  icon: Icon,
  status,
  ...props
}: Readonly<{
  title: string;
  children: React.ReactNode;
  href: string;
  status?: string;
  icon: React.ComponentType<{ className?: string }>;
}>) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-row items-start gap-2">
            <div className="bg-secondary border-primary/20 rounded-md border p-2">
              <Icon className="h-10 w-10" />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex flex-row items-center gap-4">
                <span className="leading-none font-medium">{title}</span>
                {status && <Badge className="bg-amber-300">{status}</Badge>}
              </div>
              <div className="text-muted-foreground line-clamp-2">
                {children}
              </div>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

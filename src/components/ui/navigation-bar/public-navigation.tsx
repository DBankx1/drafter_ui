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
import { PUBLIC_NAV_ITEMS } from "@/lib/constants";

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
        <Button asChild>
          <Link href="/signup">Get Started</Link>
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
  ...props
}: Readonly<{
  title: string;
  children: React.ReactNode;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}>) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-row items-start gap-2">
            <div>
              <Icon className="h-10 w-10" />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
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

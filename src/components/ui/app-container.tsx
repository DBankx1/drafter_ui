// components/ui/app-container.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva(
  "w-full mx-auto", // Base styles - full width, centered
  {
    variants: {
      // Max width variants with better mobile-first approach
      size: {
        sm: "max-w-2xl", // 672px - Narrow content (blogs, forms)
        md: "max-w-4xl", // 896px - Medium content (dashboards)
        lg: "max-w-6xl", // 1152px - Wide content (data tables)
        xl: "max-w-7xl", // 1280px - Extra wide (landing pages)
        "2xl": "max-w-screen-2xl", // 1536px - Full width with constraints
        full: "max-w-none", // No max width
      },

      // Simplified padding variants - mobile-first responsive
      padding: {
        none: "p-0",
        xs: "p-2 sm:p-3 md:p-4",
        sm: "p-4 sm:p-5 md:p-6 lg:p-8",
        md: "p-4 sm:p-6 md:p-8 lg:p-12",
        lg: "p-6 sm:p-8 md:p-12 lg:p-16",
        xl: "p-8 sm:p-12 md:p-16 lg:p-24",
      },

      // Padding X-axis only (horizontal) - mobile-first
      paddingX: {
        none: "px-0",
        xs: "px-2 sm:px-3 md:px-4",
        sm: "px-2 sm:px-5 md:px-6 lg:px-8",
        md: "px-4 sm:px-6 md:px-8 lg:px-12",
        lg: "px-6 sm:px-8 md:px-12 lg:px-16",
        xl: "px-8 sm:px-12 md:px-16 lg:px-24",
      },

      // Padding Y-axis only (vertical) - mobile-first
      paddingY: {
        none: "py-0",
        xs: "py-2 sm:py-3 md:py-4",
        sm: "py-2 sm:py-5 md:py-6 lg:py-8",
        md: "py-6 sm:py-8 md:py-10 lg:py-12",
        lg: "py-8 sm:py-10 md:py-12 lg:py-16",
        xl: "py-12 sm:py-14 md:py-16 lg:py-20",
      },

      // Background variants
      background: {
        none: "",
        white: "bg-white",
        muted: "bg-muted",
        accent: "bg-accent",
        card: "bg-card",
        primary: "bg-primary",
        secondary: "bg-secondary",
      },

      // Border variants
      border: {
        none: "",
        default: "border border-border",
        top: "border-t border-border",
        bottom: "border-b border-border",
        x: "border-x border-border",
        y: "border-y border-border",
      },

      // Shadow variants
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },

      // Rounded corners
      rounded: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
      },

      // Display variants for common layouts
      display: {
        block: "block",
        flex: "flex",
        "flex-col": "flex flex-col",
        grid: "grid",
        inline: "inline-block",
      },

      // Gap variants (useful when display is flex or grid)
      gap: {
        none: "gap-0",
        xs: "gap-2",
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-12",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "md",
      background: "none",
      border: "none",
      shadow: "none",
      rounded: "none",
    },
  },
);

export interface AppContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
  // Allow full control when needed
  fullWidth?: boolean;
  // Center content vertically
  centerY?: boolean;
  // Center content horizontally
  centerX?: boolean;
}

const AppContainer = React.forwardRef<HTMLDivElement, AppContainerProps>(
  (
    {
      className,
      size,
      padding,
      paddingX,
      paddingY,
      background,
      border,
      shadow,
      rounded,
      display,
      gap,
      fullWidth = false,
      centerY = false,
      centerX = false,
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({
            size: fullWidth ? "full" : size,
            // If paddingX or paddingY is specified, ignore padding
            padding: paddingX || paddingY ? "none" : padding,
            paddingX,
            paddingY,
            background,
            border,
            shadow,
            rounded,
            display,
            gap,
          }),
          {
            "min-h-screen": centerY,
            "items-center": centerY && display?.includes("flex"),
            "justify-center": centerX && display?.includes("flex"),
          },
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

AppContainer.displayName = "AppContainer";

export { AppContainer, containerVariants };

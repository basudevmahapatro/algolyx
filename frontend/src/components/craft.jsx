import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Layout
const Layout = ({ children, className }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("scroll-smooth antialiased focus:scroll-auto", className)}
    >
      {children}
    </html>
  );
};

// Main
const Main = ({ children, className, id }) => {
  return (
    <main
      className={cn(
        "max-w-none prose-p:m-0",
        "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
        "prose-headings:font-normal",
        "prose-strong:font-semibold",
        "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        "prose-blockquote:not-italic",
        "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
        className
      )}
      id={id}
    >
      {children}
    </main>
  );
};

// Section
const Section = ({ children, className, id }) => {
  return (
    <section className={cn("py-8 md:py-12", className)} id={id}>
      {children}
    </section>
  );
};

// Container
const Container = ({ children, className, id }) => {
  return (
    <div className={cn("mx-auto max-w-5xl p-6 sm:p-8", className)} id={id}>
      {children}
    </div>
  );
};

// Article
const Article = ({
  children,
  className,
  id,
  dangerouslySetInnerHTML,
}) => {
  return (
    <article
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={cn(
        "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
        "prose-headings:font-normal",
        "prose-p:mb-0",
        "prose-strong:font-semibold",
        "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        "prose-blockquote:not-italic",
        "prose-pre:border prose-pre:bg-muted/25",
        className
      )}
      id={id}
    >
      {children}
    </article>
  );
};

// Box
const Box = ({
  children,
  className,
  direction = "row",
  wrap = false,
  gap = 0,
  cols,
  rows,
}) => {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
  };

  const wrapClasses = wrap ? "flex-wrap" : "flex-nowrap";

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  const getResponsiveClasses = (prop, classMap) => {
    if (typeof prop === "object") {
      return Object.entries(prop)
        .map(([breakpoint, value]) => {
          const prefix = breakpoint === "sm" ? "" : `${breakpoint}:`;
          return `${prefix}${classMap[value] || ""}`;
        })
        .join(" ");
    }
    return classMap[prop] || "";
  };

  const stackClasses = cn(
    cols || rows ? "grid" : "flex",
    getResponsiveClasses(direction, directionClasses),
    typeof wrap === "boolean"
      ? wrapClasses
      : getResponsiveClasses(wrap, {
          true: "flex-wrap",
          false: "flex-nowrap",
        }),
    getResponsiveClasses(gap, gapClasses),
    cols && getResponsiveClasses(cols, colsClasses),
    rows && getResponsiveClasses(rows, colsClasses),
    className
  );

  return <div className={stackClasses}>{children}</div>;
};

export { Layout, Main, Section, Container, Article, Box };
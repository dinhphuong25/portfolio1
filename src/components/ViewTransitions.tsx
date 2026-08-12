// ViewTransitions.tsx
// These are thin pass-through wrappers so layout.tsx and other components
// can import { ViewTransitions, Link } from here without breaking changes.
// The actual transition animation is handled entirely by CSS (@view-transition).

import React from "react";
import NextLink from "next/link";

export function ViewTransitions({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export const Link = NextLink;

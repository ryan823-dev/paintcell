import React, { type ReactElement, type ReactNode, useLayoutEffect } from "react";

type Attributes = Record<string, string>;
type HeadTagName = "link" | "meta" | "noscript" | "script" | "style";

type HeadTagDescriptor = {
  attrs: Attributes;
  innerHTML?: string;
  tagName: HeadTagName;
};

type HelmetSnapshot = {
  bodyAttributes: Attributes;
  headTags: HeadTagDescriptor[];
  htmlAttributes: Attributes;
  title?: string;
  titleAttributes: Attributes;
};

type HelmetStoreEntry = {
  id: symbol;
  order: number;
  snapshot: HelmetSnapshot;
};

type HelmetStore = {
  remove: (id: symbol) => void;
  upsert: (id: symbol, snapshot: HelmetSnapshot) => void;
};

const MANAGED_ATTRS_KEY = "data-rh-attrs";
const MANAGED_TAG_SELECTOR = "[data-rh=\"true\"]";

const HelmetContext = React.createContext<HelmetStore | null>(null);

function normalizeAttributeName(name: string) {
  switch (name) {
    case "charSet":
      return "charset";
    case "className":
      return "class";
    case "httpEquiv":
      return "http-equiv";
    default:
      return name;
  }
}

function normalizeAttributeValue(value: unknown): string | null {
  if (value === false || value === null || value === undefined) {
    return null;
  }

  if (value === true) {
    return "";
  }

  return String(value);
}

function extractAttributes(
  props: Record<string, unknown>,
  excludedKeys: string[] = [],
): Attributes {
  const excluded = new Set(excludedKeys);
  const attrs: Attributes = {};

  for (const [key, value] of Object.entries(props)) {
    if (excluded.has(key)) {
      continue;
    }

    const normalizedValue = normalizeAttributeValue(value);

    if (normalizedValue === null) {
      continue;
    }

    attrs[normalizeAttributeName(key)] = normalizedValue;
  }

  return attrs;
}

function toTextContent(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toTextContent(entry)).join("");
  }

  return "";
}

function createEmptySnapshot(): HelmetSnapshot {
  return {
    bodyAttributes: {},
    headTags: [],
    htmlAttributes: {},
    titleAttributes: {},
  };
}

function readManagedAttributes(element: HTMLElement): string[] {
  const raw = element.getAttribute(MANAGED_ATTRS_KEY);
  return raw ? raw.split(",").filter(Boolean) : [];
}

function writeManagedAttributes(element: HTMLElement, attrs: Attributes) {
  const previous = new Set(readManagedAttributes(element));
  const nextKeys = Object.keys(attrs);

  for (const key of previous) {
    if (!(key in attrs)) {
      element.removeAttribute(key);
    }
  }

  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }

  if (nextKeys.length > 0) {
    element.setAttribute(MANAGED_ATTRS_KEY, nextKeys.join(","));
  } else {
    element.removeAttribute(MANAGED_ATTRS_KEY);
  }
}

function dedupeHeadTags(tags: HeadTagDescriptor[]) {
  const seen = new Set<string>();
  const deduped: HeadTagDescriptor[] = [];

  for (let index = tags.length - 1; index >= 0; index -= 1) {
    const tag = tags[index];
    const key =
      tag.tagName === "meta"
        ? `meta:${tag.attrs.charset || tag.attrs.name || tag.attrs.property || tag.attrs["http-equiv"] || tag.attrs.itemprop || JSON.stringify(tag.attrs)}`
        : tag.tagName === "link"
          ? `link:${tag.attrs.rel || ""}:${tag.attrs.href || ""}:${tag.attrs.hreflang || ""}`
          : `${tag.tagName}:${tag.attrs.src || ""}:${tag.attrs.type || ""}:${tag.innerHTML || ""}:${JSON.stringify(tag.attrs)}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.unshift(tag);
  }

  return deduped;
}

function reduceSnapshots(entries: HelmetStoreEntry[]) {
  const state = createEmptySnapshot();

  for (const entry of entries.sort((left, right) => left.order - right.order)) {
    state.bodyAttributes = { ...state.bodyAttributes, ...entry.snapshot.bodyAttributes };
    state.htmlAttributes = { ...state.htmlAttributes, ...entry.snapshot.htmlAttributes };
    state.titleAttributes = { ...state.titleAttributes, ...entry.snapshot.titleAttributes };

    if (entry.snapshot.title !== undefined) {
      state.title = entry.snapshot.title;
    }

    state.headTags.push(...entry.snapshot.headTags);
  }

  state.headTags = dedupeHeadTags(state.headTags);
  return state;
}

function createHeadElement(document: Document, tag: HeadTagDescriptor) {
  const element = document.createElement(tag.tagName);

  for (const [key, value] of Object.entries(tag.attrs)) {
    element.setAttribute(key, value);
  }

  element.setAttribute("data-rh", "true");

  if (tag.innerHTML !== undefined) {
    element.innerHTML = tag.innerHTML;
  }

  return element;
}

function applyHelmetSnapshot(document: Document, snapshot: HelmetSnapshot) {
  if (snapshot.title !== undefined) {
    document.title = snapshot.title;
  }

  if (document.documentElement instanceof HTMLElement) {
    writeManagedAttributes(document.documentElement, snapshot.htmlAttributes);
  }

  if (document.body instanceof HTMLElement) {
    writeManagedAttributes(document.body, snapshot.bodyAttributes);
  }

  document.head.querySelectorAll(MANAGED_TAG_SELECTOR).forEach((node) => node.remove());

  for (const tag of snapshot.headTags) {
    document.head.appendChild(createHeadElement(document, tag));
  }
}

function collectHeadTags(element: ReactElement, snapshot: HelmetSnapshot) {
  const props = element.props as Record<string, unknown>;
  const type = typeof element.type === "string" ? element.type : null;

  if (!type) {
    return;
  }

  if (type === "title") {
    snapshot.title = toTextContent(props.children as ReactNode).trim();
    snapshot.titleAttributes = extractAttributes(props, ["children"]);
    return;
  }

  if (type === "html") {
    snapshot.htmlAttributes = {
      ...snapshot.htmlAttributes,
      ...extractAttributes(props, ["children"]),
    };
    return;
  }

  if (type === "body") {
    snapshot.bodyAttributes = {
      ...snapshot.bodyAttributes,
      ...extractAttributes(props, ["children"]),
    };
    return;
  }

  if (!["link", "meta", "noscript", "script", "style"].includes(type)) {
    return;
  }

  const dangerouslySetInnerHTML = props.dangerouslySetInnerHTML as { __html?: string } | undefined;
  const childrenContent = toTextContent(props.children as ReactNode);
  const innerHTML =
    dangerouslySetInnerHTML?.__html ?? (childrenContent || undefined);

  snapshot.headTags.push({
    attrs: extractAttributes(props, ["children", "dangerouslySetInnerHTML"]),
    innerHTML,
    tagName: type as HeadTagName,
  });
}

function walkChildren(children: ReactNode, snapshot: HelmetSnapshot) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }

    if (child.type === React.Fragment) {
      walkChildren(child.props.children as ReactNode, snapshot);
      return;
    }

    collectHeadTags(child, snapshot);
  });
}

function createSnapshot(children: ReactNode) {
  const snapshot = createEmptySnapshot();
  walkChildren(children, snapshot);
  return snapshot;
}

export function HelmetProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = React.useState<HelmetStoreEntry[]>([]);
  const orderRef = React.useRef(0);

  const store = React.useMemo<HelmetStore>(
    () => ({
      remove(id) {
        setEntries((current) => current.filter((entry) => entry.id !== id));
      },
      upsert(id, snapshot) {
        setEntries((current) => {
          const existingEntry = current.find((entry) => entry.id === id);

          if (existingEntry) {
            return current.map((entry) => (entry.id === id ? { ...entry, snapshot } : entry));
          }

          return [
            ...current,
            {
              id,
              order: orderRef.current++,
              snapshot,
            },
          ];
        });
      },
    }),
    [],
  );

  useLayoutEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    applyHelmetSnapshot(document, reduceSnapshots(entries));
  }, [entries]);

  return <HelmetContext.Provider value={store}>{children}</HelmetContext.Provider>;
}

export function Helmet({ children }: { children?: ReactNode }) {
  const store = React.useContext(HelmetContext);
  const idRef = React.useRef(Symbol("helmet"));
  const snapshot = React.useMemo(() => createSnapshot(children), [children]);

  useLayoutEffect(() => {
    const helmetId = idRef.current;

    if (!store) {
      if (typeof document !== "undefined") {
        applyHelmetSnapshot(document, snapshot);
      }
      return;
    }

    store.upsert(helmetId, snapshot);

    return () => {
      store.remove(helmetId);
    };
  }, [snapshot, store]);

  return null;
}

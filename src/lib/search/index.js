// Public search namespace.

export { buildSearchIndex, KIND_ORDER, KIND_LABEL } from "./indexer";
export { match, groupByKind } from "./match";
export { SearchProvider, useSearch, useSearchOptional } from "./SearchContext";
export { ROUTE_ENTRIES } from "./routes";

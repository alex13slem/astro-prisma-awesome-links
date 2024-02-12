interface Edge<T> {
  cursor: string;
  node: T;
}

interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface Page<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
}

export interface RouteParams {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

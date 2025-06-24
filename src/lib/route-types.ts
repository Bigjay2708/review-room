export interface RouteParams {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

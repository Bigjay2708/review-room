import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

export interface RouteParams {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

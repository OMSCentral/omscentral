import { useLocation } from 'react-router';
import qs from 'query-string';

const useQueryParams = <TParams>(): Partial<TParams> =>
  (qs.parse(useLocation().search) as any) as Partial<TParams>;

export default useQueryParams;

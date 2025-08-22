import useSWR from 'swr';
import { formatTimestamp } from '../utils/date';

// Define the type for a single data item
interface DataItem {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  created: string;
}

// Define the fetcher function
const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useHistoryData() {
  const { data, error, isLoading } = useSWR<DataItem[]>('https://ambidata.io/api/v2/channels/93486/data?readKey=ef5adfcf2dea1333&n=300', fetcher);

  const transformedData = data?.map(item => ({
    ...item,
    created: formatTimestamp(item.created),
  }));

  return {
    data: transformedData,
    error,
    isLoading,
  };
}

type FetchInputType = [
  input: RequestInfo | URL,
  init?: RequestInit | undefined
];

export default function useFetchAndRevalidate<T>(
  fetchParams: FetchInputType,
  onFetch?: (result: T) => void,
  onRevalidate?: () => void,
  revalidateTimeSeconds = 60
) {
  const fetchData = async () => {
    const fetchedData = await new Promise<T>(async (res) => {
      try {
        const data = await (await fetch(...fetchParams)).json();
        res(data);
      } catch (error) {
        setTimeout(async () => {
          fetchData();
        }, 5000);
      }
    });
    if (onFetch) onFetch(fetchedData);
    setTimeout(() => {
      if (onRevalidate) onRevalidate();
      fetchData();
    }, revalidateTimeSeconds * 1000);
  };
  fetchData();
}

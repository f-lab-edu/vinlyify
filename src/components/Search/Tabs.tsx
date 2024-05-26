export default function Tabs({
  searchResult,
}: {
  searchResult: SearchResult | null;
}) {
  return <div>{JSON.stringify(searchResult)}</div>;
}

export default function Recommendations({
  recommendations,
}: {
  recommendations: Recommendations | null;
}) {
  return <>{JSON.stringify(recommendations)}</>;
}

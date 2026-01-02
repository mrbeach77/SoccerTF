import { ResultsView } from "@/components/results-view";
import { getCenterListings, getTrainerListings } from "@/services/listings";

export default async function ResultsPage() {
  const [trainerListings, centerListings] = await Promise.all([
    getTrainerListings(),
    getCenterListings()
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold">Trainer Directory</h1>
        <p className="text-sm text-slate-600">
          Browse by city/state, region, or ZIP distance. Pins are clustered and update with map
          bounds.
        </p>
      </div>
      <ResultsView trainerListings={trainerListings} centerListings={centerListings} />
    </div>
  );
}

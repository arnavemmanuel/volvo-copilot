import Card from "./Card";
import Skeleton from "./Skeleton";

export default function PageLoader() {
  return (
    <div className="space-y-6">

      <Card>
        <Skeleton className="h-10 w-72" />
        <Skeleton className="mt-4 h-6 w-96" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="mt-6 h-8 w-20" />
            <Skeleton className="mt-3 h-4 w-32" />
          </Card>
        ))}
      </div>

    </div>
  );
}
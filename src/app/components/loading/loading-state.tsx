import { Progress } from "@/components/ui/progress";

export const LoadingState: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <Progress value={30} className="w-1/2 mb-4" />
    <p className="text-sm text-muted-foreground">Carregando documento...</p>
  </div>
);

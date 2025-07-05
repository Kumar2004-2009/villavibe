import { FileQuestion } from "lucide-react";

interface IappProps {
  title: string;
  description: string;
}

export function NoItems({ description, title }: IappProps) {
  return (
    <div className="flex min-h-[300px] md:min-h-[400px] flex-col items-center justify-center rounded-md border border-white border-dashed p-6 md:p-8 text-center animate-in fade-in-50 mt-6 md:mt-10">
      <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-8 w-8 md:h-10 md:w-10 text-primary" />
      </div>
      <h2 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm md:text-sm leading-5 md:leading-6 text-white/80">
        {description}
      </p>
    </div>
  );
}
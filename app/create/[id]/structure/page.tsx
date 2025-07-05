import { createCategoryPage } from "@/app/action";
import { CreatioBottomBar } from "@/app/components/CreatioBottomBar";
import { SelctetCategory } from "@/app/components/SelctetCategory";

export default function StrucutreRoute({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-32"> {/* Added padding-bottom for bottom bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="w-full lg:w-3/5 mx-auto">
          <h2 className="text-2xl sm:text-3xl text-white font-semibold tracking-tight text-center lg:text-left">
            Which of these best describe your Home?
          </h2>
        </div>

        <form action={createCategoryPage}>
          <input type="hidden" name="homeId" value={params.id} />
          <SelctetCategory />
          <CreatioBottomBar />
        </form>
      </div>
    </div>
  );
}
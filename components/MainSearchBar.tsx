import SearchIcon from "@/components/SearchIcon";

export default function MainSearchBar() {
  return (
    <search className="block w-full">
      <div className="relative">
        <label htmlFor="main-search" className="sr-only">
          Rechercher une recette, un ingrédient
        </label>
        <input
          id="main-search"
          type="search"
          placeholder="Rechercher une recette, un ingrédient, ..."
          className="text-brand-black placeholder:text-brand-grey h-[72px] w-full rounded-[11px] bg-white pr-20 pl-[35px] text-base outline-none"
        />
        <span className="bg-brand-black pointer-events-none absolute top-[10px] right-[10px] flex size-[52px] items-center justify-center rounded-[10px] text-white">
          <SearchIcon className="size-6" />
        </span>
      </div>
    </search>
  );
}

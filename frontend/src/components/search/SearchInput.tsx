import { useTranslation } from "react-i18next";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
}: SearchInputProps) {
  const { t } = useTranslation();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white rounded-[22px] overflow-hidden border border-gray-300 focus-within:border-teal-400 focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.1)] transition-all">
        <div className="pl-5 text-gray-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("home.searchPlaceholder")}
          className="flex-1 px-3 py-4 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent"
        />
        {value.trim() && (
          <button
            onClick={onSubmit}
            className="mr-2.5 px-5 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-sm font-semibold rounded-2xl hover:shadow-md active:scale-95 transition-all"
          >
            {t("common.search")}
          </button>
        )}
      </div>
      <p className="mt-2.5 text-xs text-gray-500 text-center">
        {t("home.examples")}
      </p>
    </div>
  );
}

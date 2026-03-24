import { useTranslation } from "react-i18next";

export default function Disclaimer() {
  const { t } = useTranslation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#FAFAF8]/90 backdrop-blur-sm px-4 py-2.5">
      <p className="text-center text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
        {t("disclaimer.short")}
      </p>
    </footer>
  );
}

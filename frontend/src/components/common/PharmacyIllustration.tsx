export default function PharmacyIllustration() {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-44 h-44 rounded-3xl overflow-hidden flex items-center justify-center bg-[#FAFAF8]">
        <img
          src="/pharmacy-illustration.png"
          alt="AI Pharmacist"
          className="w-full h-full object-contain mix-blend-multiply"
          loading="eager"
        />
      </div>
    </div>
  );
}

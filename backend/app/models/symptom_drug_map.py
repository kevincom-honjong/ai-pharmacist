from sqlalchemy import String, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class SymptomDrugMap(Base):
    __tablename__ = "symptom_drug_map"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    symptom_id: Mapped[int] = mapped_column(ForeignKey("symptoms.id"), index=True)
    drug_id: Mapped[int] = mapped_column(ForeignKey("drugs.id"), index=True)
    relevance_score: Mapped[float] = mapped_column(Float, default=1.0)
    country_code: Mapped[str] = mapped_column(String(3), index=True)

    symptom: Mapped["Symptom"] = relationship(back_populates="drug_maps")
    drug: Mapped["Drug"] = relationship(back_populates="symptom_maps")

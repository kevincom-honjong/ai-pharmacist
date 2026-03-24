from datetime import datetime

from sqlalchemy import String, Text, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Drug(Base):
    __tablename__ = "drugs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name_local: Mapped[str] = mapped_column(String(200), index=True)
    name_en: Mapped[str] = mapped_column(String(200), index=True)
    active_ingredient: Mapped[str] = mapped_column(String(300))
    symptom_category: Mapped[str] = mapped_column(String(100), index=True)
    otc_status: Mapped[bool] = mapped_column(Boolean, default=True)
    dosage: Mapped[str | None] = mapped_column(Text)
    usage: Mapped[str | None] = mapped_column(Text)
    precautions: Mapped[str | None] = mapped_column(Text)
    side_effects: Mapped[str | None] = mapped_column(Text)
    country_code: Mapped[str] = mapped_column(
        String(3), ForeignKey("countries.country_code"), index=True
    )
    manufacturer: Mapped[str | None] = mapped_column(String(200))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    country: Mapped["Country"] = relationship(
        back_populates="drugs",
        foreign_keys=[country_code],
        primaryjoin="Drug.country_code == Country.country_code",
    )
    symptom_maps: Mapped[list["SymptomDrugMap"]] = relationship(back_populates="drug")

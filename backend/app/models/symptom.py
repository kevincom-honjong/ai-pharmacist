from datetime import datetime

from sqlalchemy import String, Integer, ForeignKey, DateTime, JSON, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Symptom(Base):
    __tablename__ = "symptoms"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name_local: Mapped[str] = mapped_column(String(200), index=True)
    name_en: Mapped[str] = mapped_column(String(200), index=True)
    category: Mapped[str] = mapped_column(String(100), index=True)
    severity_level: Mapped[int | None] = mapped_column(Integer)
    parent_symptom_id: Mapped[int | None] = mapped_column(
        ForeignKey("symptoms.id"), index=True
    )
    question_text: Mapped[str | None] = mapped_column(String(500))
    options: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    parent: Mapped["Symptom | None"] = relationship(
        back_populates="children", remote_side="Symptom.id"
    )
    children: Mapped[list["Symptom"]] = relationship(back_populates="parent")
    drug_maps: Mapped[list["SymptomDrugMap"]] = relationship(back_populates="symptom")

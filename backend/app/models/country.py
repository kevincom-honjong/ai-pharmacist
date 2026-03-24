from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Country(Base):
    __tablename__ = "countries"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    country_code: Mapped[str] = mapped_column(String(3), unique=True, index=True)
    country_name: Mapped[str] = mapped_column(String(100))
    language: Mapped[str] = mapped_column(String(10))
    regulation_level: Mapped[str | None] = mapped_column(String(50))
    otc_criteria: Mapped[str | None] = mapped_column(Text)
    currency: Mapped[str | None] = mapped_column(String(10))

    drugs: Mapped[list["Drug"]] = relationship(
        back_populates="country",
        foreign_keys="Drug.country_code",
        primaryjoin="Country.country_code == Drug.country_code",
    )

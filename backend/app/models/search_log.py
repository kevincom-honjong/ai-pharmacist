from datetime import datetime

from sqlalchemy import String, Text, JSON, DateTime, func
from sqlalchemy.dialects.postgresql import ARRAY, INTEGER
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base


class SearchLog(Base):
    __tablename__ = "search_logs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    session_id: Mapped[str] = mapped_column(String(100), index=True)
    input_text: Mapped[str | None] = mapped_column(Text)
    symptom_path: Mapped[dict | None] = mapped_column(JSON)
    result_drug_ids: Mapped[list[int] | None] = mapped_column(ARRAY(INTEGER))
    country_code: Mapped[str] = mapped_column(String(3), index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

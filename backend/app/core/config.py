from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "OTC Drug Info"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True

    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/otc_drug_db"

    DEFAULT_COUNTRY: str = "VN"
    SUPPORTED_LANGUAGES: list[str] = ["ko", "en", "vi"]

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()

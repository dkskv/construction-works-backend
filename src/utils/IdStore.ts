class IdStore {
  get contentSpreadsheetId() {
    return this.getStringFromEnv("CONTENT_SPREADSHEET_ID");
  }

  get serviceRequestsSpreadsheetId() {
    return this.getStringFromEnv("REQUESTS_SPREADSHEET_ID");
  }

  private getStringFromEnv(key: string) {
    const { [key]: value } = process.env;

    if (typeof value !== "string") {
      throw new Error(`String by key "${key}" not found in env`);
    }

    return value;
  }
}

export const idStore = new IdStore();

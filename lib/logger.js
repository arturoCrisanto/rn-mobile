// lib/logger.js
import { formatDate } from "./utils";

class Logger {
  constructor() {
    this.isDevelopment = __DEV__;
  }
  // this is to get the current timestamp in a readable format
  getTimestamp() {
    const now = new Date();
    const date = formatDate(now.toISOString());
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return `${date} ${time}`;
  }

  // this is to format the log message with timestamp and level
  formatMessage(level, ...args) {
    const timestamp = this.getTimestamp();
    return [`[${level}] [${timestamp}]`, ...args];
  }

  info(...args) {
    if (this.isDevelopment) {
      console.log(...this.formatMessage("INFO", ...args));
    }
  }

  warn(...args) {
    if (this.isDevelopment) {
      console.warn(...this.formatMessage("WARN", ...args));
    }
  }

  error(...args) {
    console.error(...this.formatMessage("ERROR", ...args));
  }

  debug(...args) {
    if (this.isDevelopment) {
      console.debug(...this.formatMessage("DEBUG", ...args));
    }
  }

  log(...args) {
    this.info(...args);
  }
}

// Export a singleton instance
export default new Logger();

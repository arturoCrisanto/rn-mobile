// lib/logger.js
import { formatDate } from "./utils";

/**
 * Custom logger that formats console logs with timestamps
 */
class Logger {
  constructor() {
    this.isDevelopment = __DEV__;
  }

  /**
   * Formats the current timestamp for logging
   * @returns {string} Formatted timestamp
   */
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

  /**
   * Formats the log message with timestamp and level
   * @param {string} level - Log level (INFO, WARN, ERROR, DEBUG)
   * @param {Array} args - Arguments to log
   */
  formatMessage(level, ...args) {
    const timestamp = this.getTimestamp();
    return [`[${timestamp}] [${level}]`, ...args];
  }

  /**
   * Log info messages
   * @param  {...any} args - Arguments to log
   */
  info(...args) {
    if (this.isDevelopment) {
      console.log(...this.formatMessage("INFO", ...args));
    }
  }

  /**
   * Log warning messages
   * @param  {...any} args - Arguments to log
   */
  warn(...args) {
    if (this.isDevelopment) {
      console.warn(...this.formatMessage("WARN", ...args));
    }
  }

  /**
   * Log error messages
   * @param  {...any} args - Arguments to log
   */
  error(...args) {
    console.error(...this.formatMessage("ERROR", ...args));
  }

  /**
   * Log debug messages
   * @param  {...any} args - Arguments to log
   */
  debug(...args) {
    if (this.isDevelopment) {
      console.debug(...this.formatMessage("DEBUG", ...args));
    }
  }

  /**
   * Log messages (alias for info)
   * @param  {...any} args - Arguments to log
   */
  log(...args) {
    this.info(...args);
  }
}

// Export a singleton instance
export default new Logger();

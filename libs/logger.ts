// logger.ts
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/libs/firebase";

export type LogLevel = "error" | "warning" | "info" | "debug";

// Reference to the logs collection in Firestore
const logsRef = collection(firestore, "logs");

// General logging function that writes a log entry to Firestore
const logEvent = async (
  level: LogLevel,
  message: string,
  metadata?: Record<string, any>
): Promise<void> => {
  try {
    await addDoc(logsRef, {
      level,
      message,
      metadata: metadata || {},
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error logging event: <${message}:${error}>`);
  }
};

// Logger object with methods for each log level
const logger = {
  error: (message: string, metadata?: Record<string, any>) =>
    logEvent("error", message, metadata),
  warning: (message: string, metadata?: Record<string, any>) =>
    logEvent("warning", message, metadata),
  info: (message: string, metadata?: Record<string, any>) =>
    logEvent("info", message, metadata),
  debug: (message: string, metadata?: Record<string, any>) =>
    logEvent("debug", message, metadata),
};

export default logger;

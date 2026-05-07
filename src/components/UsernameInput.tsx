"use client";

import {
  faCheck,
  faCircleNotch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import type { UsernameCheckReason } from "@/lib/usernameRules";

const REASON_MESSAGES: Record<UsernameCheckReason, string> = {
  empty: "Username is required",
  too_short: "Must be at least 3 characters",
  too_long: "Must be 30 characters or fewer",
  invalid: "Only lowercase letters, numbers, and underscores",
  reserved: "This username is reserved",
  taken: "This username is already taken",
};

type Status =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "available" }
  | { kind: "error"; message: string };

type Props = {
  defaultValue?: string;
  onValidityChange?: (valid: boolean) => void;
};

export default function UsernameInput({
  defaultValue = "",
  onValidityChange,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const initialValue = useRef(defaultValue);
  const validityCallback = useRef(onValidityChange);
  validityCallback.current = onValidityChange;

  useEffect(() => {
    const trimmed = value.trim();

    if (trimmed === initialValue.current) {
      setStatus({ kind: "idle" });
      validityCallback.current?.(true);
      return;
    }
    if (!trimmed) {
      setStatus({ kind: "idle" });
      validityCallback.current?.(true);
      return;
    }

    setStatus({ kind: "checking" });
    validityCallback.current?.(false);

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/users/check?username=${encodeURIComponent(trimmed)}`,
          { signal: ctrl.signal }
        );
        const data: { available: boolean; reason?: UsernameCheckReason } =
          await res.json();
        if (data.available) {
          setStatus({ kind: "available" });
          validityCallback.current?.(true);
        } else {
          setStatus({
            kind: "error",
            message:
              (data.reason && REASON_MESSAGES[data.reason]) ||
              "Invalid username",
          });
          validityCallback.current?.(false);
        }
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setStatus({ kind: "idle" });
          validityCallback.current?.(true);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [value]);

  return (
    <div>
      <label className="input-label" htmlFor="usernameIn">
        Username
      </label>
      <div className="relative">
        <input
          id="usernameIn"
          name="username"
          value={value}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
          type="text"
          placeholder="alex"
          autoComplete="off"
          spellCheck={false}
          className="pr-9"
        />
        {status.kind !== "idle" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {status.kind === "checking" && (
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="text-gray-400 animate-spin"
              />
            )}
            {status.kind === "available" && (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            )}
            {status.kind === "error" && (
              <FontAwesomeIcon icon={faXmark} className="text-red-500" />
            )}
          </span>
        )}
      </div>
      {status.kind === "error" && (
        <p className="text-xs text-red-500 mt-1 ml-1">{status.message}</p>
      )}
      {status.kind === "available" && (
        <p className="text-xs text-green-600 mt-1 ml-1">Available</p>
      )}
    </div>
  );
}

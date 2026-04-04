import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./debugMenu.css";

const cloneSettings = (value) => {
  if (!value || typeof value !== "object") {
    return value;
  }
  const result = Array.isArray(value) ? [] : {};
  for (const [key, val] of Object.entries(value)) {
    result[key] = cloneSettings(val);
  }
  return result;
};

const getPathValue = (obj, path) => {
  let current = obj;
  for (const part of path) {
    if (!current || typeof current !== "object") {
      return undefined;
    }
    current = current[part];
  }
  return current;
};

const setPathValue = (obj, path, value) => {
  let current = obj;
  for (let i = 0; i < path.length - 1; i += 1) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
};

const labelForPath = (path) => path.join(".");

const DebugMenu = ({ loggingSettings, onClose, updateLoggingSettings }) => {
  const [settings, setSettings] = useState(loggingSettings || {});

  useEffect(() => {
    setSettings(loggingSettings || {});
  }, [loggingSettings]);

  const toggleSetting = (path) => {
    const nextSettings = cloneSettings(settings);
    const currentValue = getPathValue(nextSettings, path);
    if (typeof currentValue !== "boolean") {
      return;
    }
    setPathValue(nextSettings, path, !currentValue);
    setSettings(nextSettings);
    if (updateLoggingSettings) {
      updateLoggingSettings(nextSettings);
    }
  };

  const renderGroup = (obj, path = []) => {
    return Object.entries(obj).map(([key, value]) => {
      const nextPath = [...path, key];
      if (typeof value === "boolean") {
        return (
          <Form.Check
            key={labelForPath(nextPath)}
            type="checkbox"
            className="debugMenuCheckbox"
            label={labelForPath(nextPath)}
            checked={value}
            onChange={() => toggleSetting(nextPath)}
          />
        );
      }
      if (value && typeof value === "object") {
        return (
          <div className="debugMenuGroup" key={labelForPath(nextPath)}>
            <div className="debugMenuGroupTitle">{labelForPath(nextPath)}</div>
            {renderGroup(value, nextPath)}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="debugMenuOverlay">
      <div className="debugMenuContainer">
        <div className="debugMenuHeader">
          <div className="debugMenuTitle">Debug Logs</div>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="debugMenuBody">{renderGroup(settings)}</div>
      </div>
    </div>
  );
};

export default DebugMenu;

import React, { useEffect, useState } from "react";
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

const collectGroupPaths = (obj, path = []) => {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object") {
      const nextPath = [...path, key];
      paths.push(labelForPath(nextPath));
      paths.push(...collectGroupPaths(value, nextPath));
    }
  }
  return paths;
};

const DebugMenu = ({ loggingSettings, onClose, updateLoggingSettings }) => {
  const [settings, setSettings] = useState(loggingSettings || {});
  const [collapsed, setCollapsed] = useState(() => {
    const initial = loggingSettings || {};
    return new Set(collectGroupPaths(initial));
  });

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

  const toggleCollapse = (path) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      const key = labelForPath(path);

      if (next.has(key)) {
        // Expanding this group — collapse sibling groups at the same level
        next.delete(key);
        const parentPath = path.slice(0, -1);
        const parentObj = getPathValue(settings, parentPath);
        if (parentObj && typeof parentObj === "object") {
          for (const [k, v] of Object.entries(parentObj)) {
            if (v && typeof v === "object") {
              const siblingKey = labelForPath([...parentPath, k]);
              if (siblingKey !== key) {
                next.add(siblingKey);
              }
            }
          }
        }
      } else {
        // Collapsing this group
        next.add(key);
      }

      return next;
    });
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
        const groupKey = labelForPath(nextPath);
        const isCollapsed = collapsed.has(groupKey);
        return (
          <div className="debugMenuGroup" key={groupKey}>
            <div className="debugMenuGroupTitle debugMenuGroupToggle" onClick={() => toggleCollapse(nextPath)}>
              <span className="debugMenuGroupArrow">{isCollapsed ? "\u25B6" : "\u25BC"}</span>
              {groupKey}
            </div>
            {!isCollapsed && renderGroup(value, nextPath)}
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
          <button className="debugMenuCloseBtn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="debugMenuBody">{renderGroup(settings)}</div>
      </div>
    </div>
  );
};

export default DebugMenu;

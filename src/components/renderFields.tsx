import React from "react";
import { Input } from "@/components/ui/input";

const renderInput = (key: string, value: any) => {
  switch (value.type) {
    case "hex":
      return (
        <Input
          type="text"
          defaultValue={value.defaultValue}
          placeholder="Enter hex color"
        />
      );
    case "number":
      return (
        <Input
          type="number"
          defaultValue={value.defaultValue}
          placeholder="Enter number"
        />
      );
    case "string":
      return (
        <Input
          type="text"
          defaultValue={value.defaultValue}
          placeholder="Enter text"
        />
      );
    case "alignment_select":
      return (
        <select defaultValue={value.defaultValue}>
          {value.options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
};

const renderFields = (fields: any) => {
  return Object.keys(fields).map((key) => {
    const value = fields[key];
    if (value && typeof value === "object" && "type" in value) {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {key}
          </label>
          {renderInput(key, value)}
        </div>
      );
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {key}
          </label>
          <div className="ml-4">{renderFields(value)}</div>
        </div>
      );
    } else {
      return null;
    }
  });
};

export default renderFields;

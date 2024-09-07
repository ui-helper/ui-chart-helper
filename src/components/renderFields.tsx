import React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const renderInput = (key: string, value: any) => {
  switch (value.type) {
    case "hex":
      return (
        <Input
          type="text"
          defaultValue={value.defaultValue}
          placeholder="Enter hex color"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      );
    case "number":
      return (
        <Input
          type="number"
          defaultValue={value.defaultValue}
          placeholder="Enter number"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      );
    case "string":
      return (
        <Input
          type="text"
          defaultValue={value.defaultValue}
          placeholder="Enter text"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      );
    case "alignment_select":
      return (
        <Select
          defaultValue={value.defaultValue}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          {value.options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      );
    default:
      return null;
  }
};

const getBackgroundColor = (depth: number) => {
  const colors = ["bg-[#ffc107]", "bg-secondary", "bg-muted", "bg-destructive"];
  return colors[depth % colors.length];
};

const renderFields = (fields: any, depth: number = 0) => {
  return Object.keys(fields).map((key) => {
    const value = fields[key];
    const backgroundColor = getBackgroundColor(depth);
    if (value && typeof value === "object" && "type" in value) {
      return (
        <div key={key} className="mb-6">
          <label
            className={`block text-sm font-semibold text-gray-800 mb-2 ${backgroundColor}`}
          >
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
        <div key={key} className="mb-6">
          <label
            className={`block text-sm font-semibold text-gray-800 mb-2 ${backgroundColor}`}
          >
            {key}
          </label>
          <div className="ml-6 border-l-2 border-gray-200 pl-4">
            {renderFields(value, depth + 1)}
          </div>
        </div>
      );
    } else {
      return null;
    }
  });
};

export default renderFields;

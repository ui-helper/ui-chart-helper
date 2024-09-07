import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const renderInput = (
  key: string,
  value: any,
  handleChange: (key: string, newValue: any) => void
) => {
  switch (value.type) {
    case "hex":
      return (
        <Input
          type="text"
          defaultValue={value.value}
          placeholder="Enter hex color"
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleChange(key, e.target.value)}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          defaultValue={value.value}
          placeholder="Enter number"
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleChange(key, e.target.value)}
        />
      );
    case "string":
      return (
        <Input
          type="text"
          defaultValue={value.value}
          placeholder="Enter text"
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleChange(key, e.target.value)}
        />
      );
    case "alignment_select":
      return (
        <div className="w-full p-2 border border-gray-300 rounded-md">
          <Select
            defaultValue={value.value}
            onValueChange={(newValue) => handleChange(key, newValue)}
          >
            <SelectTrigger>{value.value}</SelectTrigger>
            <SelectContent>
              {value.options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    case "alignment_radio":
      return (
        <RadioGroup
          defaultValue={value.value}
          onChange={(newValue) => handleChange(key, newValue)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm flex space-x-2"
        >
          {value.options.map((option: string, index: number) => (
            <div key={index} className="flex items-center">
              <RadioGroupItem
                value={option}
                id={`radio-${index}`}
                className="hidden"
              />
              <Label
                htmlFor={`radio-${index}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full cursor-pointer text-gray-700 font-medium transition duration-150 ease-in-out hover:bg-indigo-100 hover:border-indigo-300"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    default:
      return null;
  }
};

const getBackgroundColor = (depth: number) => {
  const colors = ["bg-[#ffc107]", "bg-secondary", "bg-muted", "bg-destructive"];
  return colors[depth % colors.length];
};

const renderFields = (
  fields: any,
  depth: number = 0,
  handleChange: (key: string, newValue: any) => void,
  parentKey: string = ""
) => {
  return Object.keys(fields).map((key) => {
    const value = fields[key];
    const backgroundColor = getBackgroundColor(depth);
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === "object" && "type" in value) {
      return (
        <div key={key} className="mb-6">
          <label
            className={`block text-sm font-semibold text-gray-800 mb-2 ${backgroundColor}`}
          >
            {key}
          </label>
          {renderInput(fullKey, value, handleChange)}
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
            {renderFields(value, depth + 1, handleChange, fullKey)}
          </div>
        </div>
      );
    } else {
      return null;
    }
  });
};

export default renderFields;

import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DatePickerSectionProps {
  handleYearChange: (year: number) => void;
  setSelectedYear: (year: number) => void;
}

const DatePickerSection: React.FC<DatePickerSectionProps> = ({
  handleYearChange,
  setSelectedYear,
}) => {
  return (
    <div className="picker">
      <p className="mb-4">Filter by year</p>
      <DatePicker
        views={["year"]}
        label="Year only"
        onChange={(newValue) => {
          handleYearChange(newValue.$y);
          setSelectedYear(newValue.$y);
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white", // Change the color of the icon
          },
        }}
      />
    </div>
  );
};

export default DatePickerSection;

import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import { BsCalendarFill } from "react-icons/bs";
import { forwardRef } from "react";
import { vi } from "date-fns/locale";

import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import DefaultImage from "../assets/images/default-img.png";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const Input = ({
  className,
  type = "text",
  placeHolder,
  onChange,
  onBlur,
  label,
  name,
  startValue,
  options,
  error,
  classNamePrefix,
  maxDate,
  minDate,
  isMulti,
  dateFormat = "dd/MM/yyyy",
  showMonthYearPicker = false,
  showYearPicker = false,
  icon,
}) => {
  if (type === "select")
    return (
      <div>
        <label className="font-semibold text-[1.4rem]" htmlFor={name}>
          {label}
        </label>
        <Select
          className={`mt-[0.6rem] text-[1.2rem] rounded-[0.4rem] font-medium ${className} ${
            error && "border border-danger"
          }`}
          isMulti={isMulti}
          classNamePrefix={classNamePrefix || "react-select"}
          // defaultValue={startValue}
          value={startValue}
          onChange={onChange}
          options={options}
          placeholder={placeHolder}
          id={name}
          name={name}
          onBlur={onBlur}
        />
        {error && <p className="text-danger text-[1.2rem]">{error}</p>}
      </div>
    );

  if (type === "date") {
    const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
      <button
        className={`bg-[#FAFBFD] rounded-[0.4rem] p-[1.4rem] text-[1.2rem] font-medium outline-none relative text-left text-text-color  flex gap-[0.4rem] items-center ${className}  ${
          error && "border border-danger"
        }`}
        onClick={onClick}
        onBlur={onBlur}
        ref={ref}
      >
        {value || placeHolder}
        {icon || (
          <BsCalendarFill
            className="absolute top-[50%] translate-y-[-50%] right-[1.4rem]"
            size={"1.4rem"}
            fill="#9FABC6"
          />
        )}
      </button>
    ));
    return (
      <div className="flex flex-col gap-[0.6rem]">
        {label && (
          <label className="font-semibold text-[1.4rem]" htmlFor={name}>
            {label}
          </label>
        )}
        <div>
          <ReactDatePicker
            selected={startValue}
            dateFormat={dateFormat}
            maxDate={maxDate}
            minDate={minDate}
            onChange={onChange}
            locale={vi}
            customInput={<CustomDateInput />}
            calendarClassName="shadow-md"
            showMonthYearPicker={showMonthYearPicker}
            showYearPicker={showYearPicker}
          />
        </div>
        {error && <p className="text-danger text-[1.2rem]">{error}</p>}
      </div>
    );
  }

  if (type === "image")
    return (
      <FilePond
        files={startValue}
        onupdatefiles={onChange}
        allowMultiple
        maxFiles={4}
        allowFileTypeValidation
        labelFileTypeNotAllowed="Vui lòng chọn hình ảnh"
        acceptedFileTypes={["image/png", "image/jpeg"]}
        labelIdle={`<img src=${DefaultImage}> <p>Kéo hình ảnh vào đây hoặc <span class="filepond--label-action">duyệt</span></p>`}
      />
    );

  if (type === "textarea")
    return (
      <div className="flex flex-col gap-[0.6rem]">
        <label className="font-semibold text-[1.4rem]" htmlFor={name}>
          {label}
        </label>
        <textarea
          className={`bg-[#FAFBFD] text-text-color placeholder:text-[#9FABC6] rounded-[0.4rem] p-[1.4rem] text-[1.2rem] font-medium outline-none ${className} ${
            error && "border border-danger"
          }`}
          name={name}
          onBlur={onBlur}
          id={name}
          onChange={onChange}
          placeholder={placeHolder}
          value={startValue}
        />
        {error && <p className="text-danger text-[1.2rem]">{error}</p>}
      </div>
    );
  return (
    <div className="flex flex-col gap-[0.6rem]">
      <label className="font-semibold text-[1.4rem]" htmlFor={name}>
        {label}
      </label>
      <input
        className={`bg-[#FAFBFD] text-text-color placeholder:text-[#9FABC6] rounded-[0.4rem] p-[1.4rem] text-[1.2rem] font-medium outline-none ${className} ${
          error && "border border-danger"
        }`}
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeHolder}
        value={startValue}
      />
      {error && <p className="text-danger text-[1.2rem]">{error}</p>}
    </div>
  );
};

export default Input;

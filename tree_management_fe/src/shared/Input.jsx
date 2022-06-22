import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { BsCalendarFill } from "react-icons/bs";
import { forwardRef } from "react";
import { vi } from "date-fns/locale";

// import { FilePond, registerPlugin } from "react-filepond";

// import "filepond/dist/filepond.min.css";
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// registerPlugin(
//   FilePondPluginImageExifOrientation,
//   FilePondPluginImagePreview,
//   FilePondPluginFileValidateType
// );

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
  isClearable = false,
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
            isClearable={isClearable}
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

  if (type === "image") {
    const id = new Date().toISOString() + classNamePrefix;
    // const url = startValue ? URL.createObjectURL(startValue) : "";
    let url = "";
    if (startValue && !startValue?.hinhAnh) {
      url = URL.createObjectURL(startValue);
    }
    if (startValue && startValue?.hinhAnh) {
      url = startValue.hinhAnh;
    }
    return (
      <div className="relative h-[100%]">
        <label
          htmlFor={id}
          style={{ backgroundImage: `url(${url})` }}
          className={`border-dashed border-primary h-[100%] flex justify-center items-center font-medium rounded-[0.6rem] text-[1.2rem] hover:bg-[#FAFBFD] transition-all duration-300 bg-center bg-no-repeat bg-cover ${
            !startValue && "border-2"
          }`}
        >
          {!startValue && "Chọn ảnh"}
        </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id={id}
          filename={startValue?.name}
          className="opacity-0 absolute"
          onChange={onChange}
        />
      </div>
    );
  }
  // return (
  //   <FilePond
  //     files={startValue}
  //     onupdatefiles={onChange}
  //     allowMultiple
  //     maxFiles={4}
  //     // server={"https://api.cloudinary.com/v1_1/tdimgclound01/image/upload"}
  //     allowFileTypeValidation
  //     // server={{
  //     //   process: (
  //     //     fieldName,
  //     //     file,
  //     //     metadata,
  //     //     load,
  //     //     error,
  //     //     progress,
  //     //     abort,
  //     //     transfer,
  //     //     options
  //     //   ) => {
  //     //     // fieldName is the name of the input field
  //     //     // file is the actual file object to send
  //     //     const formData = new FormData();
  //     //     formData.append("file", file, file.name);
  //     //     formData.append("upload_preset", "quanlycayxanh");
  //     //     const request = new XMLHttpRequest();
  //     //     request.open(
  //     //       "POST",
  //     //       "https://api.cloudinary.com/v1_1/tdimgclound01/image/upload"
  //     //     );

  //     //     // Should call the progress method to update the progress to 100% before calling load
  //     //     // Setting computable to false switches the loading indicator to infinite mode
  //     //     request.upload.onprogress = (e) => {
  //     //       progress(e.lengthComputable, e.loaded, e.total);
  //     //     };

  //     //     // Should call the load method when done and pass the returned server file id
  //     //     // this server file id is then used later on when reverting or restoring a file
  //     //     // so your server knows which file to return without exposing that info to the client
  //     //     request.onload = function () {
  //     //       if (request.status >= 200 && request.status < 300) {
  //     //         // the load method accepts either a string (id) or an object
  //     //         console.log(request.responseText);
  //     //         load(request.responseText);
  //     //       } else {
  //     //         // Can call the error method if something is wrong, should exit after
  //     //         error("oh no");
  //     //       }
  //     //     };

  //     //     request.send(formData);

  //     //     // Should expose an abort method so the request can be cancelled
  //     //     return {
  //     //       abort: () => {
  //     //         // This function is entered if the user has tapped the cancel button
  //     //         request.abort();

  //     //         // Let FilePond know the request has been cancelled
  //     //         abort();
  //     //       },
  //     //     };
  //     //   },
  //     // }}
  //     labelFileTypeNotAllowed="Vui lòng chọn hình ảnh"
  //     acceptedFileTypes={["image/png", "image/jpeg"]}
  //     labelIdle={`<img src=${DefaultImage}> <p>Kéo hình ảnh vào đây hoặc <span class="filepond--label-action">duyệt</span></p>`}
  //   />
  // );

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

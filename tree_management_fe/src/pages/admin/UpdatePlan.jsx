import Input from "../../shared/Input";
import React, { useEffect, useState } from "react";
import { format, differenceInDays } from "date-fns";
import { ImArrowRight2 } from "react-icons/im";
import {
  MdClear,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { treeList } from "../../services/treeServices";
import DefaultImg from "../../assets/images/default.jpg";
import { staffList } from "../../services/staffServices";
import { addPlan } from "../../services/planservices";
import { useNavigate } from "react-router-dom";
import FluentTaskListSquareLtr24Filled from "../../assets/icons/FluentTaskListSquareLtr24Filled";
import { buttonColor } from "../../config";
import Button from "../../shared/Button";
import { Context } from "../../Layout";

const UpdatePlan = () => {
  const { addNotification } = React.useContext(Context);
  const navigate = useNavigate();
  const [DSNhanVien, setDSNhanVien] = useState([]);
  const doUuTien = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
  ];

  const [DSCay, setDSCay] = useState([]);
  const [keHoach, setKeHoach] = useState({
    tenKeHoach: "",
    diaDiem: "",
    moTa: "",
    idNVPhuTrach: null,
    ngayBatDau: new Date(),
    ngayKetThuc: new Date(),
    doUuTien: doUuTien[0],
    DSCay: [],
    DSCongViec: [],
    touched: {
      tenKeHoach: false,
      diaDiem: false,
      moTa: false,
      // DSCay: false,
      idNVPhuTrach: false,
    },
  });
  const [congViec, setCongViec] = useState({
    tenCV: "",
    ngayBatDau: new Date(),
    ngayKetThuc: new Date(),
    DSNhanVien: [],
    touched: {
      tenCV: false,
      DSNhanVien: false,
      ngayBatDau: false,
      ngayKetThuc: false,
    },
  });
  const [openTreeSelect, setOpenTreeSelect] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      const dsCay = await treeList(1, true);
      const dsNV = await staffList();
      setDSCay(dsCay);
      setDSNhanVien(dsNV.map(({ id, tenNV }) => ({ label: tenNV, value: id })));
    };
    fetchData();
  }, []);

  const onBlur = (name, setSate) => () => {
    setSate((prev) => {
      return { ...prev, touched: { ...prev.touched, [name]: true } };
    });
  };

  const onChange = (setState, type, name) => (data) => {
    if (type === "select") {
      // const { value } = data;
      setState((prev) => ({ ...prev, [name]: data }));
      return;
    }

    if (type === "select-multi") {
      // const valueList = data.map(({ value }) => value);
      // setState((prev) => ({ ...prev, [name]: valueList }));
      setState((prev) => ({ ...prev, [name]: data }));
      return;
    }
    if (type === "date") {
      setState((prev) => ({ ...prev, [name]: data }));
      return;
    }

    const {
      target: { value },
    } = data;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeTreeList = (id) => () => {
    const isExists = keHoach.DSCay.includes(id);
    const ListId = [...keHoach.DSCay, id];
    const isOver = DSCay.length === ListId.length;

    isExists &&
      setKeHoach({
        ...keHoach,
        DSCay: keHoach.DSCay.filter((_id) => _id !== id),
      });
    !isExists && setKeHoach({ ...keHoach, DSCay: ListId });
    isOver && setOpenTreeSelect(false);
  };

  const ThemCongViec = () => {
    const { touched, ngayBatDau, ngayKetThuc, ...newCV } = congViec;

    const newKH = {
      ...keHoach,
      DSCongViec: [
        ...keHoach.DSCongViec,
        {
          ...newCV,
          id: new Date().toISOString(),
          ngayBatDau: format(ngayBatDau, "yyyy-MM-dd"),
          ngayKetThuc: format(ngayKetThuc, "yyyy-MM-dd"),
        },
      ],
    };

    setKeHoach(newKH);
    setCongViec({
      tenCV: "",
      ngayBatDau: new Date(),
      ngayKetThuc: new Date(),
      DSNhanVien: [],
      touched: {
        tenCV: false,
        DSNhanVien: false,
        ngayBatDau: false,
        ngayKetThuc: false,
      },
    });
  };

  const XoaCongViec = (idCV) => () => {
    setKeHoach((keHoach) => ({
      ...keHoach,
      DSCongViec: keHoach.DSCongViec.filter(({ id }) => idCV !== id),
    }));
  };

  const ThemKeHoach = async () => {
    const { touched, ngayBatDau, ngayKetThuc, doUuTien, DSCongViec, ...attrs } =
      keHoach;
    const keHoachMoi = {
      ...attrs,
      doUuTien: doUuTien.value,
      ngayBatDau: format(ngayBatDau, "yyyy-MM-dd"),
      ngayKetThuc: format(ngayKetThuc, "yyyy-MM-dd"),
      DSCongViec: DSCongViec.map(({ DSNhanVien, id, ...cv }) => ({
        ...cv,
        DSNhanVien: DSNhanVien.map(({ value }) => value),
      })),
    };
    console.log(keHoachMoi);
    const res = await addPlan(keHoachMoi);
    console.log(res);
    addNotification("Th??nh c??ng", "Th??m k??? ho???ch m???i th??nh c??ng!");
    navigate(-1);
  };

  const validate = () => {
    const {
      tenKeHoach,
      moTa,
      // DSCay,
      DSCongViec,
      diaDiem,
      ngayBatDau,
      ngayKetThuc,
      idNVPhuTrach,
    } = keHoach;

    const {
      tenKeHoach: t,
      moTa: m,
      // DSCay: dsc,
      diaDiem: d,
      idNVPhuTrach: tnv,
    } = keHoach.touched;

    return {
      etenKeHoach: t && !tenKeHoach ? "H??y nh???p t??n k??? ho???ch" : "",
      emoTa: m && !moTa ? "H??y nh???p m?? t???" : "",
      ediaDiem: d && !diaDiem ? "H??y nh???p ?????a ??i???m" : "",
      // eDSCay: dsc && !DSCay.length ? "H??y th??m ??t nh???t 1 c??y" : "",
      eidNVPhuTrach: tnv && !idNVPhuTrach ? "H??y ch???n nh??n vi??n ph??? tr??ch" : "",
      eDSCongViec: !DSCongViec.length ? "H??y th??m c??ng vi???c" : "",
      eKHNBD:
        differenceInDays(ngayKetThuc, ngayBatDau) < 0
          ? "Ng??y b???t ?????u ph???i nh??? h??n ng??y k???t th??c"
          : "",
      eKHNKT:
        differenceInDays(ngayKetThuc, ngayBatDau) < 0
          ? "Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u"
          : "",
    };
  };

  const validateCongViec = () => {
    const {
      tenCV,
      DSNhanVien,
      ngayBatDau: cv_bd,
      ngayKetThuc: cv_kt,
    } = congViec;
    const { tenCV: tcv, DSNhanVien: dsnv } = congViec.touched;
    return {
      etenCV: tcv && !tenCV ? "H??y nh???p t??n c??ng vi???c" : "",
      eDSNhanVien:
        dsnv && !DSNhanVien.length ? "H??y ch???n nh??n vi??n th???c hi???n" : "",
      eCVBD:
        differenceInDays(cv_kt, cv_bd) < 0
          ? "Ng??y b???t ?????u ph???i nh??? h??n ng??y k???t th??c"
          : "",
      eCVKT:
        differenceInDays(cv_kt, cv_bd) < 0
          ? "Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u"
          : "",
    };
  };

  const {
    etenKeHoach,
    emoTa,
    eDSCay,
    eidNVPhuTrach,
    eDSCongViec,
    ediaDiem,
    eKHNKT,
    eKHNBD,
  } = validate();
  const { etenCV, eDSNhanVien, eCVBD, eCVKT } = validateCongViec();

  return (
    <div className="p-2">
      <div className="flex justify-between items-center p-1 border rounded-t-[2.5rem] border-border-color ">
        <div className="flex gap-1 items-center">
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <FluentTaskListSquareLtr24Filled size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Qu???n l?? k??? ho???ch</h2>
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <ImArrowRight2 size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">C???p nh???t k??? ho???ch</h2>
        </div>
        <div>
          {
            <Button
              type={
                Object.values(keHoach.touched).some((touched) => !touched) ||
                Object.values(validate()).some((err) => err) ||
                !keHoach.DSCongViec.length
                  ? "disable"
                  : "solid"
              }
              text="L??u"
              onClick={ThemKeHoach}
              icon={<MdSave size={"2rem"} fill="#fff" />}
            />
          }
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 border border-border-color p-2 border-y-0">
        <div className="flex flex-col gap-[1.4rem]">
          <Input
            name="tenKeHoach"
            placeHolder="??i???n t??n k??? ho???ch"
            label=" T??n k??? ho???ch"
            onChange={onChange(setKeHoach, "text", "tenKeHoach")}
            startValue={keHoach.tenKeHoach}
            onBlur={onBlur("tenKeHoach", setKeHoach)}
            error={etenKeHoach}
          />
          <Input
            type="textarea"
            name="moTa"
            placeHolder="??i???n m?? t??? k??? ho???ch"
            label="M?? t???"
            onChange={onChange(setKeHoach, "text", "moTa")}
            startValue={keHoach.moTa}
            className="resize-y min-h-[13.2rem]"
            onBlur={onBlur("moTa", setKeHoach)}
            error={emoTa}
          />
          <Input
            type="select"
            name="idNVPhuTrach"
            onChange={onChange(setKeHoach, "select", "idNVPhuTrach")}
            options={DSNhanVien}
            placeHolder="Ch???n nh??n vi??n ph??? tr??ch"
            label="Nh??n vi??n ph??? tr??ch"
            onBlur={onBlur("idNVPhuTrach", setKeHoach)}
            error={eidNVPhuTrach}
          />
        </div>
        <div className="flex flex-col gap-[1.4rem]">
          <Input
            name="diaDiem"
            placeHolder="??i???n ?????a ??i???m"
            label="?????a ??i???m"
            onChange={onChange(setKeHoach, "text", "diaDiem")}
            startValue={keHoach.diaDiem}
            onBlur={onBlur("diaDiem", setKeHoach)}
            error={ediaDiem}
          />
          <Input
            type="select"
            name="doUuTien"
            onChange={onChange(setKeHoach, "select", "doUuTien")}
            options={doUuTien}
            placeHolder="????? ??u ti??n"
            label="????? ??u ti??n"
            startValue={keHoach.doUuTien}
            // error={sauBenhErrors.mucDo}
          />
          <Input
            type="date"
            label="Ng??y b???t ?????u"
            startValue={keHoach.ngayBatDau}
            onChange={onChange(setKeHoach, "date", "ngayBatDau")}
            className="w-[100%]"
            error={eKHNBD}
            minDate={new Date()}
          />
          <Input
            type="date"
            label="Ng??y k???t th??c"
            startValue={keHoach.ngayKetThuc}
            onChange={onChange(setKeHoach, "date", "ngayKetThuc")}
            className="w-[100%]"
            minDate={new Date()}
            error={eKHNKT}
          />
        </div>
        <div className="flex flex-col gap-[1.4rem]">
          <div className="relative">
            <label className="font-semibold text-[1.4rem]">C??y xanh</label>
            <button
              onClick={() => {
                setOpenTreeSelect(!openTreeSelect);
              }}
              // onBlur={onBlur("DSCay", setKeHoach)}
              className={`bg-[#FAFBFD] mt-[0.6rem] rounded-[0.4rem] px-[1.4rem] py-[1.1rem] text-[1.2rem] font-medium outline-none relative text-left text-[#9FABC6] flex justify-between items-center w-[100%] }`}
            >
              Ch???n c??y xanh <MdKeyboardArrowDown size={24} fill={buttonColor} />
            </button>

            <CSSTransition
              in={openTreeSelect}
              timeout={300}
              classNames="dialog-slide-up"
              unmountOnExit
            >
              <ul className="absolute min-w-[100%] top-[120%] left-[50%] translate-x-[-50%] bg-white shadow-lg max-h-[300px] overflow-y-auto rounded-[0.6rem] py-1">
                {DSCay.filter(({ id }) => !keHoach.DSCay.includes(id)).map(
                  ({ id, tenCay, hinhAnh, viTri }) => (
                    <li
                      key={id}
                      className="flex gap-1 p-1 border-b border-border-color hover:bg-slate-50 transition-all duration-300"
                      onClick={onChangeTreeList(id)}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${hinhAnh || DefaultImg})`,
                        }}
                        className="rounded-[1rem] h-[5rem] w-[5rem] bg-center bg-no-repeat bg-cover shadow-lg"
                      ></div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[1.2rem] font-semibold">{`${id} - ${tenCay}`}</h3>
                        <p className="font-medium">{viTri}</p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </CSSTransition>
          </div>
          <div>
            <h2 className="font-semibold text-[1.4rem] inline-block">
              Danh s??ch c??y xanh
            </h2>{" "}
            <ul className="min-w-[100%] bg-white max-h-[300px] overflow-y-auto rounded-[0.6rem] pt-1">
              {DSCay.filter(({ id }) => keHoach.DSCay.includes(id)).map(
                ({ id, tenCay, hinhAnh, viTri }) => (
                  <li
                    key={id}
                    className="flex justify-between p-1 border-b border-border-color hover:bg-slate-50 transition-all duration-300"
                  >
                    <div className="flex gap-1">
                      <div
                        style={{
                          backgroundImage: `url(${hinhAnh || DefaultImg})`,
                        }}
                        className="rounded-[1rem] h-[5rem] w-[5rem] bg-center bg-no-repeat bg-cover shadow-lg"
                      ></div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[1.2rem] font-semibold">{`${id} - ${tenCay}`}</h3>
                        <p className="font-medium">{viTri}</p>
                      </div>
                    </div>
                    <button className="p-1" onClick={onChangeTreeList(id)}>
                      <MdClear size={20} />
                    </button>
                  </li>
                )
              )}
            </ul>
            {keHoach.DSCay.length === 0 && !keHoach.touched.DSCay && (
              <p className="text-center font-medium text-[1.2rem] border-b border-border-color py-1">
                Tr???ng
              </p>
            )}
            {/* {eDSCay && (
              <p className="ml-[0.6rem] text-danger text-center text-[1.2rem]  border-b border-border-color py-1">
                {eDSCay}
              </p>
            )} */}
          </div>
        </div>
      </div>
      <div className="border border-border-color p-2 border-t-0 rounded-b-[2.5rem]">
        <div className="border-t border-border-color grid grid-cols-[390px_1fr] gap-2 pt-3">
          <div className="flex flex-col gap-[1.4rem]">
            <Input
              name="tenCV"
              placeHolder="??i???n t??n c??ng vi???c"
              label=" T??n c??ng vi???c"
              onChange={onChange(setCongViec, "text", "tenCV")}
              startValue={congViec.tenCV}
              onBlur={onBlur("tenCV", setCongViec)}
              error={etenCV}
            />
            <Input
              type="date"
              label="Ng??y b???t ?????u"
              startValue={congViec.ngayBatDau}
              onChange={onChange(setCongViec, "date", "ngayBatDau")}
              className="w-[100%]"
              onBlur={onBlur("ngayBatDau", setCongViec)}
              error={eCVBD}
              minDate={keHoach.ngayBatDau}
              maxDate={keHoach.ngayKetThuc}
            />
            <Input
              type="date"
              label="Ng??y k???t th??c"
              startValue={congViec.ngayKetThuc}
              onChange={onChange(setCongViec, "date", "ngayKetThuc")}
              className="w-[100%]"
              onBlur={onBlur("ngayKetThuc", setCongViec)}
              error={eCVKT}
              minDate={keHoach.ngayBatDau}
              maxDate={keHoach.ngayKetThuc}
            />
            <Input
              type="select"
              name="DSNhanVien"
              onChange={onChange(setCongViec, "select-multi", "DSNhanVien")}
              options={DSNhanVien}
              isMulti
              placeHolder="Ch???n nh??n vi??n th???c hi???n"
              label="Nh??n vi??n th???c hi???n"
              onBlur={onBlur("DSNhanVien", setCongViec)}
              error={eDSNhanVien}
              startValue={congViec.DSNhanVien}
            />
            <div className="flex justify-end">
              {
                <Button
                  type={
                    !congViec.touched.tenCV ||
                    !congViec.touched.DSNhanVien ||
                    Object.values(validateCongViec()).some((err) => err)
                      ? "disable"
                      : "solid"
                  }
                  text="Th??m"
                  onClick={ThemCongViec}
                  icon={<MdSave size={"2rem"} fill="#fff" />}
                />
              }
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-[1.4rem]">Danh s??ch c??ng vi???c</h2>
            <table className="w-[100%] mt-[0.6rem]">
              <thead className="bg-[#F7F8FA]">
                <tr>
                  <th className="py-[1.4rem] px-1 text-[1.2rem] text-left">
                    T??n k??? ho???ch
                  </th>
                  <th className="py-[1.4rem] text-[1.2rem] text-left">
                    Danh s??ch nh??n vi??n
                  </th>
                  <th className="py-[1.4rem] text-[1.2rem]">B???t ?????u</th>
                  <th className="py-[1.4rem] text-[1.2rem]">K???t th??c</th>
                  <th className="py-[1.4rem] text-[1.2rem]">#</th>
                </tr>
              </thead>
              <tbody>
                {keHoach.DSCongViec.map(
                  (
                    { id, tenCV, DSNhanVien, ngayBatDau, ngayKetThuc },
                    index
                  ) => {
                    // const DSNV = DSNhanVien.map(({ label, value }) => {
                    //   return dsnv.includes(value) ? label : null;
                    // }).filter((item) => item);
                    const DSNV = DSNhanVien.map(({ label, value }) => label);
                    const [y_s, m_s, d_s] = ngayBatDau.split("-");
                    const [y_e, m_e, d_e] = ngayKetThuc.split("-");

                    return (
                      <tr
                        className="font-semibold border-b border-border-color"
                        key={index}
                      >
                        <td className="py-[1.6rem] text-[1.2rem] pl-1">
                          {tenCV}
                        </td>
                        <td className="py-[1.6rem] text-[1.2rem] ">
                          {DSNV.join(", ")}
                        </td>
                        <td className="text-center py-[1.6rem] text-[1.2rem]">
                          {`${d_s}/${m_s}/${y_s}`}
                        </td>
                        <td className="text-center py-[1.6rem] text-[1.2rem]">
                          {`${d_e}/${m_e}/${y_e}`}
                        </td>
                        <td className="text-center py-[1.6rem] text-[1.2rem] pr-1">
                          <button className="ml-1">
                            <MdDelete size={18} onClick={XoaCongViec(id)} />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {Object.values(validateCongViec()).every((err) => !err) &&
              keHoach.DSCongViec.length === 0 && (
                <p className="text-center font-medium text-[1.2rem] p-2 border-b border-border-color">
                  Tr???ng
                </p>
              )}
            {eDSCongViec &&
              keHoach.DSCongViec.length === 0 &&
              Object.values(validateCongViec()).some((err) => err) && (
                <p className="ml-[0.6rem] text-danger text-center text-[1.2rem] p-2 border-b border-border-colorp-2 border-b border-border-color">
                  {eDSCongViec}
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlan;

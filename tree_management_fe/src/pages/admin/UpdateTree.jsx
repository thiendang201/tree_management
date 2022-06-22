import { MdSave } from "react-icons/md";
import { ImArrowRight2 } from "react-icons/im";
import { useState } from "react";

import FluentTreeDeciduous20Filled from "../../assets/icons/FluentTreeDeciduous20Filled";
import { buttonColor } from "../../config";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { useEffect } from "react";
import { getTree, treeCategoryList, update } from "../../services/treeServices";
import { format } from "date-fns";
import React from "react";
import { Context } from "../../Layout";
import { useNavigate, useParams } from "react-router";
import { uploadImg } from "../../services/services";
import Pest from "../../components/pest/Pest";

const UpdateTree = () => {
  const { id } = useParams();
  const mucDo = [
    { value: "1", label: "Nhẹ" },
    { value: "2", label: "Vừa" },
    { value: "3", label: "Nặng" },
  ];
  const { addNotification } = React.useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [treeCategories, setTreeCategories] = useState([]);
  const [tree, setTree] = useState({
    idLoaiCay: null,
    tenCay: "",
    ngayTrong: new Date(),
    viTri: "",
    AnhCay: [],
    AnhCay1: "",
    AnhCay2: "",
    AnhCay3: "",
    AnhCay4: "",
    tinhTrangSauBenh: [],
    touched: {
      tenCay: false,
      viTri: false,
    },
  });

  useEffect(() => {
    async function fetchData() {
      const [tree] = await getTree(id);

      for (let i = 0; i < tree.images.length; i++) {
        tree["AnhCay" + (i + 1)] = tree.images[i];
      }
      for (let i = 0; i < tree.pests.length; i++) {
        for (let j = 0; j < tree.pests[i].images.length; j++) {
          tree.pests[i]["AnhSauBenh" + (j + 1)] = tree.pests[i].images[j];
        }
        tree.pests[i].AnhSauBenh = tree.images;

        const [y, m, d] = tree.pests[i].ngayPhatBenh.split("-");
        tree.pests[i].ngayPhatBenh = new Date(y, m - 1, d);

        if (tree.pests[i].ngayHet) {
          const [y, m, d] = tree.pests[i].ngayHet.split("-");
          tree.pests[i].ngayHet = new Date(y, m - 1, d);
        }
      }
      const [y, m, d] = tree.ngayTrong.split("-");
      tree.ngayTrong = new Date(y, m - 1, d);
      tree.tinhTrangSauBenh = tree.pests;
      tree.AnhCay = tree.images;
      tree.dsIdSauBenh = tree.pests.map(({ id }) => id);

      setTree((prev) => ({
        ...prev,
        ...tree,
        touched: {
          tenCay: true,
          viTri: true,
        },
      }));
    }
    fetchData();
  }, []);

  console.log(tree);

  const [sauBenh, setSauBenh] = useState({
    id: new Date().toISOString(),
    tenBenh: "",
    mucDo: mucDo[0].value,
    moTa: "",
    ngayPhatBenh: new Date(),
    ngayHet: null,
    AnhSauBenh: [],
    AnhSauBenh1: "",
    AnhSauBenh2: "",
    AnhSauBenh3: "",
    AnhSauBenh4: "",
    touched: {
      tenBenh: false,
      moTa: false,
    },
  });

  useEffect(() => {
    const fetchData = async function () {
      let categories = await treeCategoryList();
      categories = categories.map(({ id, tenLoaiCay }) => ({
        label: tenLoaiCay,
        value: id,
      }));
      setTreeCategories(categories);
    };
    fetchData();
  }, []);

  const onChange = (setState, type, name) => (data) => {
    if (type === "select") {
      const { value } = data;
      setState((prev) => ({ ...prev, [name]: value }));
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
    if (type === "image") {
      const {
        target: { files },
      } = data;
      setState((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    const {
      target: { value },
    } = data;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const ThemBenh = () => {
    setTree({ ...tree, tinhTrangSauBenh: [...tree.tinhTrangSauBenh, sauBenh] });
    setSauBenh({
      id: new Date().toISOString(),
      tenBenh: "",
      mucDo: mucDo[0].value,
      moTa: "",
      ngayPhatBenh: new Date(),
      ngayHet: null,
      AnhSauBenh: [],
      AnhSauBenh1: "",
      AnhSauBenh2: "",
      AnhSauBenh3: "",
      AnhSauBenh4: "",
      touched: {
        tenBenh: false,
        moTa: false,
      },
    });
  };

  const upload = async (files) => {
    const res = await Promise.all(
      files.map((file) => {
        if (file?.hinhAnh) return file?.hinhAnh;
        console.log(22, file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "quanlycayxanh");
        return uploadImg(formData);
      })
    );
    return res.map((item) => {
      if (typeof item === "string") return item;
      const {
        data: { url },
      } = item;
      return url;
    });
  };

  const xoaSauBenh = (id) => (e) => {
    const { tinhTrangSauBenh: list } = tree;

    setTree({
      ...tree,
      tinhTrangSauBenh: list.filter(({ id: _id }) => _id !== id),
    });
  };

  const capNhatCay = async () => {
    setLoading(true);
    let {
      ngayTrong,
      AnhCay,
      AnhCay1,
      AnhCay2,
      AnhCay3,
      AnhCay4,
      tinhTrangSauBenh,
      touched,
      ...khac
    } = tree;

    ngayTrong = format(ngayTrong, "yyyy-MM-dd");
    for (let i = 0; i < tinhTrangSauBenh.length; i++) {
      let {
        AnhSauBenh,
        AnhSauBenh1,
        AnhSauBenh2,
        AnhSauBenh3,
        AnhSauBenh4,
        ngayPhatBenh,
        ngayHet,
      } = tinhTrangSauBenh[i];

      AnhSauBenh = [AnhSauBenh1, AnhSauBenh2, AnhSauBenh3, AnhSauBenh4].filter(
        (anh) => anh
      );
      upload(AnhSauBenh).then((values) => {
        tinhTrangSauBenh[i].AnhSauBenh = values;
        tinhTrangSauBenh[i].ngayPhatBenh = format(ngayPhatBenh, "yyyy-MM-dd");
        tinhTrangSauBenh[i].ngayHet = ngayHet
          ? format(ngayHet, "yyyy-MM-dd")
          : ngayHet;
      });
    }

    upload([AnhCay1, AnhCay2, AnhCay3, AnhCay4].filter((item) => item)).then(
      async (values) => {
        const cayMoi = { ...khac, ngayTrong, tinhTrangSauBenh, AnhCay: values };
        const res = await update(cayMoi);
        addNotification("Thành công", "Cập nhật cây thành công!");
        navigate(-1);
      }
    );
  };

  const onBlur = (name, setState) => (e) => {
    // setSauBenh({ ...sauBenh, touched: { ...sauBenh.touched, [name]: true } });
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const validateTree = () => {
    const { touched, tenCay, viTri } = tree;

    return {
      etenCay: touched.tenCay && !tenCay ? "Hãy nhập tên cây" : "",
      eviTri: touched.viTri && !viTri ? "Hãy nhập vị trí" : "",
    };
  };

  const validateSauBenh = () => {
    const errors = {
      tenBenh: "",
      moTa: "",
    };

    if (sauBenh.touched.tenBenh && !sauBenh.tenBenh)
      errors.tenBenh = "Vui lòng nhập tên bệnh!";
    if (sauBenh.touched.moTa && !sauBenh.moTa)
      errors.moTa = "Vui lòng nhập mô tả!";

    return errors;
  };

  // console.log(tree.tinhTrangSauBenh);
  // console.log(tree);
  // console.log(JSON.stringify(tree));
  // console.log(sauBenh);

  const sauBenhErrors = validateSauBenh();
  const treeErrors = validateTree();

  return (
    <div className="p-[2rem] pb-0">
      <div className="flex justify-between items-center p-1 border rounded-t-[2.5rem] border-border-color ">
        <div className="flex gap-1 items-center">
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <FluentTreeDeciduous20Filled size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Quản lý cây xanh</h2>
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <ImArrowRight2 size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Cập nhật cây xanh</h2>
        </div>
        <div>
          {!loading && (
            <Button
              type={
                Object.values(tree.touched).some((touched) => !touched) ||
                Object.values(treeErrors).some((err) => err)
                  ? "disable"
                  : "solid"
              }
              text="Lưu"
              onClick={capNhatCay}
              icon={<MdSave size={"2rem"} fill="#fff" />}
            />
          )}
          {loading && <Button type="loading" />}
        </div>
      </div>
      <div className="grid grid-cols-[66%_34%] min-h-content border border-border-color border-t-0">
        <div className="p-2">
          <div>
            <div className="flex items-center py-2 px-[2rem] border rounded-t-[2.5rem] border-border-color">
              <h2 className="text-[1.4rem] font-semibold">Hình ảnh</h2>
            </div>
            <div className="border border-border-color border-t-0 rounded-b-[2.5rem] p-2 tree-img grid grid-cols-3 grid-rows-2 min-h-[30rem] gap-1">
              <div className="row-[1/3]">
                <Input
                  classNamePrefix="AnhCay1"
                  type="image"
                  startValue={tree.AnhCay1}
                  onChange={onChange(setTree, "image", "AnhCay1")}
                />
              </div>
              <div className="row-[1/3]">
                <Input
                  classNamePrefix="AnhCay2"
                  type="image"
                  startValue={tree.AnhCay2}
                  onChange={onChange(setTree, "image", "AnhCay2")}
                />
              </div>
              <div>
                <Input
                  classNamePrefix="AnhCay3"
                  type="image"
                  startValue={tree.AnhCay3}
                  onChange={onChange(setTree, "image", "AnhCay3")}
                />
              </div>
              <div>
                <Input
                  classNamePrefix="AnhCay4"
                  type="image"
                  startValue={tree.AnhCay4}
                  onChange={onChange(setTree, "image", "AnhCay4")}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center py-2 px-[2rem] border rounded-t-[2.5rem] border-border-color mt-2">
              <h2 className="text-[1.4rem] font-semibold">
                Tình trạng sâu bệnh
              </h2>
            </div>
            <div className="border border-border-color border-t-0 rounded-b-[2.5rem] p-2 ">
              <div className="grid grid-cols-2 gap-x-1 gap-y-2">
                <Input
                  name="tenBenh"
                  placeHolder="Điền tên bệnh"
                  label=" Tên bệnh"
                  onChange={onChange(setSauBenh, "text", "tenBenh")}
                  onBlur={onBlur("tenBenh", setSauBenh)}
                  error={sauBenhErrors.tenBenh}
                  startValue={sauBenh.tenBenh}
                />
                <Input
                  type="select"
                  name="mucDo"
                  onChange={onChange(setSauBenh, "select", "mucDo")}
                  startValue={
                    mucDo.find(({ value }) => value === sauBenh.mucDo) || null
                  }
                  options={mucDo}
                  placeHolder="Chọn mức độ"
                  label="Mức độ"
                  // onBlur={onBlurSauBenh("mucDo")}
                  error={sauBenhErrors.mucDo}
                />
                <div className="col-span-2">
                  <Input
                    type="textarea"
                    name="moTa"
                    placeHolder="Điền mô tả tình trạng bệnh"
                    label="Mô tả"
                    className="resize-y min-h-[16rem]"
                    onChange={onChange(setSauBenh, "text", "moTa")}
                    onBlur={onBlur("moTa", setSauBenh)}
                    error={sauBenhErrors.moTa}
                    startValue={sauBenh.moTa}
                  />
                </div>
                <Input
                  type="date"
                  label="Ngày phát bệnh"
                  startValue={sauBenh.ngayPhatBenh}
                  onChange={onChange(setSauBenh, "date", "ngayPhatBenh")}
                  maxDate={new Date()}
                  className="w-[100%]"
                />
                <Input
                  type="date"
                  label="Ngày hết"
                  startValue={sauBenh.ngayHet}
                  onChange={onChange(setSauBenh, "date", "ngayHet")}
                  isClearable
                  className="w-[100%]"
                  minDate={sauBenh.ngayPhatBenh}
                  placeHolder="Chọn ngày"
                />
                <div className="col-span-2">
                  <label className="font-semibold text-[1.4rem]">
                    Hình ảnh
                  </label>
                  <div className="min-h-[20rem] p-1 mt-[0.6rem] pest-img rounded-[0.4rem] grid grid-cols-4 gap-1">
                    <div>
                      <Input
                        classNamePrefix="AnhSauBenh1"
                        type="image"
                        startValue={sauBenh.AnhSauBenh1}
                        onChange={onChange(setSauBenh, "image", "AnhSauBenh1")}
                      />
                    </div>
                    <div>
                      <Input
                        classNamePrefix="AnhSauBenh2"
                        type="image"
                        startValue={sauBenh.AnhSauBenh2}
                        onChange={onChange(setSauBenh, "image", "AnhSauBenh2")}
                      />
                    </div>
                    <div>
                      <Input
                        classNamePrefix="AnhSauBenh3"
                        type="image"
                        startValue={sauBenh.AnhSauBenh3}
                        onChange={onChange(setSauBenh, "image", "AnhSauBenh3")}
                      />
                    </div>
                    <div>
                      <Input
                        classNamePrefix="AnhSauBenh4"
                        type="image"
                        startValue={sauBenh.AnhSauBenh4}
                        onChange={onChange(setSauBenh, "image", "AnhSauBenh4")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                {Object.values(sauBenh.touched).some((touched) => !touched) ||
                Object.values(sauBenhErrors).some((err) => err) ? (
                  <Button
                    type="disable"
                    text="Thêm"
                    icon={<MdSave size={"2rem"} fill="#fff" />}
                  />
                ) : (
                  <Button
                    text="Thêm"
                    onClick={ThemBenh}
                    icon={<MdSave size={"2rem"} fill="#fff" />}
                  />
                )}
              </div>
              <div>
                <h2 className="text-[1.4rem] font-semibold border-t border-border-color py-2 mt-2">
                  Lịch sử sâu bệnh
                </h2>
                <div className="flex flex-col gap-2">
                  {tree.tinhTrangSauBenh.length === 0 ? (
                    <p className="text-[1.2rem] font-medium text-center">
                      Cây chưa bị sâu bệnh!
                    </p>
                  ) : (
                    tree.tinhTrangSauBenh.map((sauBenh, index) => (
                      <Pest
                        key={index}
                        {...sauBenh}
                        onRemove={xoaSauBenh(sauBenh.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-l border-border-color pt-4 px-2">
          <div className="sticky top-[7.8rem] flex flex-col gap-3">
            <Input
              type="select"
              name="idLoaiCay"
              onChange={onChange(setTree, "select", "idLoaiCay")}
              options={treeCategories}
              placeHolder="Chọn loại cây"
              label="Loại cây"
              startValue={treeCategories.find(
                ({ value }) => value === tree.idLoaiCay
              )}
            />
            <Input
              name="tenCay"
              placeHolder="Điền tên cây"
              label=" Tên cây"
              startValue={tree.tenCay}
              onChange={onChange(setTree, "text", "tenCay")}
              onBlur={onBlur("tenCay", setTree)}
              error={treeErrors.etenCay}
            />
            <Input
              type="date"
              label="Ngày trồng"
              startValue={tree.ngayTrong}
              onChange={onChange(setTree, "date", "ngayTrong")}
              className="w-[100%]"
            />
            <Input
              name="viTri"
              placeHolder="Điền vị trí"
              label="Vị trí"
              onChange={onChange(setTree, "text", "viTri")}
              onBlur={onBlur("viTri", setTree)}
              error={treeErrors.eviTri}
              startValue={tree.viTri}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTree;

INSERT INTO `LoaiCay` (`id`, `tenLoaiCay`, `loaiRe`, `loaiThan`, `loaiLa`, `moTa`, `created_at`, `updated_at`) VALUES
(1, 'Cây cọ', 'rễ tốt, bám chặt vào mặt đất', 'thân cây cảnh nhỏ lớn chậm', 'tán rộng và xanh', 'Có kích thước cao tầm 0,5 – 2m , thân cây cảnh nhỏ lớn chậm, các tán rộng và xanh. Đối với các cây cọ lùn, chiều cao cây chỉ khoảng 1m trở lại, hệ tán khá phát triển.\nNhững chiếc lá cọ xòe to có hình giống như chiếc quạt. Khi lá quá lớn những thùy sẽ công hướng xuống mặt đất.\nLá cọ mọc thành cụm trông rất đẹp mắt. Lá non có màu xanh nhạt, rồi chuyển sang xanh đậm khi về già. Lá cọ khô có thể dùng lợp nhà hoạc trang trí.\nCứ sau một vòng đời lá, thân cọ sẽ có thêm 1 vòng mặt sẹo cọ. Bởi đó chính là các cành lá già tự rụng hoặc chặt đi.', NULL, NULL),
(2, 'Cây họ dầu', 'rễ trần', 'cây thân gỗ', NULL, NULL, NULL, NULL),
(3, 'Cây nhiệt đới', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Cây họ bàng\r\n', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Cây lá rộng', NULL, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `CayXanh` (`id`, `tenCay`, `viTri`, `ngayTrong`, `trangThai`, `idLoaiCay`, `created_at`, `updated_at`) VALUES
(1, 'Cây sao đen', 'Hải Châu', '2022-06-09 20:10:18', '1', 2, NULL, NULL),
(2, 'Cây hoa sữa', 'Hải Châu', '2022-06-09 20:10:18', '1', 3, NULL, NULL),
(3, 'Cây phượng vĩ', 'Hải Châu', '2022-06-09 20:10:18', '1', 3, NULL, NULL),
(4, 'Cây lim sét', 'Hải Châu', '2022-06-09 20:10:18', '1', 5, NULL, NULL),
(5, 'Cây cọ dầu', 'Hải Châu', '2022-06-09 20:10:18', '1', 2, NULL, NULL);

INSERT INTO `TinhTrangSauBenh` (`id`, `tenBenh`, `moTa`, `mucDo`, `ngayPhatBenh`, `ngayHet`, `idCay`, `created_at`, `updated_at`) VALUES
(1, 'Bệnh thán thư', 'Bệnh có thể gây hại các bộ phận cây như lá, hoa quả, chồi và cành non. Dấu hiệu bệnh: thường xuất hiện những đốm màu nâu, vết bệnh phát triển lớn lên và liên kết nhau làm khô cháy các mảng lá khiến lá cây bị vàng úa, đọt và chồi non bị xoắn lại, hoa bị khô đen, trái non bị thối và rụng, cây sinh trưởng kém.\r\n\r\nĐể phòng và trị bệnh hại cây trồng này, bạn cần vệ sinh vườn cây trồng, cắt tỉa các tán lá ở gần gốc thân tạo độ thông thoáng, giúp cây nhận được nhiều ánh sáng và hạn chế sự phát triển của bệnh. Tưới đủ nước cho cây, vào mùa mưa thì chú ý làm đất vun gốc tránh để đất quá ẩm ướt. Chú ý bón đầy đủ phân và cân đối NPK. Khi xuất hiện bệnh có thể dùng luân phiên một trong những loại thuốc như: Propineb (Antracol 70WP), Thiophanate-Methyl (Topsin-M 70WP), Benomyl, Bordeaux, Zineb (Vi Ben-C 50WP, Copper-B 75WP), Carbendazim, Difenocanazole, Tebuconazole.', '1', '2022-06-09 20:18:22', '0000-00-00 00:00:00', 5, NULL, NULL),
(2, 'Bệnh mốc xám', 'Bệnh mốc xám có tên gọi khoa học là Botrytis cinerea Persoon, có thể gây hại cho lá, cành, hoa. Bộ phận bị bệnh sẽ thối rửa và biến thành màu nâu. Trong điều kiện ẩm ướt, bộ phận bị bệnh xuất hiện lớp mốc màu xám. Thân cây bị bệnh có thể bị thối gãy, trường hợp nghiêm trọng cây có thể bị chết khô. Khi cây mắc bệnh, cần phải hạ nhiệt độ kịp thời, đặt cây ở nơi thoáng gió. Cây trồng nhiều năm, bón phân nitơ quá nhiều, trồng quá dày, thiếu ánh sáng, không thoát nước bệnh sẽ rất nặng. Ta thường gặp bệnh này trên cây hoa hồng, cây hoa sữa.\r\n\r\nKỹ thuật phòng trừ: cần khử trùng đất trước lúc trồng. Phun thuốc: Zineb 0.2% hoặc Daconil 0.2%, 10 ngày phun 1 lần, phun 2 ~ 3 lần.', '1', '2022-06-09 20:21:42', '0000-00-00 00:00:00', 2, NULL, NULL);

INSERT INTO `Quyen` (`tenQuyen`) VALUES	
(N'Admin'),
(N'Quản lý'),
(N'Nhân viên');

INSERT INTO `NhanVien` (`tenNV`, `hinhAnh`, `CCCD`, `ngaySinh`, `SDT`, `email`, `diaChi`, `gioiTinh`, `trangThai`, `password`) VALUES
(N'Nguyễn Văn Anh',' ','263742934745','1998/03/04','0905426782','vananh@gmail.com', N'Quảng Nam',N'Nam',1,'a'),
(N'Nguyễn Thị Minh',' ','162537472534','1998/09/04','0237842384','thiminh@gmail.com', N'Đà Nẵng',N'Nữ',1,'a'),
(N'Trần Văn Nam',' ','671375127357','1998/06/04','0236462734','vannam@gmail.com', N'Quảng Nam',N'Nam',1,'a'),
(N'Nguyễn Ánh',' ','781232187368','1998/12/04','0263547234','nguyenanh@gmail.com', N'Đà Nẵng',N'Nữ',1,'a'),
(N'Võ Văn Kỳ',' ','871236872631','1998/03/04','0123182376','vanky@gmail.com', N'Quảng Nam',N'Nam',1,'a');

INSERT INTO `KeHoach` (`tenKeHoach`, `moTa`, `diaDiem`, `ngayBatDau`, `ngayKetThuc`, `doUuTien`, `idNVPhuTrach`, `trangThai`) VALUES	
(N'Tiả cây đón bão',N'Tiến hành cắt tỉa cây xanh đề phòng bão',N'Phường Hòa Thuận Tây','2022/04/26','2022/04/30',4,1,3),
(N'Cắt tỉa cây đường Ông Ích Khiêm',N'Tiến hành cắt tỉa cây xanh lấn đường',N'Đường Ông Ích Khiêm','2022/05/01','2022/05/04',3,2,3),
(N'Trồng thêm cây xanh cho đường Cao Thắng',N'Trồng thêm các cây xanh tạo bóng mát',N'Đường Cao Thắng','2022/05/07','2022/05/14',3,3,2),
(N'Dọn dẹp cây sau bão',N'Tiến hành dọn dẹp cây xanh gãy do bão',N'Đường Nguyễn Tất Thành','2022/05/05','2022/05/10',5,2,1),
(N'Tiả cây đón bão',N'Tiến hành cắt tỉa cây xanh đề phòng bão',N'Phường Thanh Bình','2022/06/01','2022/06/10',4,1,1);


-- ﻿INSERT INTO CongViec(tenCongViec, moTaTienDo, ngayBatDau, ngayKetThuc, ngayHoanThanh, idKeHoach) VALUES 
-- 		(N'Tỉa cây đón bão', N'Tiến hành cắt tỉa cây xanh đề phòng chống bão tại các tuyến đường trên 7,5m, công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '13/02/2022','17/02/2022','15/02/2022',1),
-- 		(N'Trồng thêm cây', N'Tiến hành trồng thêm cây xanh ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '13/02/2022','17/02/2022','15/02/2022',2),
-- 		(N'Tỉa cây', N'Tiến hành tỉa cây xanh ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '13/02/2022','17/02/2022','15/02/2022',3),
-- 		(N'Chăm sóc cây', N'Tiến hành chăm sóc cây xanh ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '13/02/2022','17/02/2022','15/02/2022',4),
-- 		(N'Đốn cây trồng cây mới', N'Tiến hành dốn cây trồng cây mới ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '13/02/2022','17/02/2022','15/02/2022',5);

INSERT INTO `CongViec` (`tenCV`, `moTaTienDo`, `ngayBatDau`, `ngayKetThuc`, `ngayHoanThanh`, `idKeHoach`) VALUES 
		(N'Tỉa cây đón bão', N'Tiến hành cắt tỉa cây xanh đề phòng chống bão tại các tuyến đường trên 7,5m, công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '2022/02/13','2022/02/17','2022/02/15',1),
		(N'Trồng thêm cây', N'Tiến hành trồng thêm cây xanh ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '2022/02/13','2022/02/17','2022/02/15',2),
		(N'Tỉa cây', N'Tiến hành tỉa cây xanh ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '2022/02/13','2022/02/17','2022/02/15',3),
		(N'Chăm sóc cây', N'Tiến hành chăm sóc cây xanh ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '2022/02/13','2022/02/17','2022/02/15',4),
		(N'Đốn cây trồng cây mới', N'Tiến hành dốn cây trồng cây mới ở công viên, vườn hoa, đài tưởng niệm trên địa bàn phường Hòa Thuận Tây,quận Hải Châu.', '2022/02/13','2022/02/17','2022/02/15',5);


INSERT INTO `KeHoachCayXanh` (`idCay`, `idKeHoach`) VALUES 
		(1, 1),
		(2, 2),
		(3, 3),
		(4, 4),
		(5, 5);

INSERT INTO `NVThucHien` (`idCV`, `idNV`) VALUES 
		(1, 1),
		(1, 2),
		(1, 3),
		(2, 4),
		(2, 5);

INSERT INTO `suCo` (`tieuDe`, `loaiSuCo`, `moTa`, `idCay`, `trangThai`) VALUES 
		(N'Ngã cây', N'Ngã Cây', N'Hai cây bị ngã chắn ngang đường',1,0),
		(N'Gãy cành', N'Gãy cành', N'Cây xanh bị gãy cành dễ dẫn đến nguy hiểm cho người qua lại',2,1),
		(N'Ngã cây', N'Ngã Cây', N'Hai cây bị ngã chắn ngang đường',3,0),
		(N'Gãy cành', N'Gãy cành', N'Cây xanh bị gãy cành dễ dẫn đến nguy hiểm cho người qua lại',4,0),
		(N'Ngã cây', N'Ngã Cây', N'Hai cây bị ngã chắn ngang đường',5,0);

DROP TRIGGER IF EXISTS tg_after_update_work;
DELIMITER $$
CREATE TRIGGER tg_after_update_work
AFTER UPDATE
ON congviec
FOR EACH ROW
BEGIN
    DECLARE plan_id INT;
    DECLARE count_work INT;
    DECLARE count_work_finished INT;
    DECLARE count_work_overdued INT;
    DECLARE count_work_planned INT;
    SET plan_id = congviec.idKeHoach;
    SET count_work = (SELECT COUNT(congviec.ngayHoanThanh) FROM congviec WHERE congviec.idKeHoach = plan_id);
    SET count_work_finished = (SELECT COUNT(congviec.ngayHoanThanh) FROM congviec WHERE congviec.idKeHoach = plan_id AND congviec.ngayHoanThanh IS NOT NULL);
    SET count_work_overdued = (SELECT COUNT(congviec.ngayHoanThanh) FROM congviec WHERE congviec.idKeHoach = plan_id AND congviec.ngayHoanThanh IS NOT NULL AND DATEDIFF(congviec.ngayHoanThanh, congviec.ngayKetThuc) > 0);
    SET count_work_planned = (SELECT COUNT(congviec.ngayHoanThanh) FROM congviec WHERE congviec.idKeHoach = plan_id AND congviec.ngayHoanThanh IS NULL);
    -- IF (DATEDIFF(date_end, CURRENT_DATE))
    IF (count_work=count_work_finished) THEN
    	IF (count_work_overdued>0) THEN
    		UPDATE kehoach
    		SET trangThai = '0';
        ELSE 
        	UPDATE kehoach
            SET trangThai = '1';
	END IF;
    ELSEIF (count_work = count_work_planned) THEN
    	UPDATE kehoach
        SET trangThai = '3';
    ELSE 
    	UPDATE kehoach
        SET trangThai = '2';
	END IF;
END$$
DELIMITER ;


DROP PROCEDURE if exists TimKiemCayXanh;
DROP PROCEDURE if exists ThongKeCayXanh;

DELIMITER $$
CREATE PROCEDURE TimKiemCayXanh (
    IN tuKhoa NVARCHAR(255),
    IN viTri NVARCHAR(255), 
    IN tuoi INT,
    IN idLoaiCay INT
)
BEGIN
    SELECT 
        *
    FROM
        trees
    WHERE
        name LIKE CONCAT('%', tuKhoa, '%')
        AND position like CONCAT('%', viTri, '%')
        AND timestampdiff(YEAR, planted_date, date(now())) >= tuoi
        AND tree_category_id = idLoaiCay;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE ThongKeCayXanh (
    IN tinhTrang CHAR(1),
    IN viTri NVARCHAR(255), 
    IN tuoi INT,
    IN idLoaiCay INT
)
BEGIN
    IF  tinhTrang = '1' THEN 
        SELECT 
            *
        FROM
            trees t
        JOIN 
            pest_statuses p ON t.id = p.tree_id
            AND p.cured_date is null 
        WHERE
            position like CONCAT('%', viTri, '%')
            AND timestampdiff(YEAR, planted_date, date(now())) >= tuoi
            AND tree_category_id = idLoaiCay;
    ELSE
        SELECT 
            *
        FROM
            trees t
        WHERE
            position like CONCAT('%', viTri, '%')
            AND timestampdiff(YEAR, planted_date, date(now())) >= tuoi
            AND tree_category_id = idLoaiCay
            AND t.id not in (select tree_id from pest_statuses p where p.cured_date is null);
    END IF;
END$$
DELIMITER ;


-- CALL TimKiemCayXanh(N'cây', N'Hải Châu', 1, 3);
CALL ThongKeCayXanh('0', N'Hải Châu', 1, 3);


DROP PROCEDURE IF EXISTS statistic_trouble;
DELIMITER $$
CREATE PROCEDURE statistic_trouble
(
    IN created_year INT(11)
)
BEGIN
	SELECT * FROM `suco` WHERE YEAR(`suco`.`created_at`) = created_year;
END$$ 
DELIMITER ;

-- CALL statistic_trouble(2021)


-- SELECT * FROM `kehoach` WHERE `kehoach`.`trangThai`='1' AND MONTH(`kehoach`.`ngayBatDau`)=5 AND YEAR(`kehoach`.`ngayBatDau`)=2022;


DROP PROCEDURE IF EXISTS statistic_plan;
DELIMITER $$
CREATE PROCEDURE statistic_plan
(
    IN created_month INT(11),
    IN created_year INT(11),
    IN status_plan VARCHAR(1)
)
BEGIN
	SELECT `kehoach`.*, `nhanvien`.`tenNV`
    FROM `kehoach`, `nhanvien`
	WHERE `kehoach`.`idNVPhuTrach`=`nhanvien`.`id` AND
		`kehoach`.`trangThai`=status_plan AND 
		MONTH(`kehoach`.`ngayBatDau`)=created_month AND 
		YEAR(`kehoach`.`ngayBatDau`)=created_year;
END$$ 
DELIMITER ;

-- CALL statistic_plan(5, 2021, '1')

DROP PROCEDURE IF EXISTS get_staff_execute_by_plan_id;
DELIMITER $$
CREATE PROCEDURE get_staff_execute_by_plan_id
(
    IN plan_id INT(11)
)
BEGIN
	SELECT `kehoach`.`id` ,`nhanvien`.`tenNV`
    FROM `kehoach`, `nhanvien`, `congviec`, `nvthuchien`
	WHERE `kehoach`.`id`=`congviec`.`idKeHoach` AND
    	`congviec`.`id`=`nvthuchien`.`idCV` AND
        `nhanvien`.`id`=`nvthuchien`.`idNV` AND
        `kehoach`.`id`=plan_id;
END$$ 
DELIMITER ;

-- CALL get_staff_execute_by_plan_id(1)
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 17, 2022 lúc 06:23 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tree_management_01`
--
create database if not exists tree_management;
use tree_management;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `anhcay`
--

CREATE TABLE `anhcay` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hinhAnh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idCay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `anhsaubenh`
--

CREATE TABLE `anhsaubenh` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hinhAnh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idSauBenh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cayxanh`
--

CREATE TABLE `cayxanh` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenCay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `viTri` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngayTrong` date DEFAULT NULL,
  `trangThai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idLoaiCay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cayxanh`
--

INSERT INTO `cayxanh` (`id`, `tenCay`, `viTri`, `ngayTrong`, `trangThai`, `idLoaiCay`, `created_at`, `updated_at`) VALUES
('CX2', 'test api create 1', 'Hải Châu', '2022-06-09', '1', 'LC1', '2022-06-16 21:16:05', '2022-06-16 21:16:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `congviec`
--

CREATE TABLE `congviec` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenCV` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moTaTienDo` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngayBatDau` date DEFAULT NULL,
  `ngayKetThuc` date DEFAULT NULL,
  `ngayHoanThanh` date DEFAULT NULL,
  `idKeHoach` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kehoach`
--

CREATE TABLE `kehoach` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenKeHoach` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moTa` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diaDiem` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngayBatDau` date DEFAULT NULL,
  `ngayKetThuc` date DEFAULT NULL,
  `doUuTien` int(11) DEFAULT NULL,
  `idNVPhuTrach` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trangThai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kehoachcayxanh`
--

CREATE TABLE `kehoachcayxanh` (
  `idCay` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idKeHoach` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaicay`
--

CREATE TABLE `loaicay` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenLoaiCay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loaiRe` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loaiThan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loaiLa` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moTa` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaicay`
--

INSERT INTO `loaicay` (`id`, `tenLoaiCay`, `loaiRe`, `loaiThan`, `loaiLa`, `moTa`, `created_at`, `updated_at`) VALUES
('LC1', 'Cây họ bàng', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_NhanVien_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_06_13_032013_create_quyen', 1),
(6, '2022_06_13_032150_update_nhan_vien', 1),
(7, '2022_06_13_032623_create_loai_cay', 1),
(8, '2022_06_13_032835_create_cay_xanh', 1),
(9, '2022_06_13_033445_create_tinh_trang_sau_benh', 1),
(10, '2022_06_13_033454_create_su_co', 1),
(11, '2022_06_13_033508_create_ke_hoach', 1),
(12, '2022_06_13_033521_create_cong_viec', 1),
(13, '2022_06_13_033545_create_n_v_thuc_hien', 1),
(14, '2022_06_13_033607_create_ke_hoach_cay_xanh', 1),
(15, '2022_06_13_033626_create_anh_cay', 1),
(16, '2022_06_13_033636_create_anh_sau_benh', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenNV` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hinhAnh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CCCD` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngaySinh` date DEFAULT NULL,
  `SDT` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `diaChi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gioiTinh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `trangThai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idQuyen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nvthuchien`
--

CREATE TABLE `nvthuchien` (
  `idCV` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idNV` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyen`
--

CREATE TABLE `quyen` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenQuyen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `suco`
--

CREATE TABLE `suco` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tieuDe` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loaiSuCo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moTa` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hinhAnh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trangThai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idCay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tinhtrangsaubenh`
--

CREATE TABLE `tinhtrangsaubenh` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenBenh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moTa` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mucDo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngayPhatBenh` date DEFAULT NULL,
  `ngayHet` date DEFAULT NULL,
  `idCay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `anhcay`
--
ALTER TABLE `anhcay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anhcay_idcay_foreign` (`idCay`);

--
-- Chỉ mục cho bảng `anhsaubenh`
--
ALTER TABLE `anhsaubenh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anhsaubenh_idsaubenh_foreign` (`idSauBenh`);

--
-- Chỉ mục cho bảng `cayxanh`
--
ALTER TABLE `cayxanh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cayxanh_idloaicay_foreign` (`idLoaiCay`);

--
-- Chỉ mục cho bảng `congviec`
--
ALTER TABLE `congviec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `congviec_idkehoach_foreign` (`idKeHoach`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `kehoach`
--
ALTER TABLE `kehoach`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kehoach_idnvphutrach_foreign` (`idNVPhuTrach`);

--
-- Chỉ mục cho bảng `kehoachcayxanh`
--
ALTER TABLE `kehoachcayxanh`
  ADD PRIMARY KEY (`idCay`,`idKeHoach`),
  ADD KEY `kehoachcayxanh_idkehoach_foreign` (`idKeHoach`);

--
-- Chỉ mục cho bảng `loaicay`
--
ALTER TABLE `loaicay`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nhanvien_email_unique` (`email`),
  ADD KEY `nhanvien_idquyen_foreign` (`idQuyen`);

--
-- Chỉ mục cho bảng `nvthuchien`
--
ALTER TABLE `nvthuchien`
  ADD PRIMARY KEY (`idCV`,`idNV`),
  ADD KEY `nvthuchien_idnv_foreign` (`idNV`);

--
-- Chỉ mục cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `suco`
--
ALTER TABLE `suco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suco_idcay_foreign` (`idCay`);

--
-- Chỉ mục cho bảng `tinhtrangsaubenh`
--
ALTER TABLE `tinhtrangsaubenh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tinhtrangsaubenh_idcay_foreign` (`idCay`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `anhcay`
--
ALTER TABLE `anhcay`
  ADD CONSTRAINT `anhcay_idcay_foreign` FOREIGN KEY (`idCay`) REFERENCES `cayxanh` (`id`);

--
-- Các ràng buộc cho bảng `anhsaubenh`
--
ALTER TABLE `anhsaubenh`
  ADD CONSTRAINT `anhsaubenh_idsaubenh_foreign` FOREIGN KEY (`idSauBenh`) REFERENCES `tinhtrangsaubenh` (`id`);

--
-- Các ràng buộc cho bảng `cayxanh`
--
ALTER TABLE `cayxanh`
  ADD CONSTRAINT `cayxanh_idloaicay_foreign` FOREIGN KEY (`idLoaiCay`) REFERENCES `loaicay` (`id`);

--
-- Các ràng buộc cho bảng `congviec`
--
ALTER TABLE `congviec`
  ADD CONSTRAINT `congviec_idkehoach_foreign` FOREIGN KEY (`idKeHoach`) REFERENCES `kehoach` (`id`);

--
-- Các ràng buộc cho bảng `kehoach`
--
ALTER TABLE `kehoach`
  ADD CONSTRAINT `kehoach_idnvphutrach_foreign` FOREIGN KEY (`idNVPhuTrach`) REFERENCES `nhanvien` (`id`);

--
-- Các ràng buộc cho bảng `kehoachcayxanh`
--
ALTER TABLE `kehoachcayxanh`
  ADD CONSTRAINT `kehoachcayxanh_idcay_foreign` FOREIGN KEY (`idCay`) REFERENCES `cayxanh` (`id`),
  ADD CONSTRAINT `kehoachcayxanh_idkehoach_foreign` FOREIGN KEY (`idKeHoach`) REFERENCES `kehoach` (`id`);

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `nhanvien_idquyen_foreign` FOREIGN KEY (`idQuyen`) REFERENCES `quyen` (`id`);

--
-- Các ràng buộc cho bảng `nvthuchien`
--
ALTER TABLE `nvthuchien`
  ADD CONSTRAINT `nvthuchien_idcv_foreign` FOREIGN KEY (`idCV`) REFERENCES `congviec` (`id`),
  ADD CONSTRAINT `nvthuchien_idnv_foreign` FOREIGN KEY (`idNV`) REFERENCES `nhanvien` (`id`);

--
-- Các ràng buộc cho bảng `suco`
--
ALTER TABLE `suco`
  ADD CONSTRAINT `suco_idcay_foreign` FOREIGN KEY (`idCay`) REFERENCES `cayxanh` (`id`);

--
-- Các ràng buộc cho bảng `tinhtrangsaubenh`
--
ALTER TABLE `tinhtrangsaubenh`
  ADD CONSTRAINT `tinhtrangsaubenh_idcay_foreign` FOREIGN KEY (`idCay`) REFERENCES `cayxanh` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

const errorMessages = {
  1404: "Không tìm thấy dữ liệu.",
  1401: "Bạn không có quyền truy cập.",
  1400: "Người dùng đã tồn tại.",
  1402: "Lỗi khóa công khai.",
  1403: "Có lỗi xảy ra, vui lòng đăng nhập lại.",
  1405: "Tài khoản chưa được đăng ký.",
  1406: "Token làm mới đã hết hạn.",
  1407: "Token làm mới không hợp lệ.",
  1408: "Token không hợp lệ.",
  1409: "Bạn không có quyền thực hiện hành động này.",
  1410: "Mật khẩu không được để trống.",
  1411: "Mật khẩu không đúng, vui lòng thử lại!",
  1412: "Số điện thoại đã được sử dụng.",
  1413: "Không tìm thấy token làm mới.",
  1414: "Bạn không đủ tiền.",
  1415: "Xe đã được trả.",
  1416: "Tọa độ không hợp lệ.",
  1417: "Bạn không ở trong trạm xe.",
  1418: "Xe đã được thuê trước đó.",
  1419: "Bạn đang thuê xe khác. Vui lòng trả xe để có thể thuê xe mới !",
};

export const getErrorMessage = (code: keyof typeof errorMessages) => {
  return errorMessages[code] || "Có lỗi xảy ra, vui lòng thử lại.";
};

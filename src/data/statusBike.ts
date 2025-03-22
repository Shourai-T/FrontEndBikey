const statusBike = {
    available: 'Sẵn sàng',
    inuse: 'Đang sử dụng',
    maintenance: 'Bảo trì',
};

export const getBikeStatus = (code: keyof typeof statusBike) => {
    return statusBike[code];
};
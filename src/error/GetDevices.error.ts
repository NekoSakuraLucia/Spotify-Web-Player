const getDevicesError = (status: number): string => {
    let ErrorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์';
    switch (status) {
        case 401:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์: ไม่ได้รับอนุญาต สาเหตุอาจเกิดจากการหมดอายุของ token หรือไม่ได้รับอนุญาต';
            break;
        case 403:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์: การเข้าถึงถูกปฏิเสธ อาจเป็นเพราะไม่มีการอนุญาตให้เข้าถึงข้อมูลนี้';
            break;
        case 429:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์: มีการร้องขอเกินขีดจำกัด อาจต้องรอสักครู่ก่อนลองใหม่';
            break;
        default:
            ErrorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์: ไม่ทราบสาเหตุ';
            break;
    }

    return ErrorMessage;
};

export { getDevicesError };

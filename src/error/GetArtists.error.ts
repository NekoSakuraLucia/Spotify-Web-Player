const getArtistsErorr = (status: number): string => {
    let ErrorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน';
    switch (status) {
        case 401:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน: ไม่ได้รับอนุญาต สาเหตุอาจเกิดจากการหมดอายุของ token หรือไม่ได้รับอนุญาต';
            break;
        case 403:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน: การเข้าถึงถูกปฏิเสธ อาจเป็นเพราะไม่มีสิทธิ์เข้าถึงข้อมูลนี้';
            break;
        case 429:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน: มีการร้องขอเกินขีดจำกัด อาจต้องรอสักครู่ก่อนลองใหม่';
            break;
        default:
            ErrorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน: ไม่ทราบสาเหตุ';
            break;
    }

    return ErrorMessage;
};

export { getArtistsErorr };

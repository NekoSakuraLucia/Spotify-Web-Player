const getUserError = (status: number): string => {
    let ErrorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้';
    switch (status) {
        case 401:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้: ไม่อนุญาต สาเหตุอาจเกิดจากการหมดอายุของ token หรือไม่ได้รับอนุญาต';
            break;
        case 403:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้: การเข้าถึงถูกปฏิเสธ อาจเป็นเพราะไม่มีสิทธิ์เข้าถึงข้อมูลนี้';
            break;
        case 429:
            ErrorMessage =
                'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้: มีการร้องขอเกินขีดจำกัด อาจต้องรอสักครู่ก่อนลองใหม่';
            break;
        default:
            ErrorMessage = 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้: ไม่ทราบสาเหตุ';
            break;
    }

    return ErrorMessage;
};

export { getUserError };

const getRecentlyPlayedError = (status: number): string => {
    let ErrorMessage = 'เกืดข้อผิดพลาดในการดึงเพลงที่เพิ่งเล่น';
    switch (status) {
        case 401:
            ErrorMessage =
                'เกืดข้อผิดพลาดในการดึงเพลงที่เพิ่งเล่น: ไม่ได้รับอนุญาต สาเหตุอาจเกิดจากการหมดอายุของ token หรือไม่ได้รับอนุญาต';
            break;
        case 403:
            ErrorMessage =
                'เกืดข้อผิดพลาดในการดึงเพลงที่เพิ่งเล่น: การเข้าถึงถูกปฏิเสธ อาจเป็นเพราะไม่มีการอนุญาตให้เข้าถึงข้อมูลนี้';
            break;
        case 429:
            ErrorMessage =
                'เกืดข้อผิดพลาดในการดึงเพลงที่เพิ่งเล่น: มีการร้องขอเกินขีดจำกัด อาจต้องรอสักครู่ก่อนลองใหม่';
            break;
        default:
            ErrorMessage =
                'เกืดข้อผิดพลาดในการดึงเพลงที่เพิ่งเล่น: ไม่ทราบสาเหตุ';
            break;
    }

    return ErrorMessage;
};

export { getRecentlyPlayedError };
